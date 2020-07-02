from django.db import models
# from django.contrib.postgres.fields import ArrayField
from django_better_admin_arrayfield.models.fields import ArrayField
from django.contrib.auth.models import User
from django.contrib.auth.base_user import BaseUserManager
from django_s3_storage.storage import S3Storage
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import datetime

if settings.DEBUG == True:
  storage = FileSystemStorage()
else:
  storage = S3Storage(aws_s3_bucket_name=settings.AWS_S3_BUCKET_NAME)

# GENRES = (
#     ('action', 'Action'),
#     ('comedy', 'Comedy'),
#     ('drama', 'Drama'),
#     ('horror', 'Horror'),
#     ('misc', 'Miscellaneous'),
#     ('slice_of_life', 'Slice of Life'),
#     ('yoai', 'Yoai'),
#     ('yuri', 'Yuri'),
#     ('boys_love', 'Boys Love'),
#     ('girls_love', 'Girls Love'),
#     ('isekai', 'Isekai'),
# )

class BookClub(models.Model):
    club_name = models.CharField(max_length=255, default="New Group")
    club_code = models.CharField(max_length=225, default="", unique=True)

    def __str__(self):
        return self.club_name

class UserProfile(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.SET_NULL, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    interests = ArrayField(models.CharField(max_length=255), default=list, blank=True, null=True)
    icon = models.ImageField("User Icon", storage=storage, blank=True, null=True)
    security_question = models.CharField(max_length=255, default="What's your favorite anime?", null=False)
    security_answer = models.CharField(max_length=255, default="Is it wrong to put random defaults in a dungeon?", null=False)

    def __str__(self):
        return self.user.username + "'s Profile"

# Create your models here.
class Poll(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE)
    poll_title = models.CharField(max_length=255)
    poll_start_date = models.DateField(default=datetime.date.today)
    poll_end_date = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.poll_title

class Choice(models.Model):
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, related_name='choices')
    choice_title = models.CharField(max_length=255)
 
    def __str__(self): 
        return self.choice_title

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="poll_votes")
    poll =  models.ForeignKey('Poll', on_delete=models.CASCADE)
    choice = models.ForeignKey('Choice', on_delete=models.CASCADE)

    def __str__(self):
      return self.user.username + "'s vote on " + self.poll.poll_title
   
# Model for a Series
class Series(models.Model):
    series_title = models.CharField("Title", max_length=255, unique=True)
    series_author = models.CharField("Author",max_length=255, null=True, blank=True)
    series_artist = models.CharField("artist",max_length=255, null=True, blank=True)
    series_genres = ArrayField(models.CharField(max_length=30), blank=True, null=True)
    series_cover_image = models.ImageField("Series Cover Image", storage=storage, blank=True, null=True)
    complete = models.BooleanField("Is this series completed?", default=False)

    def __str__(self):
        return self.series_title

# Model for an individual book in a series
class Book(models.Model):
    series = models.ForeignKey(Series, related_name='volumes', on_delete=models.CASCADE)
    volume_number = models.IntegerField("Volume number", default=0)
    cover_image = models.ImageField("Cover Image", storage=storage, blank=True, null=True)
    loaned_to = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='books_checked_out', null=True, blank=True)
    hold_for = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='books_on_hold', null=True, blank=True)
    def __str__(self):
        return self.series.series_title + " Vol. " + str(self.volume_number)

class SharedAccess(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE, related_name="group_shared_access")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_shared_access")
    resource_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
      return self.resource_name + "Access"

