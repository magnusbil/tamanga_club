from rest_framework import serializers
from django.contrib.auth.models import User
from club.models import *

class PollSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()
    poll_total_votes = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = ('id', 'poll_title', 'poll_start_date', 'poll_end_date', 'poll_total_votes', 'choices')

    def get_choices(self, poll):
        choice_query = Choice.objects.filter(poll=poll.id)
        choice_list = ChoiceSerializer(choice_query, many=True, context={"request": self.context['request']}).data
        return choice_list

    def get_poll_total_votes(self, poll):
        return Vote.objects.filter(poll=poll).count()

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'poll', 'choice_title', 'votes')

class SeriesSerializer(serializers.ModelSerializer):
    book_list = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = ('id', 'series_title', 'series_author', 'series_artist', 'series_cover_image', 'series_genre', 'series_sub_genre', 'complete', 'book_list')

    def get_BookList(self, series):
        book_query = Book.objects.filter(series=series.id)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list

class BookSerializer(serializers.ModelSerializer):
    series_title = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'series', 'volume_number', 'cover_image', 'available', 'loaned_to', 'hold_for', 'series_title')

    def get_series_title(self, book):
        return book.series.series_title 

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('interests', 'icon')

class UserSerializer(serializers.ModelSerializer):
    books_on_hold = serializers.SerializerMethodField()
    books_checked_out = serializers.SerializerMethodField()
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'books_on_hold', 'books_checked_out', 'profile')
  
    def get_books_on_hold(self, user):
        book_query = Book.objects.filter(loaned_to=user)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list
  
    def get_books_checked_out(self, user):
        book_query = Book.objects.filter(hold_for=user)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list

class SharedAccessSerialier(serializers.ModelSerializer):
    class Meta:
        model = SharedAccess
        fields = ('resource_name', 'username', 'password')

