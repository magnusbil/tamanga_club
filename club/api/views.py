from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
import json
from django.contrib.auth.models import User
from knox.models import AuthToken
from club.models import UserProfile, Series, Book, Poll, Choice, Vote
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, PollSerializer, SeriesSerializer, BookSerializer

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


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

@permission_classes([permissions.IsAuthenticated])
class UserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

@permission_classes([permissions.IsAuthenticated])
class BooksListView(ListAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer

@permission_classes([permissions.IsAuthenticated])
class BooksBySeriesListView(ListAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  lookup_field = 'series'

@permission_classes([permissions.IsAuthenticated])
class PollListView(ListAPIView):
  queryset = Poll.objects.all()
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

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def vote(request):
  try:
    request_data = json.loads(request.body.decode(encoding='utf-8'))
    user = User.objects.get(id=request_data['user_id'])
    poll = Poll.objects.get(id=request_data['poll_id'])
    choice = Choice.objects.get(id=request_data['choice_id'])
    vote = Vote.objects.create(user=user,poll=poll,choice=choice)
    vote.save()
    choice_total_votes = Vote.objects.filter(choice=choice).count()
    poll_total_votes = Vote.objects.filter(poll=poll).count()
    result_data = {
      'choice_total_votes': choice_total_votes,
      'poll_total_votes': poll_total_votes
    }
    return JsonResponse(result_data)
  except Exception as e:
    error_message = str(e)
    return JsonResponse({"error_message":error_message}, status=400)
