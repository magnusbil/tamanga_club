release: python manage.py migrate --settings=tamanga_catalogue.settings.prod
web: gunicorn tamanga_catalogue.wsgi.prod --log-file -