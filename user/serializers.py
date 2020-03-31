from rest_framework import serializers

from core import models


class UserSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.User
        fields = ('id', 'email', 'name', 'last_name',
                  'password', 'cpf', 'rg', 'cellphone',
                  'telephone', 'birth_date', 'is_active')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = models.User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            last_name=validated_data['last_name'],
            cpf=validated_data['cpf'],
            cellphone=validated_data['cellphone'],
            telephone=validated_data['telephone'],
            birth_date=validated_data['birth_date'],
            rg=validated_data['rg'],
            is_active=True
        )

        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        instance.password = validated_data.get('password', instance.password)
        instance.name = validated_data.get('name', instance.name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.cellphone = validated_data.get('cellphone', instance.cellphone)
        instance.telephone = validated_data.get('telephone', instance.telephone)
        instance.save()

        return instance

    def delete(self, instance, validated_data):
        """Handle updating user account"""
        instance.save()

        return instance
