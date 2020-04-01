from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import permissions, authentication
from rest_framework import generics
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from . import serializers
from core import models
from utils import response_handler
from rest_framework.response import Response

@api_view(['GET'])
def get_all(request):
    try:
        catalog = models.Catalog.objects.filter(is_active=True)
        serializer = serializers.CatalogSerializer(catalog, many=True)
        return response_handler.success('Categorias ativas listadas com sucesso.', serializer.data, len(serializer.data))

    except models.Catalog.DoesNotExist:
        return response_handler.not_found('Não há nenhuma categoria ativo cadastrado no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['GET'])
def get_all_disabled(request):
    try:
        catalog = models.Catalog.objects.filter(is_active=False)
        serializer = serializers.CatalogSerializer(catalog, many=True)
        return response_handler.success('Categorias desativas carregadas com sucesso.', serializer.data, len(serializer.data))

    except models.Catalog.DoesNotExist:
        return response_handler.not_found('Não há nenhuma categoria desativa cadastrada no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['GET'])
def get_by_id(request, pk):
    try:
        catalog = models.Catalog.objects.get(id=pk, is_active=True)
        serializer = serializers.CatalogSerializer(catalog, many=False)
        return response_handler.success('Categoria carregado com sucesso.', serializer.data)

    except models.Catalog.DoesNotExist:
        return response_handler.not_found('Não existe nenhuma categoria cadastrada com esse id.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['POST'])
def create(request):
    try:
        serializer = serializers.CatalogSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Categoria cadastrada com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na criação da categoria.', [])
    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def update(request, pk):
    try:
        queryset = models.Catalog.objects.get(id=pk)
        serializer = serializers.CatalogSerializer(instance=queryset, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Categoria alterado com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na alteração do categoria.', [])

    except models.Catalog.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum cateogria com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['DELETE'])
def delete(request, pk):
    try:
        catalog = models.Catalog.objects.get(id=pk)
        catalog.is_active = False
        catalog.save()

        return response_handler.success('Categoria deletada com sucesso.', [])

    except models.Catalog.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhuma categoria com esse id.")

    except RuntimeError as e:
        return(e)


@api_view(['PUT'])
def active(request, pk):
    try:
        catalog = models.Catalog.objects.get(id=pk)
        catalog.is_active = True
        catalog.save()

        return response_handler.success('Categoria ativada com sucesso.', serializer.data)

    except models.Catalog.DoesNotExist:
        return response_handler.not_found("Não foi encontrada nenhuma categoria com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


