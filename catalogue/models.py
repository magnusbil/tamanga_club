from django.db import models
from django.contrib.auth.models import User

# Model for a Series
class Series(models.Model): 
    title = models.CharField("Title", max_length=255, unique=True, null=False)
    author = models.CharField("Author",max_length=255, null=True, blank=True)
    artist = models.CharField("artist",max_length=255, null=True, blank=True)
    complete = models.BooleanField(default=False)
    def __str__(self):
        return self.title

# Model for an individual book in a series
class Book(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, null=True)
    number = models.IntegerField()
    image = models.ImageField(null=True)
    available = models.BooleanField(default=False)
    loaned_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.series.title + " Vol. " + str(self.number)
    
    @property
    def is_available(self):
        return self.available
