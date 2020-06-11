from django.db import models
from django.contrib.auth.models import User
from django_s3_storage.storage import S3Storage
from django.core.files.storage import FileSystemStorage
from django.conf import settings
# from django.core.files.storage import FileSystemStorage
# import sys

if settings.DEBUG == True:
  storage = FileSystemStorage()
else:
  storage = S3Storage(aws_s3_bucket_name='triangle-manga-media')   

# Model for a Series
class Series(models.Model):
    GENRES = [
        ('action', 'Action'),
        ('comedy', 'Comedy'),
        ('drama', 'Drama'),
        ('horror', 'Horror'),
        ('misc', 'Miscellaneous'),
        ('slice_of_life', 'Slice of Life'),
        ('yoai', 'Yoai'),
        ('yuri', 'Yuri'),
    ]
    SUB_GENRES = [
        ('boys_love', 'Boys Love'),
        ('girls_love', 'Girls Love'),
        ('isekai', 'Isekai')
    ]
    series_title = models.CharField("Title", max_length=255, unique=True, null=False)
    series_author = models.CharField("Author",max_length=255, null=True, blank=True)
    series_artist = models.CharField("artist",max_length=255, null=True, blank=True)
    series_genre = models.CharField("Genre", max_length=30, choices=GENRES, default='misc')
    series_sub_genre = models.CharField("Sub Genre", max_length=30, choices=SUB_GENRES, blank=True, null=True)
    series_cover_image = models.ImageField("Series Cover Image", storage=storage, blank=True, null=True)
    complete = models.BooleanField("Is this series completed?", default=False)
    def __str__(self):
        return self.series_title

# Model for an individual book in a series
class Book(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, null=True)
    volume = models.IntegerField("Volume number", default=0)
    cover_image = models.ImageField("Cover Image", storage=storage, blank=True, null=True)
    available = models.BooleanField("Availabe", default=True)
    loaned_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.series.series_title + " Vol. " + str(self.volume)
    
    @property
    def is_available(self):
        return self.available