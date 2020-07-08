from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from club.models import Poll, Choice, Vote, UserProfile, SharedAccess, Series, Book, BookClub

## CHOICE
class ChoiceSerializer(serializers.ModelSerializer):
    choice_total_votes = serializers.SerializerMethodField()
  
    class Meta:
        model = Choice
        fields = ('id', 'poll', 'choice_title', 'choice_total_votes')
    
    def get_choice_total_votes(self, choice):
      return Vote.objects.filter(choice=choice).count()

## POLL
class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)
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

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
      model = Vote
      fields = ('id','user','poll','choice')

## BOOK
class BookSerializer(serializers.ModelSerializer):
    series_title = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'series', 'volume_number', 'cover_image', 'loaned_to', 'hold_for', 'series_title')

    def get_series_title(self, book):
        return book.series.series_title 

## SERIES 
class SeriesSerializer(serializers.ModelSerializer):
    volumes = serializers.SerializerMethodField()
    class Meta:
        model = Series
        fields = ('id', 'series_title', 'series_author', 'series_artist', 'series_cover_image', 'series_genres', 'complete', 'volumes')

    def get_volumes(self, obj):
      ordered_queryset = Book.objects.filter(series=obj).order_by('volume_number')
      return BookSerializer(ordered_queryset, many=True, context={"request": self.context['request']}).data
class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = ('id', 'club_name')

## SHARED ACCESS
class SharedAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedAccess
        fields = ('resource_name', 'username', 'password', 'allowed_list')

## USER PROFILE
class UserProfileSerializer(serializers.ModelSerializer):
    books_on_hold = serializers.SerializerMethodField()
    books_checked_out = serializers.SerializerMethodField()
    poll_votes = serializers.SerializerMethodField()
    user_shared_access = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('interests', 'icon', 'club', 'books_on_hold', 'security_question')

    def get_books_on_hold(self, profile):
        book_query = Book.objects.filter(loaned_to=profile.user)
        book_list = BookSerializer(book_query, many=True, context={"request": self.context['request']}).data
        return book_list

    def get_poll_total_votes(self, profile):
        poll_query = Poll.objects.filter(user=profile.user)
        poll_list = PollSerializer(poll_query, many=True, context={"request": self.context['request']}).data
        return poll_list

    def get_user_shared_access(self, profile):
        shared_access_query = SharedAccess.objects.filter(user=profile.user)
        shared_access_list = SharedAccessSerializer(shared_access_query, many=True, context={"request": self.context['request']}).data
        return shared_access_list

# Make sure usernames have to be unique
User._meta.get_field('username')._unique = True

# Django Auth User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'profile', 'poll_votes', 'user_shared_access')
  
## REGISTER
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            "",
            validated_data['password']
        )
        return user

## LOGIN
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")