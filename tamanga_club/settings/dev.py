"""
Django settings for tamanga_club project.

Generated by 'django-admin startproject' using Django 3.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
import os
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'tamc',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '',
    }
}
  
SECRET_KEY = 'as99*r8u(n2c031/'

WSGI_APPLICATION = 'tamanga_club.wsgi.dev.application'

MEDIA_URL= '/media/'
MEDIA_ROOT= os.path.join(BASE_DIR, 'media')