from django.urls import path, re_path
from .views import SeriesListView, SeriesByTitleDetailView, BooksListView, BooksBySeriesListView

urlpatterns = [
    path('series', SeriesListView.as_view()),
    path('series/<title>', SeriesByTitleDetailView.as_view()),
    path('books', BooksListView.as_view()),
    path('books/<series>', BooksBySeriesListView.as_view()),
]
