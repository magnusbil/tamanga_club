from django.urls import path, re_path
from .views import SeriesListView, SeriesDetailView, BookListView, BookDetailView

urlpatterns = [
    path('series', SeriesListView.as_view()),
    path('series/<title>', SeriesDetailView.as_view()),
    path('books', BookListView.as_view()),
    path('books/<pk>', BookDetailView.as_view())
]
