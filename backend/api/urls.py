from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('gnuma/v1/auth/', include('rest_auth.urls')), # url : gnuma/v1/auth/login/, gnuma/v1/auth/logout
    path('gnuma/v1/auth/registration/', include('rest_auth.registration.urls')), #url: gnuma/v1/auth/registration/
    path('gnuma/v1/', include('gnuma.urls'))
]
