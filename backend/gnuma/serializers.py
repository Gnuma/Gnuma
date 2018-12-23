from rest_framework import serializers
from .models import GnumaUser, Book, Office, Class, Ad
from django.contrib.auth.models import User



class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'