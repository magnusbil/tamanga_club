from django.contrib import admin
from .models import ClubUser, Poll, Choice, Series, Book, Vote

admin.site.register(ClubUser)
admin.site.register(Poll)
admin.site.register(Choice)
admin.site.register(Series)
admin.site.register(Book)
admin.site.register(Vote)