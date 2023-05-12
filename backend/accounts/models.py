from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    name = models.CharField(default="TMP User")
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    bio = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=False)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username', 'date_of_birth']

    objects = UserManager()

    def __str__(self):
        return self.email
