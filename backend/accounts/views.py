import re
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from .serializers import UserLoginSerializer, UserSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenVerifyView
from .models import User


class UserAccountViewSet(viewsets.ViewSet):

    @action(methods=['GET'], detail=False)
    def list_user(self, request):
        queryset = User.objects.all()
        serilizer = UserSerializer(queryset, many=True)
        return Response(serilizer.data)

    @action(methods=['GET'], detail=True)
    def get_user(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id})
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=500)

    @action(methods=['POST'], detail=False)
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        if user.check_password(password):
            login(request, user)
            serializer = UserLoginSerializer(user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST'], detail=False)
    def logout(self, request):
        logout(request)
        return Response({'success': True})

    @action(methods=['POST'], detail=False)
    def verify_token(self, request):
        django_request = request._request
        response = TokenVerifyView.as_view()(request=django_request)
        return response
