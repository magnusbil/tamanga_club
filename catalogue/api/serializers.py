from rest_framework import serializers
from catalogue.models import Book, Series

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id','series', 'number', 'image', 'available', 'loaned_to')

class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ('id', 'title', 'author', 'artist', 'complete')
