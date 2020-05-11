from rest_framework import serializers
from catalogue.models import Book, Series

class BookSerializer(serializers.ModelSerializer):
    series_title = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'series', 'volume', 'cover_image', 'available', 'loaned_to', 'series_title')

    def get_series_title(self, book):
        #series = Series.objects.get(id=book.series.id)
        return book.series.series_title 

class SeriesSerializer(serializers.ModelSerializer):
    BookList = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = ('id', 'series_title', 'series_author', 'series_artist', 'series_cover_image', 'series_genre', 'series_sub_genre', 'complete', 'BookList')

    def get_BookList(self, series):
        book_query = Book.objects.filter(series=series.id)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list
