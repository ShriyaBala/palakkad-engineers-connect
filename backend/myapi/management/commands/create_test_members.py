from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from myapi.models import CustomUser

class Command(BaseCommand):
    help = 'Create test members for the directory'

    def handle(self, *args, **options):
        test_members = [
            {
                'username': 'john_engineer',
                'email': 'john@example.com',
                'phone': '9876543210',
                'area': 'Palakkad Town',
                'unit': 'Palakkad Unit',
                'qualification': 'B.Tech Civil Engineering',
                'skills': 'Structural Design, Construction Management',
                'licenseNo': 'KL123456',
                'panchayath': 'Palakkad Municipality',
                'role': 'member',
                'is_approved': True,
                'is_member': True,
            },
            {
                'username': 'sarah_architect',
                'email': 'sarah@example.com',
                'phone': '9876543211',
                'area': 'Ottapalam',
                'unit': 'Ottapalam Unit',
                'qualification': 'B.Arch Architecture',
                'skills': 'Architectural Design, Interior Design',
                'licenseNo': 'KL123457',
                'panchayath': 'Ottapalam Municipality',
                'role': 'member',
                'is_approved': True,
                'is_member': True,
            },
            {
                'username': 'mike_electrical',
                'email': 'mike@example.com',
                'phone': '9876543212',
                'area': 'Shoranur',
                'unit': 'Shoranur Unit',
                'qualification': 'B.Tech Electrical Engineering',
                'skills': 'Electrical Design, Power Systems',
                'licenseNo': 'KL123458',
                'panchayath': 'Shoranur Municipality',
                'role': 'member',
                'is_approved': True,
                'is_member': True,
            },
            {
                'username': 'lisa_mechanical',
                'email': 'lisa@example.com',
                'phone': '9876543213',
                'area': 'Mannarkkad',
                'unit': 'Mannarkkad Unit',
                'qualification': 'B.Tech Mechanical Engineering',
                'skills': 'Machine Design, CAD/CAM',
                'licenseNo': 'KL123459',
                'panchayath': 'Mannarkkad Municipality',
                'role': 'member',
                'is_approved': True,
                'is_member': True,
            },
            {
                'username': 'david_software',
                'email': 'david@example.com',
                'phone': '9876543214',
                'area': 'Alathur',
                'unit': 'Alathur Unit',
                'qualification': 'B.Tech Computer Science',
                'skills': 'Software Development, Web Development',
                'licenseNo': 'KL123460',
                'panchayath': 'Alathur Municipality',
                'role': 'member',
                'is_approved': True,
                'is_member': True,
            },
        ]

        created_count = 0
        for member_data in test_members:
            # Check if user already exists
            if not CustomUser.objects.filter(email=member_data['email']).exists():
                # Create user with a default password
                user = CustomUser.objects.create(
                    username=member_data['username'],
                    email=member_data['email'],
                    password=make_password('testpass123'),  # Default password
                    phone=member_data['phone'],
                    area=member_data['area'],
                    unit=member_data['unit'],
                    qualification=member_data['qualification'],
                    skills=member_data['skills'],
                    licenseNo=member_data['licenseNo'],
                    panchayath=member_data['panchayath'],
                    role=member_data['role'],
                    is_approved=member_data['is_approved'],
                    is_member=member_data['is_member'],
                )
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created member: {user.username} ({user.email})')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Member already exists: {member_data["email"]}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} test members')
        ) 