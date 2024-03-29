from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import BooleanField, CharField
from django.core.validators import MinLengthValidator
from django.db.models.fields.related import ForeignKey
from lc.models import LC

# Create your models here.
class Freshman(models.Model):
    lc = ForeignKey(LC, on_delete=CASCADE)
    name = CharField(max_length=30)
    phone_number = CharField(max_length=13, null=True)
    register = BooleanField(default=False)
    department = CharField(max_length=30, null=True)

    class Meta:
        db_table = 'freshman'
        ordering = ['lc', 'name']