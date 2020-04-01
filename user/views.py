from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView,\
                                    DestroyAPIView, UpdateAPIView, RetrieveAPIView, GenericAPIView
from utils import response_handler
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.core import exceptions

from . import serializers
from core import models

@api_view(['GET'])
def get_all(request, *args, **kwargs):
    try:
        user = models.User.objects.filter(is_active=True)
        serializer = serializers.UserSerializer(user, many=True)
        return response_handler.success('Usuários ativos carregados com sucesso.', serializer.data, len(serializer.data))

    except models.User.DoesNotExist:
        return response_handler.not_found('Não há nenhum usuário ativo cadastrado no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")

@api_view(['GET'])
def get_all_disabled(request, *args, **kwargs):
    try:
        user = models.User.objects.filter(is_active=False)
        serializer = serializers.UserSerializer(user, many=True)
        return response_handler.success('Usuários ativos carregados com sucesso.', serializer.data, len(serializer.data))

    except models.User.DoesNotExist:
        return response_handler.not_found('Não há nenhum usuário desativo cadastrado no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")

@api_view(['GET'])
def get_by_id(request, pk):
    try:
        user = models.User.objects.get(id=pk, is_active=True)
        serializer = serializers.UserSerializer(user, many=False)
        return response_handler.success('Usuário carregado com sucesso.', serializer.data)

    except models.User.DoesNotExist:
        return response_handler.not_found('Não existe nenhum usuário cadastrado com esse id.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['POST'])
def create(request, *args, **kwargs):
    try:
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Usuário cadastrado com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na criação do usuário.', [])
    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def update(request, pk):
    try:
        queryset = models.User.objects.get(id=pk)
        serializer = serializers.UserSerializer(instance=queryset, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Usuário alterado com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na alteração do usuário.', [])

    except models.User.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum usuário com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def delete(request, pk, validated_data, instance):
    try:
        queryset = models.User.objects.get(id=pk)
        serializer = serializers.UserSerializer(instance=queryset, data=request.data, partial=True)
        serializer.save()

        return response_handler.success('Usuário deletado com sucesso.', [])

    except models.User.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum usuário com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class DeleteUserView(DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    lookup_field = 'user_token'
