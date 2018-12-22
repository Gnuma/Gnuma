from django.db import models
from django.contrib.auth.models import User

class Office(models.Model):
    name = models.CharField(max_length = 50)
    cap = models.CharField(max_length = 5)
    MD = 'MD'
    SP = 'SP'
    LEVEL = (
        (SP, 'Scuola superiore'),
        (MD, 'Scuola media')
    )
    level = models.CharField(max_length = 2, choices = LEVEL, default = SP)

    def is_highschool(self):
        return self.level is self.SP

class GnumaUser(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, primary_key = True)
    office = models.ForeignKey(Office, on_delete = models.CASCADE) 

class Class(models.Model):
    P  = '1'
    S = '2'
    T = '3'
    Q = '4'
    QU = '5'
    GRADE = (
        (P, 'Primo'),
        (S, 'Secondo'),
        (T, 'Terzo'),
        (Q, 'Quarto'),
        (QU, 'Quinto'),
    )
    grade = models.CharField(max_length = 1, choices = GRADE, default = P)
    A = 'A'
    B = 'B'
    C = 'C'
    DIVISION = (
        (A , 'Seziona A'),
        (B , 'Seziona B'),
        (C , 'Seziona C'),
    )
    division = models.CharField(max_length = 1, choices = DIVISION, default = A)
    office = models.ForeignKey(Office, on_delete = models.CASCADE)

class Book(models.Model):
    title = models.CharField(max_length = 50)
    author = models.CharField(max_length = 50)
    isbn = models.CharField(max_length = 10, primary_key = True)

class Ad(models.Model):
    title = models.CharField(max_length = 200)
    #Aggiungere immagine libro
    price = models.FloatField()
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    seller = models.ForeignKey(GnumaUser, on_delete = models.CASCADE)