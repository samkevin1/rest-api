from django.shortcuts import render
from rest_framework import permissions, authentication, mixins, viewsets
from rest_framework import generics

from . import serializers
from core import models


class ProductListViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Only authenticated users can see"""
    #authentication_classes = (authentication.TokenAuthentication,)
   # permission_classes = (permissions.IsAuthenticated,)
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class CreateProduct(generics.CreateAPIView):
    """Handles creating and updating products"""
    serializer_class = serializers.ProductSerializer
