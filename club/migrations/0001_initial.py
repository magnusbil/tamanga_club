# Generated by Django 3.0.7 on 2020-07-08 17:36

import datetime
from django.conf import settings
import django.core.files.storage
from django.db import migrations, models
import django.db.models.deletion
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BookClub',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('club_name', models.CharField(default='New Group', max_length=255)),
                ('club_code', models.CharField(default='', max_length=225, unique=True)),
            ],
        ),
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
                ('club', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.BookClub')),
            ],
        ),
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series_title', models.CharField(max_length=255, unique=True, verbose_name='Title')),
                ('series_author', models.CharField(blank=True, max_length=255, null=True, verbose_name='Author')),
                ('series_artist', models.CharField(blank=True, max_length=255, null=True, verbose_name='artist')),
                ('series_genres', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(max_length=30), blank=True, null=True, size=None)),
                ('series_cover_image', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='Series Cover Image')),
                ('complete', models.BooleanField(default=False, verbose_name='Is this series completed?')),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.Choice')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.Poll')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='poll_votes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interests', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, default=list, null=True, size=None)),
                ('icon', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='User Icon')),
                ('security_question', models.CharField(default="What's your favorite anime?", max_length=255)),
                ('security_answer', models.CharField(default='Is it wrong to put random defaults in a dungeon?', max_length=255)),
                ('club', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='club.BookClub')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SharedAccess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resource_name', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('allowed_list', django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.IntegerField(), null=True, size=None)),
                ('club', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_shared_access', to='club.BookClub')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_shared_access', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='choice',
            name='poll',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='club.Poll'),
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('volume_number', models.IntegerField(default=0, verbose_name='Volume number')),
                ('cover_image', models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(), upload_to='', verbose_name='Cover Image')),
                ('added_on', models.DateField(default=datetime.date.today)),
                ('hold_for', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='books_on_hold', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_books', to=settings.AUTH_USER_MODEL)),
                ('series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='volumes', to='club.Series')),
            ],
        ),
        migrations.CreateModel(
            name='AccessRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_for', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club.SharedAccess')),
                ('request_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests_made', to=settings.AUTH_USER_MODEL)),
                ('request_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests_received', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
