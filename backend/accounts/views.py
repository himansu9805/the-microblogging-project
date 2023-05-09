from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, UserRegistrationSerializer
from .models import User


class UserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistration(viewsets.ModelViewSet):
    queryset = User.objects.none()
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
