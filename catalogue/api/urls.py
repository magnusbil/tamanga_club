from django.urls import path
from .views import SeriesListView, SeriesDetailView, BookListView, BookDetailView

urlpatterns = [
    path('series', SeriesListView.as_view()),
    path('series/<pk>', SeriesDetailView.as_view()),
    path('books', BookListView.as_view()),
    path('books/<pk>', BookDetailView.as_view())
]
