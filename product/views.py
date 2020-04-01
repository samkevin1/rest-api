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
        product = models.Product.objects.filter(is_active=True)
        serializer = serializers.ProductSerializer(product, many=True)
        return response_handler.success('Produtos ativos listados com sucesso.', serializer.data, len(serializer.data))

    except models.Product.DoesNotExist:
        return response_handler.not_found('Não há nenhum produto ativo cadastrado no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['GET'])
def get_all_disabled(request):
    try:
        product = models.Product.objects.filter(is_active=False)
        serializer = serializers.ProductSerializer(product, many=True)
        return response_handler.success('Produtos desativdas carregados com sucesso.', serializer.data, len(serializer.data))

    except models.Product.DoesNotExist:
        return response_handler.not_found('Não há nenhum produto desativo cadastrado no sistema.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['GET'])
def get_by_id(request, pk):
    try:
        product = models.Product.objects.get(id=pk, is_active=True)
        serializer = serializers.ProductSerializer(product, many=False)
        return response_handler.success('Produto carregado com sucesso.', serializer.data)

    except models.Product.DoesNotExist:
        return response_handler.not_found('Não existe nenhum produto cadastrado com esse id.')

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['POST'])
def create(request):
    try:
        serializer = serializers.ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Produto cadastrado com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na criação do produto.', [])
    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def update(request, pk):
    try:
        queryset = models.Product.objects.get(id=pk)
        serializer = serializers.ProductSerializer(instance=queryset, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return response_handler.success('Produto alterado com sucesso.', serializer.data)
        else:
            return response_handler.error_has_ocurred('Ocorreu um erro na alteração do produto.', [])

    except models.Product.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum produto com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


@api_view(['DELETE'])
def delete(request, pk):
    try:
        product = models.Product.objects.get(id=pk)
        product.is_active = False
        product.save()

        return response_handler.success('Produto deletado com sucesso.', [])

    except models.Product.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum produto com esse id.")

    except RuntimeError as e:
        return(e)


@api_view(['PUT'])
def active(request, pk):
    try:
        product = models.Product.objects.get(id=pk)
        product.is_active = True
        product.save()

        return response_handler.success('Produto ativado com sucesso.', serializer.data)

    except models.Product.DoesNotExist:
        return response_handler.not_found("Não foi encontrado nenhum produto com esse id.")

    except RuntimeError:
        raise RuntimeError("Ocorreu um erro interno no servidor.")


