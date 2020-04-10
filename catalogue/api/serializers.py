from rest_framework import serializers
from catalogue.models import Book, Series

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'series', 'number', 'image', 'available', 'loaned_to')

class SeriesSerializer(serializers.ModelSerializer):
    BookList = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = ('id', 'title', 'author', 'artist', 'complete', 'BookList')

    def get_BookList(self, book):
        book_query = Book.objects.filter(series=book.id)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list
