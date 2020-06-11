# Generated by Django 3.0.7 on 2020-06-09 22:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('club', '0003_auto_20200609_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='hold_for',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books_on_hold', to=settings.AUTH_USER_MODEL),
        ),
    ]