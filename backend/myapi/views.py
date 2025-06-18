# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.permissions import IsAuthenticated,AllowAny
# # from rest_framework.response import Response
# # from rest_framework import status
# # from .models import CustomUser
# # from .serializers import RegisterSerializer, ProfileSerializer
# # from rest_framework.views import APIView
# # class joinUs(APIView):
# #     permission_classes = [AllowAny] 

# #     def post(self, request):
# #         serializer = RegisterSerializer(data=request.data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response({'msg': 'User registered, password sent via email'}, status=status.HTTP_201_CREATED)
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # @api_view(['POST'])
# # def join_us(request):
# #     serializer = RegisterSerializer(data=request.data)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response({'msg': 'User registered, password sent via email'}, status=201)
# #     return Response(serializer.errors, status=400)

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def me(request):
# #     serializer = ProfileSerializer(request.user)
# #     return Response(serializer.data)

# # @api_view(['PATCH'])
# # @permission_classes([IsAuthenticated])
# # def update_profile(request):
# #     serializer = ProfileSerializer(request.user, data=request.data, partial=True)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response({'msg': 'Profile updated'})
# #     return Response(serializer.errors, status=400)

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def change_password(request):
# #     user = request.user
# #     current = request.data.get('current_password')
# #     new = request.data.get('new_password')
# #     if not user.check_password(current):
# #         return Response({'error': 'Wrong current password'}, status=400)
# #     user.set_password(new)
# #     user.save()
# #     return Response({'msg': 'Password changed'})



# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
# from rest_framework.response import Response
# from rest_framework import status
# from .models import CustomUser, MemberApplication
# from django.core.mail import send_mail
# from django.contrib.auth.hashers import make_password
# from django.contrib.auth import authenticate
# import random
# import string
# from knox.views import LoginView as KnoxLoginView

# def generate_password(length=8):
#     return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# # Registration: user is created immediately, password sent by email
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_user(request):
#     data = request.data
#     if CustomUser.objects.filter(email=data.get('email')).exists():
#         return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)
#     password = generate_password()
#     user = CustomUser.objects.create(
#         username=data.get('username', data.get('email').split('@')[0]),
#         email=data.get('email'),
#         phone=data.get('phone', ''),
#         password=make_password(password),
#         area=data.get('area', ''),
#         unit=data.get('unit', ''),
#         role='user',
#         is_approved=True,
       
#     )
#     send_mail(
#         'Registration Successful',
#         f'Thank you for registering! Your password is: {password}',
#         'noreply@yourdomain.com',
#         [user.email],
#         fail_silently=True,
#     )
#     return Response({'message': 'Registration successful. Check your email for your password.'}, status=status.HTTP_201_CREATED)

# # Membership: needs admin approval, password sent after approval (handled in admin.py)
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def join_us(request):
#     data = request.data
#     MemberApplication.objects.create(
#         name=data.get('name', ''),
#         email=data.get('email', ''),
#         phone=data.get('phone', ''),
#         area=data.get('area', ''),
#         dob=data.get('dob') or None,
#         gender=data.get('gender', ''),
#         maritalStatus=data.get('maritalStatus', ''),
#         aadhaar=data.get('aadhaar', ''),
#         residentialAddress=data.get('residentialAddress', ''),
#         officeAddress=data.get('officeAddress', ''),
#         postOffice=data.get('postOffice', ''),
#         pin=data.get('pin', ''),
#         licenseNo=data.get('licenseNo', ''),
#         licenseDate=data.get('licenseDate') or None,
#         renewalDate=data.get('renewalDate') or None,
#         qualification=data.get('qualification', ''),
#         additionalQualification=data.get('additionalQualification', ''),
#         skills=data.get('skills', ''),
#         bloodGroup=data.get('bloodGroup', ''),
#         panchayath=data.get('panchayath', ''),
#         unit=data.get('unit', ''),
#         #location=data.get('location', ''),
#         is_approved=False,
#     )
#     send_mail(
#         'Membership Application Received',
#         'Thank you for applying for membership. Your application is pending admin approval.',
#         'noreply@yourdomain.com',
#         [data.get('email')],
#         fail_silently=True,
#     )
#     return Response({'message': 'Application submitted. Await admin approval.'}, status=201)

# # Knox login: authenticate with email and password
# class LoginAPI(KnoxLoginView):
#     permission_classes = (AllowAny,)

#     def post(self, request, format=None):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             return super().post(request)
#         return Response({'error': 'Invalid credentials'}, status=400)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def me(request):
#     user = request.user
#     return Response({
#         "name": user.username,
#         "email": user.email,
#         "phone": user.phone,
#         "location": user.location,
#         "role": user.role,
#         "is_approved": user.is_approved,
#     })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_member(request):
#     data = request.data
#     user = CustomUser.objects.create(
#         username=data.get('email').split('@')[0],
#         email=data.get('email'),
#         password=make_password(data.get('password')),
#         role='member',
#         is_approved=False,
#         area=data.get('area', ''),
#         unit=data.get('unit', ''),
#     )
#     return Response({'message': 'Registration submitted. Await admin approval.'}, status=201)

# # Area Admin Registration
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_area_admin(request):
#     data = request.data
#     user = CustomUser.objects.create(
#         username=data.get('email').split('@')[0],
#         email=data.get('email'),
#         password=make_password(data.get('password')),
#         role='area_admin',
#         is_approved=False,
#         area=data.get('area', ''),
#         unit='',  # Area admin may not have a unit
#     )
#     return Response({'message': 'Area Admin registration submitted. Await admin approval.'}, status=201)

# # Unit Admin Registration
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_unit_admin(request):
#     data = request.data
#     user = CustomUser.objects.create(
#         username=data.get('email').split('@')[0],
#         email=data.get('email'),
#         password=make_password(data.get('password')),
#         role='unit_admin',
#         is_approved=False,
#         area=data.get('area', ''),
#         unit=data.get('unit', ''),
#     )
#     return Response({'message': 'Unit Admin registration submitted. Await admin approval.'}, status=201)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     user = request.user
#     data = request.data
#     user.username = data.get('name', user.username)
#     user.phone = data.get('phone', user.phone)
#     user.location = data.get('location', user.location)
#     user.save()
#     return Response({'message': 'Profile updated successfully!'})

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def change_password(request):
#     user = request.user
#     current_password = request.data.get('current_password')
#     new_password = request.data.get('new_password')
#     if not user.check_password(current_password):
#         return Response({'error': 'Current password is incorrect.'}, status=400)
#     user.set_password(new_password)
#     user.save()
#     return Response({'message': 'Password changed successfully!'})

# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def approve_member_application(request):
#     email = request.data.get('email')
#     if not email:
#         return Response({'error': 'No email provided.'}, status=400)
#     try:
#         app = MemberApplication.objects.get(email=email)
#         app.is_approved = True
#         app.save()
#         # Optionally create a CustomUser here
#         return Response({'message': 'Membership approved!'})
#     except MemberApplication.DoesNotExist:
#         return Response({'error': 'Application not found.'}, status=404)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
import random
import string
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .models import MembershipApplication

from django.contrib.auth import get_user_model

User = get_user_model()

def generate_password(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    if CustomUser.objects.filter(email=data.get('email')).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)
    password = generate_password()
    user = CustomUser.objects.create(
        username=data.get('username', data.get('email').split('@')[0]),
        email=data.get('email'),
        phone=data.get('phone', ''),
        password=make_password(password),
        area=data.get('area', ''),
        unit=data.get('unit', ''),
        role=data.get('role', 'member'),
        is_approved=False,  # All registrations need approval
    )
    send_mail(
        'Registration Successful',
        f'Thank you for registering! Your password is: {password}',
        'noreply@yourdomain.com',
        [user.email],
        fail_silently=True,
    )
    return Response({'message': 'Registration successful. Await admin approval.'}, status=status.HTTP_201_CREATED)

class LoginAPI(KnoxLoginView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            if not user.is_approved:
                return Response({'error': 'Your account is pending approval.'}, status=403)
            return super().post(request)
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "name": user.username,
        "email": user.email,
        "phone": user.phone,
        "area": user.area,
        "unit": user.unit,
        "role": user.role,
        "is_approved": user.is_approved,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    try:
        user = CustomUser.objects.get(email=email, is_approved=True)
        token = default_token_generator.make_token(user)
        reset_url = f"{request.scheme}://{request.get_host()}/reset-password/{user.pk}/{token}/"
        send_mail(
            "Password Reset",
            f"Click the link to reset your password: {reset_url}",
            "noreply@yourdomain.com",
            [email],
            fail_silently=True,
        )
        return Response({"exists": True})
    except CustomUser.DoesNotExist:
        pass  # Don't reveal if email exists
    return Response({"message": "If your email is registered and approved, a reset link has been sent."})

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    uid = request.data.get('uid')
    token = request.data.get('token')
    password = request.data.get('password')
    try:
        user = CustomUser.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successful!"})
        else:
            return Response({"error": "Invalid or expired token."}, status=400)
    except CustomUser.DoesNotExist:
        return Response({"error": "Invalid user."}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        # Login successful, return token or user info
        return Response({"message": "Login successful!"})
    else:
        # Login failed
        return Response({"error": "Invalid email or password."}, status=400)




@api_view(['POST'])
@permission_classes([AllowAny])
def join_us(request):
    data = request.data

    # 1) Check duplicates
    if User.objects.filter(email=data.get('email')).exists():
        return Response({'error': 'Email already registered'}, status=400)
    if data.get('aadhaar') and User.objects.filter(aadhaar=data['aadhaar']).exists():
        return Response({'error': 'Aadhaar already registered'}, status=400)
    raw_password = generate_password()  
    # 2) Create user
    try:
        user = User.objects.create(
            username=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone', ''),
            area=data.get('area', ''),
            dob=data.get('dob') or None,
            gender=data.get('gender', ''),
            maritalStatus=data.get('maritalStatus', ''),
            aadhaar=data.get('aadhaar', ''),
            residentialAddress=data.get('residentialAddress', ''),
            officeAddress=data.get('officeAddress', ''),
            postOffice=data.get('postOffice', ''),
            pin=data.get('pin', ''),
            licenseNo=data.get('licenseNo', ''),
            licenseDate=data.get('licenseDate') or None,
            renewalDate=data.get('renewalDate') or None,
            qualification=data.get('qualification', ''),
            additionalQualification=data.get('additionalQualification', ''),
            skills=data.get('skills', ''),
            bloodGroup=data.get('bloodGroup', ''),
            unit=data.get('unit', ''),
            panchayath=data.get('panchayath', ''),
            role='member',
            is_approved=False,
            password=make_password(None)  # unusable password
        )
    except Exception as e:
        return Response({'error': f'Failed to create user: {str(e)}'}, status=500)
    try:
        send_mail(
            'Your Lensfed Membership Password',
            f'Hello {user.username},\n\n'
            f'Thank you for applying for membership. Your temporary password is:\n\n'
            f'    {raw_password}\n\n'
            'Once your account is approved by an admin, you can log in with this password '
            'and then go to “Change Password” to set one of your choice.',
            'noreply@yourdomain.com',
            [user.email],
            fail_silently=False,
        )
    except Exception:
        # if email fails, you might still want to notify or log it, but don't block the API
        pass
    # 3) Success response
    return Response({'message': 'Application submitted. Awaiting approval.'}, status=201)

