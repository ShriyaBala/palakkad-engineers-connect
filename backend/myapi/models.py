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


