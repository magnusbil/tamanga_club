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
      username_taken = User.objects.filter(username=data['username'])
      if len(username_taken) == 0:
        user_data = {"username": data['username'], "password": data['password']}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        #SET SECURITY QUESTION AND ANSWER
        user.profile.security_question = data['security_question']
        user.profile.security_answer = data['security_answer']
        club = BookClub.objects.get(club_code=data['club_code'])
        user.profile.club = club
        user.profile.save()

        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
      else:
        return JsonResponse({"error_message": "Username already taken"}, status=400)
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
      data = json.loads(request.body.decode(encoding='utf-8'))
      user = User.objects.get(username=data['username'])
      profile = UserProfile.objects.get(user=user)
      if profile.security_answer == data['answer']:
        new_password = make_password(data['password'])
        user.password = new_password
        user.save()
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
      return JsonResponse({"message": "You have already voted on this poll."})
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message":error_message}, status=400)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def reserve(request):
  try:
    request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
    user = User.objects.get(id=request_data['user_id'])
    book = Book.objects.get(id=request_data['book_id'])
    book.hold_for = user
    return JsonResponse({
      "message": "Reservation Completed"
    })
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message": error_message}, status=400)