from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PageContentViewSet
from django.contrib import admin
from myapi.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'pages', PageContentViewSet)
urlpatterns = [
  
    path('register', CreateUserView.as_view(), name='user-register'),
    path('api/user/login/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/user/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/',include('rest_framework.urls')),
    path('', include(router.urls)),
    path('api/auth/', include('dj_rest_auth.urls')),  # login/logout
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # signup

]

