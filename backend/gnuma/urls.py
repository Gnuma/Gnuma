from django.urls import path, include
from .views import prova


urlpatterns = [
    path('prova/', prova),
]