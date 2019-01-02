from rest_framework import viewsets, generics
from .models import GnumaUser, Book, Office, Class, Ad
#from .serializers import BookSerializer, AdSerializer, UserSerializer
from django.http import HttpResponse
#from .permissions import  IsAuthenticated

"""

class BookManagement(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes =

"""


"""
View che conclude il processo di registrazione dell'utente:


Essendo la registrazione implementata da pacchetti esterni, non c'è un modo semplice per gestire le informazioni aggiuntive che ogni utente di Gnuma 
dovrà avere (si guardi models.GnumaUser). Perciò il tutto sarà mascherato frontend:

Front-end                               API

    Dati ------------------->   gnuma/v1/auth/registration/
                                 
        <--------------------   token
    
    token ------------------->  (url view) 

"""

class GnumaUserManagement(generics.CreateAPIView):
    '''
    Crea l'utente associato al token passato 
    '''
    #permission_classes = (IsAuthenticated,) 
    def post(self, request):
        key = request.data['key'] #Esiste perchè prima di elaborare la richiesta viene verificato l'utente mittente


def prova(request):
    print(request.user)
    return HttpResponse("Roger")
