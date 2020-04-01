from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings


class UserManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, name, rg, cellphone, telephone, last_name, birth_date, cpf, password=None,):
        """Create a new user profile"""
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, rg=rg, cpf=cpf,
                          cellphone=cellphone, telephone=telephone,
                          last_name=last_name, birth_date=birth_date,
                          )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, birth_date):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, name, password, birth_date)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    rg = models.CharField(max_length=14, unique=True)
    cellphone = models.CharField(max_length=12)
    telephone = models.CharField(max_length=12)
    birth_date = models.DateField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class Catalog(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=511)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Create products model in Database"""
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    description = models.CharField(max_length=511)
    catalog_id = models.ForeignKey(Catalog, related_name='products', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
