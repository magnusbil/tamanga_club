# Generated by Django 3.0.7 on 2020-06-09 17:44

import datetime
from django.conf import settings
import django.contrib.postgres.fields
import django.core.files.storage
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_title', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('poll_title', models.CharField(max_length=255)),
                ('poll_start_date', models.DateField(default=datetime.date.today)),
                ('poll_end_date', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series_title', models.CharField(max_length=255, unique=True, verbose_name='Title')),
                ('series_author', models.CharField(blank=True, max_length=255, null=True, verbose_name='Author')),
                ('series_artist', models.CharField(blank=True, max_length=255, null=True, verbose_name='artist')),
                ('series_genres', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('action', 'Action'), ('comedy', 'Comedy'), ('drama', 'Drama'), ('horror', 'Horror'), ('misc', 'Miscellaneous'), ('slice_of_life', 'Slice of Life'), ('yoai', 'Yoai'), ('yuri', 'Yuri')], default='misc', max_length=30, verbose_name='Genre'), size=None)),
                ('series_sub_genres', models.CharField(blank=True, choices=[('boys_love', 'Boys Love'), ('girls_love', 'Girls Love'), ('isekai', 'Isekai')], max_length=30, null=True, verbose_name='Sub Genre')),
                ('series_cover_image', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='Series Cover Image')),
                ('complete', models.BooleanField(default=False, verbose_name='Is this series completed?')),
            ],
        ),
        migrations.CreateModel(
            name='SharedAccess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resource_name', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.Choice')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.Poll')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interests', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('action', 'Action'), ('comedy', 'Comedy'), ('drama', 'Drama'), ('horror', 'Horror'), ('misc', 'Miscellaneous'), ('slice_of_life', 'Slice of Life'), ('yoai', 'Yoai'), ('yuri', 'Yuri'), ('boys_love', 'Boys Love'), ('girls_love', 'Girls Love'), ('isekai', 'Isekai')], max_length=255), blank=True, null=True, size=None)),
                ('icon', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='User Icon')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='choice',
            name='poll',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.Poll'),
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('volume_number', models.IntegerField(default=0, verbose_name='Volume number')),
                ('cover_image', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='Cover Image')),
                ('hold_for', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='book_holds', to=settings.AUTH_USER_MODEL)),
                ('loaned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books_checked_out', to=settings.AUTH_USER_MODEL)),
                ('series', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='club.Series')),
            ],
        ),
    ]
