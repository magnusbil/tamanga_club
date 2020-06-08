release: python manage.py migrate --settings=tamanga_club.settings.prod
web: gunicorn tamanga_club.wsgi.prod --log-file -