from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, password):
        if not username:
            return ValueError("Users must have a username")
        if not first_name or not last_name:
            return ValueError("Users must have first and last name")
        user = self.model(username=username)
        user.set_password(password)
        user.first_name=first_name
        user.last_name=last_name
        user.save(using=self.db)
        return user
    
    def create_superuser(self, username, first_name, last_name, password):
        if not username:
            return ValueError("Users must have a username")
        if not first_name or not last_name:
            return ValueError("Users must have first and last name")
        user = self.model(username=username)
        user.set_password(password)
        user.first_name=first_name
        user.last_name=last_name
        user.staff=True
        user.admin=True
        user.save(using=self.db)
        return user

class User(AbstractBaseUser):
    first_name = models.CharField("First Name", default='Random', max_length=255)
    last_name = models.CharField("Last Name", default='Character', max_length=255)
    username = models.CharField("Username", max_length=255, unique=True)
    created_at = models.DateTimeField("Created At", default=timezone.now)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS= ['first_name', 'last_name']
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active
    
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
