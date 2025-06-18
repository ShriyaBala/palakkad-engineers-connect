# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from django.core.mail import send_mail
# from django.contrib.auth.hashers import make_password
# from django.utils import timezone
# import random
# import string
# from .models import CustomUser, MemberApplication

# @admin.action(description="Approve selected users as members")
# def approve_users(modeladmin, request, queryset):
#     for user in queryset:
#         user.is_approved = True
#         user.role = 'member'
#         user.save()
#         if not MemberApplication.objects.filter(email=user.email).exists():
#             MemberApplication.objects.create(
#                 name=user.username,
#                 email=user.email,
#                 phone=user.phone,
#                 area=user.area,
#                 dob=user.dob,
#                 gender=user.gender,
#                 maritalStatus=user.maritalStatus,
#                 aadhaar=user.aadhaar,
#                 residentialAddress=user.residentialAddress,
#                 officeAddress=user.officeAddress,
#                 postOffice=user.postOffice,
#                 pin=user.pin,
#                 licenseNo=user.licenseNo,
#                 licenseDate=user.licenseDate,
#                 renewalDate=user.renewalDate,
#                 qualification=user.qualification,
#                 additionalQualification=user.additionalQualification,
#                 skills=getattr(user, 'skills', ''),
#                 bloodGroup=getattr(user, 'bloodGroup', ''),
#                 unit=getattr(user, 'unit', ''),
#                 panchayath=getattr(user, 'panchayath', ''),
#             )

# @admin.action(description="Approve selected applications and create user")
# def approve_applications(modeladmin, request, queryset):
#     for app in queryset:
#         if not CustomUser.objects.filter(email=app.email).exists():
#             # Generate random password
#             password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
#             user = CustomUser.objects.create(
#                 username=app.email.split('@')[0],  # or use a username field if you have one
#                 email=app.email,
#                 phone=app.phone,
#                 area=app.area,
#                 dob=app.dob,
#                 gender=app.gender,
#                 maritalStatus=app.maritalStatus,
#                 aadhaar=app.aadhaar,
#                 residentialAddress=app.residentialAddress,
#                 officeAddress=app.officeAddress,
#                 postOffice=app.postOffice,
#                 pin=app.pin,
#                 licenseNo=app.licenseNo,
#                 licenseDate=app.licenseDate,
#                 renewalDate=app.renewalDate,
#                 qualification=app.qualification,
#                 additionalQualification=app.additionalQualification,
#                 skills=getattr(app, 'skills', ''),
#                 bloodGroup=getattr(app, 'bloodGroup', ''),
#                 unit=getattr(app, 'unit', ''),
#                 panchayath=getattr(app, 'panchayath', ''),
#                 role='member',
#                 is_approved=True,
#                 password=make_password(password),
#             )
#             # Send password to member's email
#             send_mail(
#                 'Your LENSFED Membership Account Password',
#                 f'Your temporary password is: {password}',
#                 'noreply@lensfed.in',
#                 [user.email],
#                 fail_silently=False,
#             )

# class CustomUserAdmin(UserAdmin):
#     model = CustomUser
#     list_display = (
#         'username', 'email', 'phone', 'area', 'unit', 'role', 'approval_status', 'is_approved', 'is_staff'
#     )
#     list_editable = ('is_approved',)  # This makes is_approved editable in the list view!
#     list_filter = ('role', 'is_approved', 'is_staff', 'is_superuser', 'is_active', 'area', 'unit')
#     actions = [approve_users]
#     fieldsets = UserAdmin.fieldsets + (
#         ('Additional Info', {'fields': ('phone', 'area','unit', 'role', 'is_approved')}),
#     )

#     def approval_status(self, obj):
#         return "Approved" if obj.is_approved else "Pending"
#     approval_status.short_description = "Approval Status"

#     def save_model(self, request, obj, form, change):
#         was_approved = False
#         if change:
#             old_obj = CustomUser.objects.get(pk=obj.pk)
#             was_approved = old_obj.is_approved
#         super().save_model(request, obj, form, change)
#         # If just approved, create MemberApplication
#         if obj.is_approved and not was_approved:
#             if not MemberApplication.objects.filter(email=obj.email).exists():
#                 MemberApplication.objects.create(
#                     name=obj.username,
#                     email=obj.email,
#                     phone=obj.phone,
#                     area=obj.area,
#                     dob=obj.dob,
#                     gender=obj.gender,
#                     maritalStatus=obj.maritalStatus,
#                     aadhaar=obj.aadhaar,
#                     residentialAddress=obj.residentialAddress,
#                     officeAddress=obj.officeAddress,
#                     postOffice=obj.postOffice,
#                     pin=obj.pin,
#                     licenseNo=obj.licenseNo,
#                     licenseDate=obj.licenseDate,
#                     renewalDate=obj.renewalDate,
#                     qualification=obj.qualification,
#                     additionalQualification=obj.additionalQualification,
#                     skills=getattr(obj, 'skills', ''),
#                     bloodGroup=getattr(obj, 'bloodGroup', ''),
#                     unit=getattr(obj, 'unit', ''),
#                     panchayath=getattr(obj, 'panchayath', ''),
#                 )

# class MemberApplicationAdmin(admin.ModelAdmin):
#     list_display = (
#         'name', 'email', 'phone', 'area','unit', 'is_approved', 'approved_at'
#     )
#     list_filter = ('is_approved',)
#     list_editable = ('is_approved',)  # Makes approval a checkbox in the table!

#     def save_model(self, request, obj, form, change):
#         # If just approved, create user and email password
#         if obj.is_approved and not obj.approved_at:
#             obj.approved_at = timezone.now()
#             if not CustomUser.objects.filter(email=obj.email).exists():
#                 password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
#                 user = CustomUser.objects.create(
#                     username=obj.email.split('@')[0],
#                     email=obj.email,
#                     phone=obj.phone,
#                     area=obj.area,
#                     dob=obj.dob,
#                     gender=obj.gender,
#                     maritalStatus=obj.maritalStatus,
#                     aadhaar=obj.aadhaar,
#                     residentialAddress=obj.residentialAddress,
#                     officeAddress=obj.officeAddress,
#                     postOffice=obj.postOffice,
#                     pin=obj.pin,
#                     licenseNo=obj.licenseNo,
#                     licenseDate=obj.licenseDate,
#                     renewalDate=obj.renewalDate,
#                     qualification=obj.qualification,
#                     additionalQualification=obj.additionalQualification,
#                     skills=getattr(obj, 'skills', ''),
#                     bloodGroup=getattr(obj, 'bloodGroup', ''),
#                     unit=getattr(obj, 'unit', ''),
#                     panchayath=getattr(obj, 'panchayath', ''),
#                     role='member',
#                     is_approved=True,
#                     password=make_password(password),
#                 )
#                 send_mail(
#                     'Your LENSFED Membership Account Password',
#                     f'Your temporary password is: {password}',
#                     'noreply@lensfed.in',
#                     [user.email],
#                     fail_silently=False,
#                 )
#         super().save_model(request, obj, form, change)

# admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(MemberApplication, MemberApplicationAdmin)


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import redirect, get_object_or_404
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'area', 'unit', 'is_approved', 'toggle_approval')
    list_filter = ('role', 'is_approved', 'area', 'unit')

    def toggle_approval(self, obj):
        if obj.is_approved:
            color = "green"
            text = "ON"
        else:
            color = "red"
            text = "OFF"
        return format_html(
            '<a class="button" style="color:{};" href="{}">{}</a>',
            color,
            f'./toggle-approval/{obj.pk}/',
            text
        )
    toggle_approval.short_description = 'Approval'

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
        return redirect(request.META.get('HTTP_REFERER', '/admin/myapi/customuser/'))