from django.urls import path, include
from .views import PollListView, SeriesListView, SeriesByTitleDetailView, BooksListView, BooksBySeriesListView, RecentBooksView, vote


urlpatterns = [
    path('books', BooksListView.as_view()),
    path('polls', PollListView.as_view()),
    path('poll/<poll_id>/vote/<choice_id>', vote, name='vote'),
    path('recents', RecentBooksView.as_view()),
    path('series', SeriesListView.as_view()),
    path('series/<series_title>', SeriesByTitleDetailView.as_view()),
]