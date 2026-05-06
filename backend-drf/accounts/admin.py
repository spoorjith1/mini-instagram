from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class AdminUser(admin.ModelAdmin):
    fields = ['email', 'username', 'password', 'profile_pic', 'first_name', 'last_name', 'is_active', 'is_staff']