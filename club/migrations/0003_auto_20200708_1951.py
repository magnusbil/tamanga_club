# Generated by Django 3.0.7 on 2020-07-08 19:51

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0002_auto_20200708_1857'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sharedaccess',
            old_name='user',
            new_name='owner',
        ),
        migrations.AlterField(
            model_name='sharedaccess',
            name='allowed_list',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=None),
        ),
    ]
