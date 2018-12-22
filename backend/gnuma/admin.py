from django.contrib import admin
from .models import  GnumaUser, Office, Class, Ad

admin.site.register(Ad)
admin.site.register(Class)
admin.site.register(Office)
admin.site.register(GnumaUser)