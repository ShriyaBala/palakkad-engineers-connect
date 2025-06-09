from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, default='')
    area = models.CharField(max_length=100, blank=True, default='')
    dob = models.DateField(null=True, blank=True)  # allow null DOB
    gender = models.CharField(max_length=10, blank=True, default='')
    maritalStatus = models.CharField(max_length=20, blank=True, default='')
    aadhaar = models.CharField(max_length=12, unique=True, null=True)  # default Aadhaar
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
    unit = models.CharField(max_length=100, blank=True, default='')
    panchayath = models.CharField(max_length=100, blank=True, default='')
    def __str__(self):
        return self.email

class MemberApplication(models.Model):
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
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"


