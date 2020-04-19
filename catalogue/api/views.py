from rest_framework.generics import ListAPIView, RetrieveAPIView
from catalogue.models import Series, Book
from .serializers import SeriesSerializer, BookSerializer

class SeriesListView(ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

class SeriesByTitleDetailView(RetrieveAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    lookup_field = 'series_title'

class BooksListView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BooksBySeriesListView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_up = 'series'

