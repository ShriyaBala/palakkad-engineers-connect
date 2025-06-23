from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, MembershipApplication
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
import random
import string
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from knox.models import AuthToken
from django.contrib.auth import get_user_model
from .serializers import MemberSearchSerializer
from rest_framework import viewsets, permissions
from django.db.models import Q

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
    print(password)
    send_mail(
        'Registration Successful',
        f'Thank you for registering! Your password is: {password}',
        'noreply@yourdomain.com',
        [user.email],
        fail_silently=True,
    )
    return Response({'message': 'Registration successful. Await admin approval.'}, status=status.HTTP_201_CREATED)

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
        user = User.objects.get(email=email, is_approved=True)
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
    except User.DoesNotExist:
        pass  # Don't reveal if email exists
    return Response({"message": "If your email is registered and approved, a reset link has been sent."})

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    uid = request.data.get('uid')
    token = request.data.get('token')
    password = request.data.get('password')
    try:
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successful!"})
        else:
            return Response({"error": "Invalid or expired token."}, status=400)
    except User.DoesNotExist:
        return Response({"error": "Invalid user."}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(password):
        return Response({"error": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)

    token = AuthToken.objects.create(user)[1]

    # Determine redirect based on user role
    redirect_to = "/dashboard"  # Default redirect
    if user.is_superuser or user.is_staff:
        redirect_to = "/admin-dashboard"
    elif user.role == 'area_admin':
        redirect_to = "/area-admin-dashboard"
    elif user.role == 'unit_admin':
        redirect_to = "/unit-admin-dashboard"

    return Response({
        "message": "Login successful",
        "token": token,
        "redirect_to": redirect_to,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.get_full_name() or user.username,
            "role": user.role,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "is_approved": user.is_approved,
        }
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def join_us(request):
    data = request.data
    MembershipApplication.objects.create(  # type: ignore[attr-defined]
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
        #location=data.get('location', ''),
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

@api_view(['GET'])
@permission_classes([AllowAny])
def search_members(request):
    """
    Search members by name, email, area, unit, qualification, or skills
    """
    search_query = request.GET.get('search', '').strip()
    search_type = request.GET.get('search_type', 'location')
    specialization = request.GET.get('specialization', '').strip()
    experience = request.GET.get('experience', '').strip()
    
    # Base query for approved members
    members = CustomUser.objects.filter(is_approved=True, is_member=True)
    
    # Apply search query based on search type
    if search_query:
        if search_type == 'location':
            members = members.filter(
                Q(area__icontains=search_query) |  # type: ignore[operator]
                Q(unit__icontains=search_query) |  # type: ignore[operator]
                Q(panchayath__icontains=search_query)  # type: ignore[operator]
            )
        elif search_type == 'name':
            members = members.filter(
                Q(username__icontains=search_query) |  # type: ignore[operator]
                Q(first_name__icontains=search_query) |  # type: ignore[operator]
                Q(last_name__icontains=search_query)  # type: ignore[operator]
            )
        elif search_type == 'occupation':
            members = members.filter(
                Q(qualification__icontains=search_query) |  # type: ignore[operator]
                Q(skills__icontains=search_query)  # type: ignore[operator]
            )
        else:
            # General search across all fields
            members = members.filter(
                Q(username__icontains=search_query) |  # type: ignore[operator]
                Q(email__icontains=search_query) |  # type: ignore[operator]
                Q(area__icontains=search_query) |  # type: ignore[operator]
                Q(unit__icontains=search_query) |  # type: ignore[operator]
                Q(qualification__icontains=search_query) |  # type: ignore[operator]
                Q(skills__icontains=search_query) |  # type: ignore[operator]
                Q(licenseNo__icontains=search_query) |  # type: ignore[operator]
                Q(panchayath__icontains=search_query)  # type: ignore[operator]
            )
    
    # Apply specialization filter
    if specialization:
        members = members.filter(qualification__icontains=specialization)
    
    # Apply experience filter (if we had experience field, we would use it here)
    # For now, we'll skip this as we don't have an experience field
    
    # Order by username
    members = members.order_by('username')
    
    serializer = MemberSearchSerializer(members, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_members(request):
    """
    Get all approved members without search
    """
    
    members = CustomUser.objects.filter(
        is_approved=True,
        is_member=True
    ).order_by('username')
    
    serializer = MemberSearchSerializer(members, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    """
    Get admin dashboard data - only for superusers and staff
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    # Get pending members for approval
    pending_members = CustomUser.objects.filter(is_approved=False).count()
    total_members = CustomUser.objects.filter(is_approved=True, role='member').count()
    total_area_admins = CustomUser.objects.filter(is_approved=True, role='area_admin').count()
    total_unit_admins = CustomUser.objects.filter(is_approved=True, role='unit_admin').count()
    
    return Response({
        "pending_members": pending_members,
        "total_members": total_members,
        "total_area_admins": total_area_admins,
        "total_unit_admins": total_unit_admins,
        "admin_info": {
            "name": request.user.get_full_name() or request.user.username,
            "email": request.user.email,
            "role": request.user.role,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_members(request):
    """
    Get all pending members for admin approval
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    pending_members = CustomUser.objects.filter(is_approved=False).order_by('-date_joined')
    serializer = MemberSearchSerializer(pending_members, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_member(request, user_id):
    """
    Approve a member by admin
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    try:
        user = User.objects.get(id=user_id)
        user.is_approved = True
        user.is_member = True
        user.save()
        
        # Send approval email
        try:
            send_mail(
                'Your LENSFED Membership Has Been Approved!',
                f'''Dear {user.get_full_name() or user.username},\n\nGreat news! Your LENSFED membership has been approved by the admin.\n\nYou can now access all member features and benefits.\n\nBest regards,\nLENSFED Team''',
                'noreply@lensfed.in',
                [user.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Failed to send approval email: {e}")
        
        return Response({"message": f"User {user.username} has been approved successfully."})
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_member(request, user_id):
    """
    Reject a member by admin
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    try:
        user = User.objects.get(id=user_id)
        user.is_approved = False
        user.save()
        
        # Send rejection email
        try:
            send_mail(
                'LENSFED Membership Application Update',
                f'''Dear {user.get_full_name() or user.username},\n\nWe regret to inform you that your LENSFED membership application has not been approved at this time.\n\nIf you have any questions, please contact us.\n\nBest regards,\nLENSFED Team''',
                'noreply@lensfed.in',
                [user.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Failed to send rejection email: {e}")
        
        return Response({"message": f"User {user.username} has been rejected."})
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_admin_password(request):
    """
    Change admin password
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    
    if not current_password or not new_password:
        return Response({"error": "Current password and new password are required."}, status=400)
    
    if not request.user.check_password(current_password):
        return Response({"error": "Current password is incorrect."}, status=400)
    
    request.user.set_password(new_password)
    request.user.save()
    
    return Response({"message": "Password changed successfully."})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_admin_profile(request):
    """
    Update admin profile information
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    user = request.user
    
    # Update allowed fields
    if 'first_name' in request.data:
        user.first_name = request.data['first_name']
    if 'last_name' in request.data:
        user.last_name = request.data['last_name']
    if 'email' in request.data:
        # Check if email is already taken by another user
        if CustomUser.objects.filter(email=request.data['email']).exclude(id=user.id).exists():
            return Response({"error": "Email is already taken."}, status=400)
        user.email = request.data['email']
    if 'phone' in request.data:
        user.phone = request.data['phone']
    
    user.save()
    
    return Response({
        "message": "Profile updated successfully.",
        "user": {
            "name": user.get_full_name() or user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
        }
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bulk_approve_members(request):
    """
    Bulk approve multiple members
    """
    if not request.user.is_staff:
        return Response({"error": "Access denied. Admin privileges required."}, status=403)
    
    user_ids = request.data.get('user_ids', [])
    if not user_ids:
        return Response({"error": "No user IDs provided."}, status=400)
    
    approved_count = 0
    for user_id in user_ids:
        try:
            user = User.objects.get(id=user_id, is_approved=False)
            user.is_approved = True
            user.is_member = True
            user.save()
            approved_count += 1
            
            # Send approval email
            try:
                send_mail(
                    'Your LENSFED Membership Has Been Approved!',
                    f'''Dear {user.get_full_name() or user.username},\n\nGreat news! Your LENSFED membership has been approved by the admin.\n\nYou can now access all member features and benefits.\n\nBest regards,\nLENSFED Team''',
                    'noreply@lensfed.in',
                    [user.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Failed to send approval email: {e}")
                
        except User.DoesNotExist:
            continue
    
    return Response({"message": f"Successfully approved {approved_count} members."})

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = MemberSearchSerializer  # Use MemberSearchSerializer for now
    permission_classes = [IsAdminUser]

