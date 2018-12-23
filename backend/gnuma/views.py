from rest_framework import viewsets
from .models import GnumaUser, Book, Office, Class, Ad
from .serializers import BookSerializer, AdSerializer, UserSerializer
from django.http import HttpResponse
from .permissions import 

class BookManagement(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes =