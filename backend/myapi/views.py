from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django.contrib.auth.models import User
from .models import PageContent
from .serializers import PageContentSerializer, UserSerializer

# User Registration View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Page Content ViewSet
class PageContentViewSet(viewsets.ModelViewSet):
    queryset = PageContent.objects.all()
    serializer_class = PageContentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
def register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if not username or not password:
            return HttpResponse("This field is required.")

        # Now create the user
        User.objects.create_user(username=username, password=password)
        return redirect("login")
    return render(request, "register.html")
