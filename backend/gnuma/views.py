from rest_framework import viewsets, generics, status
from .models import GnumaUser, Book, Office, Class, Ad
#from .serializers import BookSerializer, AdSerializer, UserSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes
#from .permissions import  IsAuthenticated
from rest_framework.authentication import TokenAuthentication

'''
Create the GnumaUser object.
It must be called right after the registration phase.

Parameters:

key: the key returned by the registration API.


Front-end                               API

    Dati ------------------->   gnuma/v1/auth/registration/
                                 
        <--------------------   token
    
    token ------------------->  (url view) 
'''
@api_view(['POST',])
@authentication_classes([TokenAuthentication,])
def init_user(request):
    print(request.data['office']+"  "+request.data['key'])
    if request.method == 'POST':
        try:
            token = Token.objects.get(key = request.data['key'])
        except GnumaUser.DoesNotExist:
            return HttpResponse(status = status.HTTP_400_BAD_REQUEST)
        username = token.user
        user = User.objects.get(username = token.user)
        newUser = GnumaUser.objects.create(user = user, office = Office.objects.get(name = request.data['office']))
        newUser.save()
        return HttpResponse(status = status.HTTP_201_CREATED)
    else:
        return HttpResponse(status = status.HTTP_400_BAD_REQUEST)
    


