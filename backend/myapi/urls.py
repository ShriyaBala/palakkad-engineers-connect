from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/users', views.AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('join-us/',views.join_us, name='join-us'),
    path('login/', views.login_view, name='knox_login'),
    path('me/', views.me, name='me'),
    path('password-reset/', views.password_reset_request, name='password_reset'),
    path('password-reset-confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('members/', views.search_members, name='search_members'),
    path('members/all/', views.get_all_members, name='get_all_members'),
    
    # Admin Dashboard URLs
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/pending-members/', views.get_pending_members, name='get_pending_members'),
    path('admin/approve-member/<int:user_id>/', views.approve_member, name='approve_member'),
    path('admin/reject-member/<int:user_id>/', views.reject_member, name='reject_member'),
    path('admin/change-password/', views.change_admin_password, name='change_admin_password'),
    path('admin/update-profile/', views.update_admin_profile, name='update_admin_profile'),
    path('admin/bulk-approve/', views.bulk_approve_members, name='bulk_approve_members'),
]

# Include router URLs
from django.urls import include
urlpatterns += [
    path('', include(router.urls)),
]