from rest_framework import viewsets, generics, status
from .models import GnumaUser, Book, Office, Class, Ad
from .serializers import BookSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes
#from .permissions import  IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated , AllowAny 

'''
Create the GnumaUser object.
It must be called right after the registration phase.

Parameters:

key: the key returned by the registration API.


Front-end                               API

    Dati ------------------->   gnuma/v1/auth/registration/
                                 
        <--------------------   token
    
    token ------------------->  (url view)

JSON params:

key: Token returned by the registration's API

office: user's office

classM: 2 chars representing the user's class; make sure it's well formed, if it doesn't the request will fail. 
'''
@api_view(['POST',])
@authentication_classes([TokenAuthentication,])
def init_user(request):
    try:
        token = Token.objects.get(key = request.data['key'])
    except GnumaUser.DoesNotExist:
        return HttpResponse(status = status.HTTP_400_BAD_REQUEST)
    username = token.user
    user = User.objects.get(username = token.user)
    classM = request.data['classM'] 
    try:
        office = Office.objects.get(name=request.data['office'])
    except Office.DoesNotExist:
        return HttpResponse(status = status.HTTP_400_BAD_REQUEST)
    if len(classM) != 2:
        return HttpResponse(status = status.HTTP_400_BAD_REQUEST)
    grade = classM[0]
    division = classM[1]
    try:
        c = Class.objects.get(division = division, grade = grade, office = office)
    except Class.DoesNotExist:
        #if the Class objects doesn't exits, it'll just create it
        c = Class.objects.create(division = division, grade = grade, office = office)
    #Check if the user already exists
    newUser = GnumaUser.objects.create(user = user, classM = c)
    newUser.save()
    return HttpResponse(status = status.HTTP_201_CREATED)

class BookManager(viewsets.ViewSet):

    authentication_classes = [TokenAuthentication]
    safe_actions = ('list', 'retrieve')

    def get_permissions(self):
        if self.action in self.safe_actions:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated] 
        return [permission() for permission in permission_classes]


    '''
    The following method tries to create a Book instance.
    If the Book that is going to be created already exists, it just does nothing.
    '''

    def create(self, request):
        '''
        The user must be authenticated to get access to this view, so request.user necessarily exists.
        '''

        user = GnumaUser.objects.get(user = request.user)

        try: 
            b = Book.objects.get(isbn = request.data['isbn'], classes = user.classM)
            print('A')
            return HttpResponse(status = status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            try:     
               b = Book.objects.get(isbn = request.data['isbn'])
               print('B')
               b.classes.add(user.classM)
               return HttpResponse(status = status.HTTP_201_CREATED)
            except Book.DoesNotExist:
                b = Book.objects.create(title = request.data['title'], author = request.data['author'], isbn = request.data['isbn'])
                print('C')
                b.save()
                #b.classes.add(user.classM)
                return HttpResponse(status = status.HTTP_201_CREATED)
  
    '''
    The following method lists all the Books instances.
    '''

    def list(self, request):
        queryset = Book.objects.all()
        serializer = BookSerializer(queryset, many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    

        


    


