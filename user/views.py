from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.settings import api_settings
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView,\
                                    DestroyAPIView, UpdateAPIView, RetrieveAPIView, GenericAPIView
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.response import Response
from django.core.exceptions import ValidationError

from . import serializers
from core import models


class ListUser(ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class CreateUserView(CreateAPIView, CreateModelMixin):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'success': True,
            'message': 'Usuário criado com sucesso!',
            'data': serializer.data
        })


class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class GetUserById(RetrieveAPIView):
    serializer_class = serializers.UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UpdateUserView(UpdateAPIView, UpdateModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.partial_update(serializer)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response({
            'success': True,
            'message': 'Usuário alterado com sucesso!',
            'data': serializer.data
        })


class DeleteUserView(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    lookup_field = 'user_token'
