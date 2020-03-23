from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, username, firstname, lastname, password):
        if not username:
            return ValueError("Users must have a username")
        if not first_name or not last_name:
            return ValueError("Users must have first and last name")
        user = self.model(username=username)
        user.set_password(password)
        user.first_name=firstname
        user.last_name=lastname
        user.save(using=self.db)
        return user

class User(AbstractBaseUser):
    first_name = models.CharField("First Name", default='Random', max_length=255)
    last_name = models.CharField("Last Name", default='Character', max_length=255)
    username = models.CharField("Username", max_length=255, unique=True)
    created_at = models.DateTimeField("Created At", default=timezone.now)
    admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS= ['firs_tname', 'last_name']
    
    def __str__(self):
        return self.username

    objects = UserManager()

# Model for a Series
class Series(models.Model): 
    title = models.CharField("Title", max_length=255, unique=True, null=False)
    author = models.CharField("Author",max_length=255)
    artist = models.CharField("artist",max_length=255)
    status = models.BooleanField(default=False)
    def __str__(self):
        return self.title

# Model for an individual book in a series
class Book(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    number = models.IntegerField()
    image = models.ImageField()
    available = models.BooleanField(default=False)
    loaned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.available

    @property
    def is_available(self):
        return self.available
