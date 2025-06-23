from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from knox import views as knox_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapi.urls')),
    # path('api/token/', TokenObtainPairView.as_view()),
    # path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/auth/', include('knox.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
