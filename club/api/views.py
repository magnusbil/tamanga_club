from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from club.models import Poll, Choice
from .serializers import PollSerializer

class PollListView(ListAPIView):
  queryset = Poll.objects.all()
  serializer_class = PollSerializer

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def vote(request, poll_id, choice_id):
  if request.method == 'POST':
    try:
      # get poll and choce objects and update their vote counters
      poll = Poll.objects.get(id=poll_id)
      choice = Choice.objects.get(id=choice_id)
      choice.votes += 1
      choice.save()
      poll.poll_total_votes += 1
      poll.save()
      result_data = {
        "choice_total_votes": choice.votes,
        "poll_total_votes": poll.poll_total_votes
      }
      return JsonResponse(result_data)
    except Exception as e:
      error_message = str(e)
      return HttpResponse(error_message, status=400)
  else:
    return HttpResponse(status=405)
