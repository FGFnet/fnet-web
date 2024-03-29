from django.db.models.fields import Field
from rest_framework import serializers
from .models import LC

class LCSerializer(serializers.ModelSerializer):
    class Meta:
        model = LC
        fields = '__all__'

class UpdateLCSerializer(serializers.Serializer):
    # old_id = serializers.IntegerField()
    name = serializers.CharField()
    schedule = serializers.DateField()