from .base import *
import os

ALLOWED_HOSTS = ['.trianglemanga.club', '142.93.195.61']
DEBUG=False

WSGI_APPLICATION = 'tamanga_catalogue.wsgi.prod.application'
SECRET_KEY = os.environ.get('SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'defaultdb',
        'USER': 'doadmin',
        'PASSWORD': os.environ.get('DATABASE_SECRET'),
        'HOST': 'db-postgresql-nyc1-36336-do-user-783079-0.a.db.ondigitalocean.com',
        'PORT': '25060',
        'OPTIONS': {
            'sslmode': 'require',
        }
    }
}
