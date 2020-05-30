from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
class Poll(models.Model):
    poll_title = models.CharField(max_length=255)
    poll_start_date = models.DateField(default=datetime.date.today)
    poll_end_date = models.DateField(default=datetime.date.today)
    poll_total_votes = models.IntegerField(default=0)

    def __str__(self):
        return self.poll_title

class Choice(models.Model):
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE)
    votes = models.IntegerField(default=0, )
    choice_title = models.CharField(max_length=255)

    def __str__(self):
        return self.choice_title