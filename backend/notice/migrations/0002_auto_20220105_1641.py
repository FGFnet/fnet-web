# Generated by Django 3.2.10 on 2022-01-05 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notice', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='last_update_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='notice',
            name='last_update_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]