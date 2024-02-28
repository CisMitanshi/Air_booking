from django.contrib import admin

# Register your models here.
from .models import CustomUser


class AdminCutomer(admin.ModelAdmin):
    fields = ['email', 'username', 'password']

admin.site.register(CustomUser,AdminCutomer)