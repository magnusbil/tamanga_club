# Generated by Django 3.0.4 on 2020-03-23 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True, verbose_name='Title')),
                ('author', models.CharField(max_length=255, verbose_name='Author')),
                ('artist', models.CharField(max_length=255, verbose_name='artist')),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('image', models.ImageField(upload_to='')),
                ('available', models.BooleanField(default=True)),
                ('loaned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='catalogue.UserAccount')),
                ('series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalogue.Series')),
            ],
        ),
    ]