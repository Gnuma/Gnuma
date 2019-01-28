from rest_framework import viewsets, status
from .models import GnumaUser, Book, Office, Class, Ad
from .serializers import BookSerializer, AdSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, action
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
    if 'key' not in request.data or 'classM' not in request.data or 'office' not in request.data:
        return JsonResponse({"detail":"one or more arguments are missing!"}, status = status.HTTP_400_BAD_REQUEST)
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
    try:
        newUser = GnumaUser.objects.get(user = user, classM = c)
    except GnumaUser.DoesNotExist:
        newUser = GnumaUser.objects.create(user = user, classM = c)
        newUser.save()
    return HttpResponse(status = status.HTTP_201_CREATED)

'''
-------------------------------------------------------------------------------------------------------------------+
                                                                                                                   |
Book Manager                                                                                                       |
                                                                                                                   |
-------------------------------------------------------------------------------------------------------------------+
'''

class BookManager(viewsets.GenericViewSet):

    authentication_classes = [TokenAuthentication]
    safe_actions = ('list', 'retrieve', 'search')
    lookup_field = 'isbn'
    queryset = Book.objects.all()

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
        if 'isbn' not in request.data or 'title' not in request.data or 'author' not in request.data:
            return JsonResponse({"detail":"one or more arguments are missing!"}, status = status.HTTP_400_BAD_REQUEST)
        user = GnumaUser.objects.get(user = request.user)
        try: 
            b = Book.objects.get(isbn = request.data['isbn'], classes = user.classM)
            return HttpResponse(status = status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            try:     
                b = Book.objects.get(isbn = request.data['isbn'])
                b.classes.add(user.classM)
                return HttpResponse(status = status.HTTP_201_CREATED)
            except Book.DoesNotExist:
                b = Book.objects.create(title = request.data['title'], author = request.data['author'], isbn = request.data['isbn'])
                b.save()
                b.classes.add(user.classM)
                return HttpResponse(status = status.HTTP_201_CREATED)
  
    '''
    The following method lists all the Books instances.
    '''
    def list(self, request):
        serializer = BookSerializer(self.get_queryset(), many = True)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    def retrieve(self, request, *args, **kwargs):
        book = self.get_object()
        serializer = BookSerializer(book, many = False)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)
    
    @action(detail = False, methods = ['post'])
    def search(self, request):
        if 'keyword' not in request.data:
            return JsonResponse({"detail":"One or more arguments are missing!"}, status = status.HTTP_400_BAD_REQUEST)
        e = Engine(model = Book, lookup_field = 'title', keyword = request.data['keyword'], geo = False)
        book = e.get_candidates()
        serializer = BookSerializer(book, many = False)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    
'''
-------------------------------------------------------------------------------------------------------------------+
                                                                                                                   |
Ad Manager                                                                                                         |
                                                                                                                   |
-------------------------------------------------------------------------------------------------------------------+
'''

class AdManager(viewsets.GenericViewSet):
    authentication_classes = [TokenAuthentication]
    safe_actions = ('list', 'retrieve','search','geo_search')
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

    def get_permissions(self):
        if self.action in self.safe_actions:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated] 
        return [permission() for permission in permission_classes]

    def create(self, request):
        if 'isbn' not in request.data or 'title' not in request.data or 'price' not in request.data:
            return JsonResponse({"detail":"one or more arguments are missing!"}, status = status.HTTP_400_BAD_REQUEST)
        user = GnumaUser.objects.get(user = request.user)
        try:
            book = Book.objects.get(isbn = request.data['isbn'])
        except Book.DoesNotExist:
            return JsonResponse({"detail":"Invalid argument"}, status = status.HTTP_400_BAD_REQUEST)
        title = request.data['title']
        price = request.data['price']
        newAd = Ad.objects.create(title = title, price = price, book = book, seller = user)
        newAd.save()
        return HttpResponse(status = status.HTTP_201_CREATED)
    
    def retrieve(self, request, *args, **kwargs):
        ad = self.get_object()
        serializer = self.get_serializer_class()(ad, many = False)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)

    @action(detail = False, methods = ['post'])
    def search(self, request):
        if 'keyword' not in request.data:
            return JsonResponse({"detail":"One or more arguments are missing!"}, status = status.HTTP_400_BAD_REQUEST)
        e = Engine(model = Book, lookup_field = 'title', keyword = request.data['keyword'], geo = False)
        book = e.get_candidates()
        serializer = self.get_serializer_class()(Ad.objects.filter(book = book), many = True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe = False)
    @action(detail = False, methods = ['post'])
    def geo_search(self, request):
        '''
        To be defined.
        '''
                
'''
-------------------------------------------------------------------------------------------------------------------+
                                                                                                                   |
Search engine.                                                                                                         |
                                                                                                                   |
-------------------------------------------------------------------------------------------------------------------+
'''        

class Engine:

    def __init__(self, **kwargs):
        self.model = kwargs['model'] 
        self.lookup_field = kwargs['lookup_field']
        self.keyword = kwargs['keyword']
        
        '''
        Max number of related results.
        '''
        if 'max' in kwargs:
            self.max = kwargs['max']
        else:
            self.max = 3

        if kwargs['geo']:
            self.location = kwargs['location']

    def get_related(self):
        min = len(self.keyword)
        related = None
        for item in self.model.objects.all():
            title = getattr(item, self.lookup_field)
            differences = sum(a!=b for a, b in zip(title, self.keyword))-abs(len(self.keyword)-len(title))
            if differences < min:
                min = differences
                related = item
        return related

    def get_candidates(self):
        try:
            parameters = {self.lookup_field : self.keyword}
            models = self.model.objects.get(**parameters)
            return models
        except self.model.DoesNotExist:
            return self.get_related()

class ImageHandler:

    def __init__(self, **kwargs):
        self.action = kwargs['action']
        self.path = kwargs['path']
        self.sizes = {'retrieve': (100, 60), 'search':(25,25)}

    def get_image(self):

    def resize(self):

    def get_path(self):
        return self.path