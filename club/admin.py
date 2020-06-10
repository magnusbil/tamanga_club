from django.contrib import admin
from .models import UserProfile, Poll, Choice, Series, Book, Vote

admin.site.register(UserProfile)
admin.site.register(Poll)
admin.site.register(Choice)
admin.site.register(Series)
admin.site.register(Book)
admin.site.register(Vote)

class BookInline(admin.StackedInline):
    model = Book

class ChoiceInline(admin.StackedInline):
    model = Choice

class UserProfileInline(admin.StackedInline):
    model = UserProfile

class SeriesAdmin(admin.ModelAdmin):
    inlines = [
      BookInline
    ]

class PollAdmin(admin.ModelAdmin):
    inlines = [
      ChoiceInline
    ]

class UserAdmin(admin.ModelAdmin):
    inlines = [
      UserProfileInline
    ]