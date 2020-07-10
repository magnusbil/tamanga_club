from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from django.contrib.auth.hashers import make_password
import json
import datetime
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

# @permission_classes([permissions.IsAuthenticated])
class UserAPIView(generics.RetrieveAPIView):
  def get_object(self):
      return self.request.user
  serializer_class = UserSerializer

@permission_classes([permissions.IsAuthenticated])
class PollListView(generics.GenericAPIView):
  def get(self, request, club_id, page_number):
    try:
      club = BookClub.objects.get(id=club_id)
      poll_list  = Poll.objects.filter(club=club).order_by('-poll_start_date')
      start = int(page_number) * 5
      end = start + 5
      total_count = poll_list.count()
      if total_count > end:
        poll_list = poll_list[start:end]
      else:
        poll_list = poll_list[start:]
      return JsonResponse({
        "page_number": int(page_number),
        "poll_list": PollSerializer(poll_list, many=True, context=self.get_serializer_context()).data,
        "total_polls": total_count
      })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)

@permission_classes([permissions.IsAuthenticated])
class RecentBooksView(ListAPIView):
  books = Book.objects.all().order_by('-added_on', 'series', 'volume_number')
  end = books.count()-8 # I only want the last 8 books
  if end > 0:
    queryset = books[end:]
  else:
    queryset = books
  serializer_class = BookSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesListView(ListAPIView):
  queryset = Series.objects.all().order_by('series_title')
  serializer_class = SeriesSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesByGenreView(ListAPIView):
  def get_queryset(self):
    return Series.objects.filter(series_genres__contains = [self.kwargs['series_genre']]).order_by('series_title')
  serializer_class = SeriesSerializer

@permission_classes([permissions.IsAuthenticated])
class SeriesByTitleDetailView(RetrieveAPIView):
  queryset = Series.objects.all()
  serializer_class = SeriesSerializer
  lookup_field = 'series_title'

@permission_classes([permissions.IsAuthenticated])
class SharedAccessListView(ListAPIView):
  def get(self, request, club_id, page_number):
    try:
      club = BookClub.objects.get(id=self.kwargs['club_id'])
      shared_access_list = SharedAccess.objects.filter(club=club)
      total_count = shared_access_list.count()
      start = int(page_number) * 5
      end = start + 5
      if total_count > end:
        shared_access_list = shared_access_list[start:end]
      else:
        shared_access_list = shared_access_list[start:]
      return JsonResponse({
        "page_number": int(page_number),
        "shared_access_list": SharedAccessSerializer(shared_access_list, many=True, context=self.get_serializer_context()).data,
        "total_shared_access": total_count
      })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)

@permission_classes([permissions.IsAuthenticated])
class SharedAccessRequest(generics.GenericAPIView):
  def post(self, request):
    try:
      data = json.loads(request.body.decode(encoding='utf-8'))
      requesting_user = User.objects.get(id=data['requester_id'])
      access_owner = User.objects.get(id=data['owner_id'])
      requested_shared_access = SharedAccess.objects.get(id=data['shared_access_id'])
      existing_request = AccessRequest.objects.filter(request_from=requesting_user, request_to=access_owner, request_for=requested_shared_access)
      if len(existing_request) == 0:
        new_request = AccessRequest.objects.create(
          request_from = requesting_user,
          request_to = access_owner,
          request_for = requested_shared_access
        )
        return JsonResponse({
          "message": "Access request submitted.",
          "user": UserSerializer(requesting_user, context=self.get_serializer_context()).data,
        }, status=201)
      else:
        return JsonResponse({"message": "You have already submitted a request for this access account."})
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)

@permission_classes([permissions.IsAuthenticated])
class SharedAccessRequestResponse(generics.GenericAPIView):
  def post(self, request):
    try:
      data = json.loads(request.body.decode(encoding='utf-8'))
      access_request = AccessRequest.objects.get(id=data['access_request_id'])
      requested_shared_access = access_request.request_for
      requester = access_request.request_from
      access_owner = access_request.request_to
      if data['decision'] == True:
        if requested_shared_access.allowed_list != None:
          requested_shared_access.allowed_list += [requester.id]
        else:
          requested_shared_access.allowed_list = [requester.id]
        requested_shared_access.save()
        access_request.delete()
      else:
        access_request.delete()
      return JsonResponse({
        "message": "Response processed successfully.",
        "user": UserSerializer(access_owner, context=self.get_serializer_context()).data,
      })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, 400)

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
      return JsonResponse({"error_message": "You have already voted on this poll"})
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
      hold_count = Book.objects.filter(hold_for=user).count()
      if hold_count == 3:
        return JsonResponse({"error_message": "You cannot reserve more than 3 books at a time"})
      else:
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

@permission_classes([permissions.IsAuthenticated])
class ReserveDelete(generics.GenericAPIView):
  def post(self, request, *args, **kwargs):
    try:
      request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
      book = Book.objects.get(id=request_data['book_id'])
      book.hold_for = None
      book.save()
      user = User.objects.get(id=request_data['user_id'])
      return JsonResponse({
        "message": "Reservation successfully removed",
        "user": UserSerializer(user, context=self.get_serializer_context()).data
      })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)


# Update User Profile
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_profile(request):
  try:
    request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
    profile = UserProfile.objects.get(user=request_data['user_id'])
    profile.interests = request_data['profile']['interests']
    profile.save()
    return JsonResponse({
      "message": "Profile Updated Successfully",
    })
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error:message": error_message}, status=200)

@permission_classes([permissions.IsAuthenticated])
class CreateThread(generics.GenericAPIView):
  def post(self, request):
    try:
      request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
      user = User.objects.get(id=request_data['user_id'])
      new_thread = Thread.objects.create(
        creator = user,
        title = request_data['thread_title'],
        description = request_data['thread_description'],
      )
      new_thread.save()
      threads = Thread.objects.all().order_by('-created_on')
      if threads.count() > 20:
        current_threads = thread[:20]
      else:
        current_threads = threads
      return JsonResponse({
        "message": "Thread created successfully",
        "threads": ThreadSerializer(current_threads, many=True, context=self.get_serializer_context())
      })
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, 400)

@permission_classes([permissions.IsAuthenticated])
class PostComment(generics.GenericAPIView):
  def post(self, request):
    try:
      request_data = request_data = json.loads(request.body.decode(encoding='utf-8'))
      user = User.objects.get(id=request_data['user_id'])
      thread = Thread.objects.get(id=request_data['thread_id'])
      reply = None
      if request_data['reply_to']:
        reply = Message.objects.get(id=request_data['reply_to'])
      new_comment = Message.objects.create(
        thread = thread,
        creator = user,
        content = request_data['message_content'],
        reply_to = reply,
      )
    except Exception as e:
      error_message = str(e)
      return JsonResponse({"error_message": error_message}, status=400)