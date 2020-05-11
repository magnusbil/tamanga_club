from django.urls import path, re_path
from .views import SeriesListView, SeriesByTitleDetailView, BooksListView, BooksBySeriesListView, RecentBooksView

urlpatterns = [
    path('series', SeriesListView.as_view()),
    path('series/<series_title>', SeriesByTitleDetailView.as_view()),
    path('books', BooksListView.as_view()),
    path('recents', RecentBooksView.as_view()),
]
