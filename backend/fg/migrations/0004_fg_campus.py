# Generated by Django 3.2.10 on 2022-01-14 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fg', '0003_auto_20220110_0550'),
    ]

    operations = [
        migrations.AddField(
            model_name='fg',
            name='campus',
            field=models.CharField(default='n', max_length=10),
        ),
    ]
