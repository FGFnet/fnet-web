# Generated by Django 3.2.10 on 2022-01-10 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fg', '0002_auto_20220109_1016'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='fg',
            options={'ordering': ['is_admin', 'student_id']},
        ),
        migrations.RenameField(
            model_name='fg',
            old_name='admin',
            new_name='is_admin',
        ),
        migrations.AddField(
            model_name='fg',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]