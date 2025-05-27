from django.db import models

# Create your models here.
class PageContent(models.Model):
    PAGE_CHOICES = [
        ('about', 'About Us'),
        ('resources', 'Resources'),
        ('advertisement', 'Advertisement'),
    ]
    page_name = models.CharField(max_length=100,choices=PAGE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name