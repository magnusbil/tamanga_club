from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin
from .models import *

class BookInline(admin.StackedInline):
    model = Book
    extra=0
    ordering = ('volume_number',)

class ChoiceInline(admin.StackedInline):
    model=Choice
    extra=0

class SeriesAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [ BookInline ]
    fields = ('series_title', 'series_author', 'series_artist', 'series_genres', 'current_genres', 'series_cover_image', 'complete')
    readonly_fields = ('current_genres',)
    ordering = ('series_title',)

    def current_genres(self, obj):
        if obj.series_genres != None:
          return ", ".join([g for g in obj.series_genres])
        else:
          return ""


class PollAdmin(admin.ModelAdmin):
    inlines = [ ChoiceInline ]

class UserProfileAdmin(admin.ModelAdmin, DynamicArrayMixin):
    fields = ('club', 'user', 'user_interests', 'icon', 'security_question', 'security_answer',)
    readonly_fields = ('user', 'user_interests', 'icon', 'security_question', 'security_answer',)

    def user_interests(self, obj):
        if obj.interests != None:
          return ", ".join([i for i in obj.interests])
        else:
          return ""

class VoteAdmin(admin.ModelAdmin):
    readonly_fields = ('user', 'poll', 'choice',)

admin.site.register(BookClub)
admin.site.register(Book)
admin.site.register(Choice)
admin.site.register(Poll, PollAdmin)
admin.site.register(Series, SeriesAdmin)
admin.site.register(SharedAccess)
admin.site.register(AccessRequest)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Vote, VoteAdmin)
