from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'username', 'bio',
                  'is_active', 'date_of_birth', 'date_joined')


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={
                                     'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'username',
                  'password', 'date_of_birth')

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(
            name=validated_data.get('name'),
            email=validated_data.get('email'),
            username=validated_data.get('username'),
            password=validated_data.get('password'),
            date_of_birth=validated_data.get('date_of_birth'),
        )
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
