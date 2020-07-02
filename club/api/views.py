from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from django.contrib.auth.hashers import make_password
import json
from django.contrib.auth.models import User
from knox.models import AuthToken
from club.models import *
from .serializers import *

class RegisterAPIView(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    try:
      data = json.loads(request.body.decode(encoding="utf-8"))
      existing_user = User.objects.filter(username=data['username'])
      if len(existing_user) == 0:
        # get the club object (if it doesn't exist it will throw an exception)
        club = BookClub.objects.get(club_code=data['club_code'])

        # create user with provided username and password
        user_data = {"username": data['username'], "password": data['password']}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        #Set the security question and answer on the user profile
        user.profile.security_question = data['security_question']
        user.profile.security_answer = data['security_answer']
        user.profile.club = club
        user.profile.save()

        # return the serialized user object and an auth token
        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
      else:
        return JsonResponse({"error_message": "Username already taken"})
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)

class LoginAPIView(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.validated_data
      return JsonResponse({
          "user": UserSerializer(user, context=self.get_serializer_context()).data,
          "token": AuthToken.objects.create(user)[1]
      })

class PasswordAPIView(generics.GenericAPIView):
  def post(self, request):
    try:
      # grab associated objects
      data = json.loads(request.body.decode(encoding='utf-8'))
      user = User.objects.get(username=data['username'])
      profile = UserProfile.objects.get(user=user)

      # Assert that provided security answer matches the security answer on the user profile.
      # Then set the password to a hashed version of the provided password
      if profile.security_answer == data['answer']:
        new_password = make_password(data['password'])
        user.password = new_password
        user.save()
        # Return serialized user object and auth token
        return JsonResponse({
          "user": UserSerializer(user, context=self.get_serializer_context()).data,
          "token": AuthToken.objects.create(user)[1]
        })
      else:
        return JsonResponse({
          "error_message": "Incorrect answer to security question"
        })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message":error_message}, status=400)

@permission_classes([permissions.IsAuthenticated])
class UserAPIView(generics.RetrieveAPIView):
  serializer_class = UserSerializer

  def get_object(self):
      return self.request.user

@permission_classes([permissions.IsAuthenticated])
class PollListView(ListAPIView):
  def get_queryset(self):
    club = BookClub.objects.get(id=self.kwargs['club_id'])  
    return Poll.objects.filter(club=club)
  serializer_class = PollSerializer

@permission_classes([permissions.IsAuthenticated])
class RecentBooksView(ListAPIView):
  queryset = Book.objects.all()[:8]
  serializer_class = BookSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesListView(ListAPIView):
  queryset = Series.objects.all()
  serializer_class = SeriesSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesByGenreView(ListAPIView):
  def get_queryset(self):
    return Series.objects.filter(series_genres__contains = [self.kwargs['series_genre']])
  serializer_class = SeriesSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesByTitleDetailView(RetrieveAPIView):
  queryset = Series.objects.all()
  serializer_class = SeriesSerializer
  lookup_field = 'series_title'

@permission_classes([permissions.IsAuthenticated])
class SharedAccessListView(ListAPIView):
  def get_queryset(self):
    club = BookClub.objects.get(id=self.kwargs['club_id'])
    return SharedAccess.objects.filter(club=club)
  serializer_class = SharedAccessSerializer

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def delete_account(request):
  try:
    data = json.loads(request.body.decode(encoding='utf-8'))
    user = User.objects.get(username=data['username'])
    profile = UserProfile.objects.get(user=user)
    if profile.security_answer == data['security_answer']:
      user.delete()
      return JsonResponse({"message":"All account information deleted."})
    else:
      return JsonResponse({"error_message": "Incorrect security answer. Please try again."})
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message": error_message}, status=400)


# Returns a user's secuirty question. THis is used during the password reset process
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def get_security_question(request):
  try:
    data = json.loads(request.body.decode(encoding="utf-8"))
    user = User.objects.get(username=request.data['username'])
    profile = UserProfile.objects.get(user=user)
    question = profile.security_question
    return JsonResponse({"username": data['username'], "question": question})
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message": error_message}, status=400)

# Creates a vote object to record a vote made 
# by a user on a specific poll with a specific choice.
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def vote(request):
  try:
    request_data = json.loads(request.body.decode(encoding='utf-8'))
    votes = Vote.objects.filter(user=request_data['user_id'], poll=request_data['poll_id'])
    if len(votes) == 0:
      user = User.objects.get(id=request_data['user_id'])
      poll = Poll.objects.get(id=request_data['poll_id'])
      choice = Choice.objects.get(id=request_data['choice_id'])
      vote = Vote.objects.create(user=user,poll=poll,choice=choice)
      vote.save()
      choice_total_votes = Vote.objects.filter(choice=choice).count()
      poll_total_votes = Vote.objects.filter(poll=poll).count()
      return JsonResponse({
        'choice_total_votes': choice_total_votes,
        'poll_total_votes': poll_total_votes
      })
    else:
      return JsonResponse({"error_message": "You have already voted on this poll."})
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message":error_message}, status=400)

# Reserve a book for a user
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def reserve(request):
  try:
    request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
    book = Book.objects.get(id=request_data['book_id'])
    if not book.hold_for:
      user = User.objects.get(id=request_data['user_id'])
      book.hold_for = user
      book.save()
      return JsonResponse({
        "message": "Reservation Completed"
      })
    else:
      return JsonResponse({"error_message": "This book is already reserved"})
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message": error_message}, status=400)