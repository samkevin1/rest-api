from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView,\
                                    DestroyAPIView, UpdateAPIView, RetrieveAPIView, GenericAPIView

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.core import exceptions

from . import serializers
from core import models


@api_view(['GET'])
def list(request, *args, **kwargs):
    user = models.User.objects.filter(is_active=True)
    serializer = serializers.UserSerializer(user, many=True)
    return Response({
        'success': True,
        'message': 'Usuários listados com sucesso!',
        'data': serializer.data
    })


@api_view(['GET'])
def retrieve(request, pk):

    user = models.User.objects.get(id=pk)
    serializer = serializers.UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def create(request, *args, **kwargs):

    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({
            'success': True,
            'message': 'Usuário criado com sucesso!',
            'data': serializer.data
        })
    else:
        return Response({
            'success': False,
            'message': 'Erro na criação do usuário!',
            'data': []
        })


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def update(request, pk):

    queryset = models.User.objects.get(id=pk)
    serializer = serializers.UserSerializer(instance=queryset, data=request.data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response({
        'success': True,
        'message': 'Usuário alterado com sucesso!',
        'data': serializer.data
    })


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def delete(request, pk, validated_data, instance):

    queryset = models.User.objects.get(id=pk)
    models.User.is_active = False

    return Response({
        'success': True,
        'message': 'Usuário deletado com sucesso!',
    })


class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class DeleteUserView(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    lookup_field = 'user_token'
