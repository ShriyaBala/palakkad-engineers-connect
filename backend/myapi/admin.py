from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .models import MemberApplication

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'phone', 'area', 'is_staff')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(MemberApplication)