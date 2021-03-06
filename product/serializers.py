from rest_framework import serializers

from core import models


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = ('id', 'name', 'price', 'is_active', 'description', 'catalog_id',)
        read_only_fields = ('id',)
