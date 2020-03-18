from rest_framework import serializers

from core import models


class CatalogSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=models.Product.objects.all()
    )

    class Meta:
        model = models.Catalog
        fields = ('id', 'description', 'products',)
        read_only_fields = ('id',)