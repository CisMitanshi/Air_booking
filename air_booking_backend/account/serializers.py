from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser,FlightBooking

"""
Serializers for handling User and FlightBooking models.
"""
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, including fields 'id', 'username', and 'email'.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email')  

class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration, including fields 'id', 'username', 'email', and 'password'.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        """
        Create and return a new user instance with the provided validated data.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

class FlightBookingSerializer(serializers.ModelSerializer):
    """
    Serializer for the FlightBooking model, including all fields.
    """
    class Meta:
        model = FlightBooking
        fields = '__all__'



