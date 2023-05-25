import re
from tokenize import TokenError
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from .serializers import UserLoginSerializer, UserSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
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
        password = request.data.get('password')
        if request.data.get('email') != None:
            email = request.data.get('email')
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            username = request.data.get('username')
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        if user.check_password(password):
            login(request, user)
            serializer = UserLoginSerializer(user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST'], detail=False)
    def logout(self, request):
        logout(request)
        return Response({'success': True})

    @action(methods=['GET'], detail=False)
    def verify_token(self, request):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        try:
            access = AccessToken(token)
            if access.verify() is None:
                return Response(
                    data={
                        'user_id': access.payload['user_id'],
                    },
                    status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response({'error': "Token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST'], detail=False)
    def verify_token_old(self, request):
        django_request = request._request
        response = TokenVerifyView.as_view()(request=django_request)
        return response
