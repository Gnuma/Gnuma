from rest_framework import serializers
from .models import GnumaUser, Book, Office, Class, Ad
from django.contrib.auth.models import User


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    office = OfficeSerializer(many = False, read_only = False)

    class Meta:
        model = Class
        fields = '__all__'



class BookSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many = True, read_only = True)
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'classes')