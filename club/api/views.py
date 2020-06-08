from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from club.models import *
from .serializers import PollSerializer, SeriesSerializer, BookSerializer

class BooksListView(ListAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer

class BooksBySeriesListView(ListAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  lookup_field = 'series'

class PollListView(ListAPIView):
  queryset = Poll.objects.all()
  serializer_class = PollSerializer

class RecentBooksView(ListAPIView):
  queryset = Book.objects.all()[:8]
  serializer_class = BookSerializer

class SeriesListView(ListAPIView):
  queryset = Series.objects.all()
  serializer_class = SeriesSerializer

class SeriesByTitleDetailView(RetrieveAPIView):
  queryset = Series.objects.all()
  serializer_class = SeriesSerializer
  lookup_field = 'series_title'

@api_view(['POST'])
@permission_classes((permissions.AllowAny))
def vote(request, user_id, poll_id, choice_id):
  if request.method == 'POST':
    try:
      user = User.objects.get(id=user_id)
      poll = Poll.objects.get(id=poll_id)
      choice = Choice.objects.get(id=choice_id)
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
      return HttpResponse(error_message, status=400)
  else:
    return HttpResponse(status=405)
