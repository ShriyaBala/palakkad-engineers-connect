from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('join-us/', views.join_us, name='join_us'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.me, name='me'),
    path('update-profile/', views.update_profile, name='update_profile'),
    path('change-password/', views.change_password, name='change_password'),
]