from django.urls import path, re_path
from .views import SeriesListView, SeriesByTitleDetailView, BookListView, BookBySeriesDetailView

urlpatterns = [
    path('series', SeriesListView.as_view()),
    path('series/<title>', SeriesByTitleDetailView.as_view()),
    path('books', BookListView.as_view()),
    path('books/<series>', BookBySeriesDetailView.as_view())
]
