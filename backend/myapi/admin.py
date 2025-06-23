from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import redirect, get_object_or_404
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.utils import timezone
import random
import string
from .models import CustomUser, MembershipApplication, Area, Unit

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('photo_preview', 'name_display', 'email', 'area', 'role', 'approval_toggle', 'date_joined')
    list_filter = ('role', 'is_approved', 'area', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'phone', 'area')
    ordering = ('-date_joined',)
    list_per_page = 25
    
    # Simplified fieldsets
    fieldsets = (
        ('Basic Information', {
            'fields': ('username', 'email', 'password', 'first_name', 'last_name', 'passport_photo')
        }),
        ('LENSFED Information', {
            'fields': ('role', 'area', 'is_approved')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser')
        }),
    )
    
    readonly_fields = ('date_joined', 'last_login')
    
    actions = ['approve_selected_users', 'make_area_admin', 'make_unit_admin', 'make_member']

    def name_display(self, obj):
        full_name = f"{obj.first_name} {obj.last_name}".strip()
        if full_name:
            return full_name
        return obj.username
    name_display.short_description = 'Name'

    def photo_preview(self, obj):
        if obj.passport_photo:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 50px; border-radius: 5px; object-fit: cover;" />',
                obj.passport_photo.url
            )
        return format_html(
            '<div style="width: 50px; height: 50px; background-color: #f0f0f0; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">No Photo</div>'
        )
    photo_preview.short_description = 'Photo'

    def approval_toggle(self, obj):
        if obj.is_approved:
            color = "green"
            text = "APPROVED"
            button_text = "Unapprove"
            button_color = "#dc3545"
        else:
            color = "red"
            text = "PENDING"
            button_text = "Approve"
            button_color = "#28a745"
        
        return format_html(
            '<div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">'
            '<span style="color: {}; font-weight: bold; font-size: 12px;">{}</span>'
            '<a class="button" style="background-color: {}; color: white; padding: 4px 8px; text-decoration: none; border-radius: 3px; font-size: 11px; border: none; cursor: pointer;" href="{}">{}</a>'
            '</div>',
            color, text, button_color, f'./toggle-approval/{obj.pk}/', button_text
        )
    approval_toggle.short_description = 'Approval Status'

    @admin.action(description="Approve selected users")
    def approve_selected_users(self, request, queryset):
        updated = queryset.update(is_approved=True, role='member')
        self.message_user(request, f"Successfully approved {updated} user(s).")

    @admin.action(description="Make selected users Area Admins")
    def make_area_admin(self, request, queryset):
        updated = queryset.update(role='area_admin', is_approved=True)
        self.message_user(request, f"Successfully made {updated} user(s) Area Admins.")

    @admin.action(description="Make selected users Unit Admins")
    def make_unit_admin(self, request, queryset):
        updated = queryset.update(role='unit_admin', is_approved=True)
        self.message_user(request, f"Successfully made {updated} user(s) Unit Admins.")

    @admin.action(description="Make selected users Members")
    def make_member(self, request, queryset):
        updated = queryset.update(role='member', is_approved=True)
        self.message_user(request, f"Successfully made {updated} user(s) Members.")

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('toggle-approval/<int:user_id>/', self.admin_site.admin_view(self.toggle_approval_view), name='toggle-approval'),
        ]
        return custom_urls + urls

    def toggle_approval_view(self, request, user_id):
        user = get_object_or_404(CustomUser, pk=user_id)
        user.is_approved = not user.is_approved
        user.save()
        
        if user.is_approved:
            self.message_user(request, f"User {user.username} has been approved successfully.")
        else:
            self.message_user(request, f"User {user.username} has been unapproved.")
        
        return redirect(request.META.get('HTTP_REFERER', '/admin/myapi/customuser/'))

    def save_model(self, request, obj, form, change):
        # Auto-set role-based flags
        if obj.role == 'area_admin':
            obj.is_area_admin = True
            obj.is_approved = True
        elif obj.role == 'unit_admin':
            obj.is_unit_admin = True
            obj.is_approved = True
        elif obj.role == 'member':
            obj.is_member = True
        elif obj.role == 'superuser':
            obj.is_superuser = True
            obj.is_staff = True
            obj.is_approved = True
        
        super().save_model(request, obj, form, change)

# Hide other models from admin for simplicity
# admin.site.unregister(MembershipApplication)
# admin.site.unregister(Area)
# admin.site.unregister(Unit)