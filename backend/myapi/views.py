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
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser  # Use your custom user model
from django.core.mail import send_mail
import random
import string

def generate_password(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@api_view(['POST'])
def join_us(request):
    username = request.data.get('username')
    email = request.data.get('email')
    phone = request.data.get('phone')

    if not username or not email or not phone:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if CustomUser.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    password = generate_password()
    user = CustomUser.objects.create_user(
        username=username,
        email=email,
        password=password,
        phone=phone
    )
    user.save()

    send_mail(
        'Your LENSFED Account Password',
        f'Your temporary password is: {password}',
        'shriyabminnu@gmail.com',  # Or use settings.DEFAULT_FROM_EMAIL
        [email],
        fail_silently=False,
    )

    return Response({'message': 'Registration successful! Please check your email for your password.'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        "name": user.username,
        "email": user.email,
        "phone": user.phone,
        "area": user.area,
    })

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data
    user.username = data.get('name', user.username)
    user.phone = data.get('phone', user.phone)
    user.area = data.get('area', user.area)
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