from django.urls import path
from .views import PollListView, vote

urlpatterns = [
    path('polls', PollListView.as_view()),
    path('poll/<poll_id>/vote/<choice_id>', vote, name='vote')
]