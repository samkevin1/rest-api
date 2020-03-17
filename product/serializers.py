from rest_framework import serializers

from core import models


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = ('id', 'name', 'price', 'description',)
        read_only_fields = ('id',)
