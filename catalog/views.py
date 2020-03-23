from rest_framework import permissions, authentication, mixins, viewsets
from rest_framework import generics

from . import serializers
from core import models


class CatalogListViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Only authenticated users can see"""
    #authentication_classes = (authentication.TokenAuthentication,)
    #permission_classes = (permissions.IsAuthenticated,)
    queryset = models.Catalog.objects.all()
    serializer_class = serializers.CatalogSerializer


class CreateCatalog(generics.CreateAPIView):
    """Handles Creating and updating catalogs"""
    serializer_class = serializers.CatalogSerializer
