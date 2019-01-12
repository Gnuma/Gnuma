from django.urls import path, include
from .views import init_user
from rest_framework import routers
from .views import BookManager

router = routers.SimpleRouter()
router.register(r'books', BookManager, basename = "book")

urlpatterns = [
    path('init/', init_user),
]

urlpatterns += router.urls