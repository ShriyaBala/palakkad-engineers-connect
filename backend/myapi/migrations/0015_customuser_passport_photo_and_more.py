# Generated by Django 5.2.1 on 2025-06-23 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0014_area_rename_memberapplication_membershipapplication_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='passport_photo',
            field=models.ImageField(blank=True, null=True, upload_to='passport_photos/'),
        ),
        migrations.AddField(
            model_name='membershipapplication',
            name='passport_photo',
            field=models.ImageField(blank=True, null=True, upload_to='passport_photos/'),
        ),
    ]
