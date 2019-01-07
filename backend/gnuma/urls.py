from django.urls import path, include
from .views import init_user


urlpatterns = [
    path('init/', init_user),
]