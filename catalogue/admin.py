# catalogue.admin.py

from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Series, Book

admin.site.register(Series)
admin.site.register(Book)

# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)
