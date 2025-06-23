# from django.contrib.auth.models import AbstractUser
# from django.db import models
# from django.utils import timezone

# class CustomUser(AbstractUser):
#     phone = models.CharField(max_length=15, blank=True, default='')
#     area = models.CharField(max_length=100, blank=True, default='')
#     dob = models.DateField(null=True, blank=True)  # allow null DOB
#     gender = models.CharField(max_length=10, blank=True, default='')
#     maritalStatus = models.CharField(max_length=20, blank=True, default='')
#     aadhaar = models.CharField(max_length=12, unique=True,blank=True, null=True)  # default Aadhaar
#     residentialAddress = models.TextField(blank=True, default='')
#     officeAddress = models.TextField(blank=True, default='')
#     postOffice = models.CharField(max_length=100, blank=True, default='')
#     pin = models.CharField(max_length=10, blank=True, default='')
#     licenseNo = models.CharField(max_length=50, blank=True, default='')
#     licenseDate = models.DateField(null=True, blank=True)  # allow null license date
#     renewalDate = models.DateField(null=True, blank=True)  # allow null renewal date
#     qualification = models.CharField(max_length=200, blank=True, default='')
#     additionalQualification = models.CharField(max_length=200, blank=True, default='')
#     skills = models.CharField(max_length=200, blank=True, default='')
#     bloodGroup = models.CharField(max_length=5, blank=True, default='')
#     unit = models.CharField(max_length=100, blank=True, default='')
#     panchayath = models.CharField(max_length=100, blank=True, default='')
#     #location = models.CharField(max_length=255, blank=True)  # Add this line
#     ROLE_CHOICES = [
      
#         ('member', 'Member'),
#         ('area_admin', 'Area Admin'),
#         ('unit_admin', 'Unit Admin'),
#         ('admin', 'Admin'),
        
#     ]
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
#     area = models.CharField(max_length=100, blank=True)
#     unit = models.CharField(max_length=100, blank=True)
#     is_approved = models.BooleanField(default=False)

#     def __str__(self):
#         return self.email
 
# class MemberApplication(models.Model):
#     name = models.CharField(max_length=150)
#     email = models.EmailField()
#     phone = models.CharField(max_length=20)
#     area = models.CharField(max_length=100, blank=True)
#     dob = models.DateField(null=True, blank=True)
#     gender = models.CharField(max_length=10, blank=True)
#     maritalStatus = models.CharField(max_length=20, blank=True)
#     aadhaar = models.CharField(max_length=12, blank=True)
#     residentialAddress = models.TextField(blank=True)
#     officeAddress = models.TextField(blank=True)
#     postOffice = models.CharField(max_length=100, blank=True)
#     pin = models.CharField(max_length=10, blank=True)
#     licenseNo = models.CharField(max_length=50, blank=True)
#     licenseDate = models.DateField(null=True, blank=True)
#     renewalDate = models.DateField(null=True, blank=True)
#     qualification = models.CharField(max_length=200, blank=True)
#     additionalQualification = models.CharField(max_length=200, blank=True)
#     skills = models.CharField(max_length=200, blank=True)
#     bloodGroup = models.CharField(max_length=5, blank=True)
#     unit = models.CharField(max_length=100, blank=True)
#     panchayath = models.CharField(max_length=100, blank=True)
#     #location = models.CharField(max_length=255, blank=True)  # Add this line
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     is_approved = models.BooleanField(default=False)
#     approved_at = models.DateTimeField(null=True, blank=True)  # Optionally, add a timestamp for approval

#     def __str__(self):
#         return f"{self.name} ({self.email})"

# # class Shop(models.Model):
# #     name = models.CharField(max_length=100)
# #     category = models.CharField(max_length=50)
# #     location = models.CharField(max_length=100)
# #     phone = models.CharField(max_length=50)
# #     email = models.EmailField(blank=True, null=True)
# #     website = models.URLField(blank=True, null=True)
# #     map_link = models.URLField(blank=True, null=True)

# #     def __str__(self):
# #         return self.name

# # class Event(models.Model):
# #     title = models.CharField(max_length=100)
# #     date = models.DateTimeField()
# #     description = models.TextField()
# #     # ...other fields...

# # class Advertisement(models.Model):
# #     title = models.CharField(max_length=100)
# #     image = models.ImageField(upload_to='ads/')
# #     video = models.FileField(upload_to='ads/videos/', blank=True, null=True)
# #     link = models.URLField(blank=True)
# #     # ...other fields...


# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class Area(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=100)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='units')

    def __str__(self):
        return f"{self.name} ({self.area.name})"

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('member', 'Member'),
        ('area_admin', 'Area Admin'),
        ('unit_admin', 'Unit Admin'),
        ('superuser', 'Superuser'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    phone = models.CharField(max_length=15, blank=True, default='')
    area = models.CharField(max_length=100, blank=True, default='')
    unit = models.CharField(max_length=100, blank=True, default='')
    dob = models.DateField(null=True, blank=True)  # allow null DOB
    gender = models.CharField(max_length=10, blank=True, default='')
    maritalStatus = models.CharField(max_length=20, blank=True, default='')
    aadhaar = models.CharField(max_length=12, unique=True, blank=True, null=True)  # default Aadhaar
    residentialAddress = models.TextField(blank=True, default='')
    officeAddress = models.TextField(blank=True, default='')
    postOffice = models.CharField(max_length=100, blank=True, default='')
    pin = models.CharField(max_length=10, blank=True, default='')
    licenseNo = models.CharField(max_length=50, blank=True, default='')
    licenseDate = models.DateField(null=True, blank=True)  # allow null license date
    renewalDate = models.DateField(null=True, blank=True)  # allow null renewal date
    qualification = models.CharField(max_length=200, blank=True, default='')
    additionalQualification = models.CharField(max_length=200, blank=True, default='')
    skills = models.CharField(max_length=200, blank=True, default='')
    bloodGroup = models.CharField(max_length=5, blank=True, default='')
    panchayath = models.CharField(max_length=100, blank=True, default='')
    is_approved = models.BooleanField(default=False)
    is_member = models.BooleanField(default=False)
    is_area_admin = models.BooleanField(default=False)
    is_unit_admin = models.BooleanField(default=False)
    passport_photo = models.ImageField(upload_to='passport_photos/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # username is still required for admin

    def __str__(self):
        return self.email

class MembershipApplication(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    area = models.CharField(max_length=100, blank=True)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    maritalStatus = models.CharField(max_length=20, blank=True)
    aadhaar = models.CharField(max_length=12, blank=True)
    residentialAddress = models.TextField(blank=True)
    officeAddress = models.TextField(blank=True)
    postOffice = models.CharField(max_length=100, blank=True)
    pin = models.CharField(max_length=10, blank=True)
    licenseNo = models.CharField(max_length=50, blank=True)
    licenseDate = models.DateField(null=True, blank=True)
    renewalDate = models.DateField(null=True, blank=True)
    qualification = models.CharField(max_length=200, blank=True)
    additionalQualification = models.CharField(max_length=200, blank=True)
    skills = models.CharField(max_length=200, blank=True)
    bloodGroup = models.CharField(max_length=5, blank=True)
    unit = models.CharField(max_length=100, blank=True)
    panchayath = models.CharField(max_length=100, blank=True)
    passport_photo = models.ImageField(upload_to='passport_photos/', blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    approved_at = models.DateTimeField(null=True, blank=True)  # Optionally, add a timestamp for approval

    def __str__(self):
        return f"{self.name} ({self.email})"
