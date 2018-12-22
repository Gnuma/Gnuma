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
    level = model.CharField(max_length = 2, choices = LEVEL, default = SP)

    def is_highschool(self):
        return self.level is self.SP

class GnumaUser(User):
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
    grade = model.CharField(max_length = 1, choices = GRADE, default = P)
    A = 'A'
    B = 'B'
    C = 'C'
    DIVISION = (
        (A , 'Seziona A'),
        (B , 'Seziona B'),
        (C , 'Seziona C'),
    )
    division = models.CharField(max_length = 1, choices = DIVISION, default = A)
    office = models.ForignKey(Office, on_delete = model.CASCADE)

class Ad(models.Model):
    title = models.CharField(max_length = 200)
    #Aggiungere immagine libro
    price = models.FloatField()
    seller = fields.ForeignKey(GnumaUser, on_delete = models.CASCADE)