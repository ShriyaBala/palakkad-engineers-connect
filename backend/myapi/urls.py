from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),  # Registration endpoint
    path('join-us/', views.join_us, name='join_us'),
    path('login/', views.LoginAPI.as_view(), name='knox_login'),   # Knox login
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('me/', views.me, name='me'),
    path('update-profile/', views.update_profile, name='update_profile'),
    path('change-password/', views.change_password, name='change_password'),
    # path('shops/', views.shop_list, name='shop_list'),
    # path('events/', views.event_list, name='event_list'),
    # path('ads/', views.advertisement_list, name='advertisement_list'),
]