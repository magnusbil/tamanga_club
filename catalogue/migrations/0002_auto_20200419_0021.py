# Generated by Django 3.0.4 on 2020-04-19 00:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('catalogue', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='series',
            old_name='artist',
            new_name='series_artist',
        ),
        migrations.RenameField(
            model_name='series',
            old_name='author',
            new_name='series_author',
        ),
        migrations.RenameField(
            model_name='series',
            old_name='title',
            new_name='series_title',
        ),
        migrations.RemoveField(
            model_name='book',
            name='image',
        ),
        migrations.RemoveField(
            model_name='book',
            name='number',
        ),
        migrations.AddField(
            model_name='book',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Cover Image'),
        ),
        migrations.AddField(
            model_name='book',
            name='volume',
            field=models.IntegerField(default=0, verbose_name='Volume number'),
        ),
        migrations.AddField(
            model_name='series',
            name='series_cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Series Cover Image'),
        ),
        migrations.AddField(
            model_name='series',
            name='series_genre',
            field=models.CharField(choices=[('action', 'Action'), ('comedy', 'Comedy'), ('drama', 'Drama'), ('horror', 'Horror'), ('misc', 'Miscellaneous'), ('slice_of_life', 'Slice of Life'), ('yoai', 'Yoai'), ('yuri', 'Yuri')], default='Misc', max_length=30, verbose_name='Genre'),
        ),
        migrations.AddField(
            model_name='series',
            name='series_sub_genre',
            field=models.CharField(blank=True, choices=[('boys_love', 'Boys Love'), ('girls_love', 'Girls Love'), ('isekai', 'Isekai')], max_length=30, null=True, verbose_name='Sub Genre'),
        ),
        migrations.AlterField(
            model_name='book',
            name='available',
            field=models.BooleanField(default=True, verbose_name='Availabe'),
        ),
        migrations.AlterField(
            model_name='book',
            name='loaned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='book',
            name='series',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='catalogue.Series'),
        ),
        migrations.AlterField(
            model_name='series',
            name='complete',
            field=models.BooleanField(default=False, verbose_name='Is this series completed?'),
        ),
    ]
