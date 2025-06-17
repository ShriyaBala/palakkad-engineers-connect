# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated,AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from .models import CustomUser
# from .serializers import RegisterSerializer, ProfileSerializer
# from rest_framework.views import APIView
# class joinUs(APIView):
#     permission_classes = [AllowAny] 

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'msg': 'User registered, password sent via email'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# def join_us(request):
#     serializer = RegisterSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'msg': 'User registered, password sent via email'}, status=201)
#     return Response(serializer.errors, status=400)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def me(request):
#     serializer = ProfileSerializer(request.user)
#     return Response(serializer.data)

# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     serializer = ProfileSerializer(request.user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'msg': 'Profile updated'})
#     return Response(serializer.errors, status=400)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def change_password(request):
#     user = request.user
#     current = request.data.get('current_password')
#     new = request.data.get('new_password')
#     if not user.check_password(current):
#         return Response({'error': 'Wrong current password'}, status=400)
#     user.set_password(new)
#     user.save()
#     return Response({'msg': 'Password changed'})



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, MemberApplication
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
import random
import string
from knox.views import LoginView as KnoxLoginView

def generate_password(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Registration: user is created immediately, password sent by email
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
        role='user',
        is_approved=True,
        location=data.get('location', ''),
    )
    send_mail(
        'Registration Successful',
        f'Thank you for registering! Your password is: {password}',
        'noreply@yourdomain.com',
        [user.email],
        fail_silently=True,
    )
    return Response({'message': 'Registration successful. Check your email for your password.'}, status=status.HTTP_201_CREATED)

# Membership: needs admin approval, password sent after approval (handled in admin.py)
@api_view(['POST'])
@permission_classes([AllowAny])
def join_us(request):
    data = request.data
    MemberApplication.objects.create(
        name=data.get('name', ''),
        email=data.get('email', ''),
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
        panchayath=data.get('panchayath', ''),
        unit=data.get('unit', ''),
        location=data.get('location', ''),
        is_approved=False,
    )
    send_mail(
        'Membership Application Received',
        'Thank you for applying for membership. Your application is pending admin approval.',
        'noreply@yourdomain.com',
        [data.get('email')],
        fail_silently=True,
    )
    return Response({'message': 'Application submitted. Await admin approval.'}, status=201)

# Knox login: authenticate with email and password
class LoginAPI(KnoxLoginView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
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
        "location": user.location,
        "role": user.role,
        "is_approved": user.is_approved,
    })

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data
    user.username = data.get('name', user.username)
    user.phone = data.get('phone', user.phone)
    user.location = data.get('location', user.location)
    user.save()
    return Response({'message': 'Profile updated successfully!'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    if not user.check_password(current_password):
        return Response({'error': 'Current password is incorrect.'}, status=400)
    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password changed successfully!'})