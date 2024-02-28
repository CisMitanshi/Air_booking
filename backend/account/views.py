# views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import CustomUser,FlightBooking
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegistrationSerializer,FlightBookingSerializer
from django.contrib.auth import authenticate

User = get_user_model()

class RegistrationView(generics.CreateAPIView):
    """
    API view for user registration.

    Uses the RegistrationSerializer to handle user registration.
    """
    serializer_class = RegistrationSerializer


class LoginView(ObtainAuthToken):
    """
    API view for user login.

    Uses the ObtainAuthToken view and extends it to return user data and token on successful login.
    """
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        """
        Attempts to authenticate the user and return a token and user data on success.
        """

        try:
            email = request.data["email"]
            password = request.data["password"]
            user = authenticate(request, username=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                serializer = self.serializer_class(instance=user)
                serialized_data = serializer.data
                return Response({'token': token.key, 'user_id': user.id, 'user_data':serialized_data})
            return Response({'error': 'Wrong cre'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist!'}, status=status.HTTP_404_NOT_FOUND)


class FlightListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating flight bookings.

    Uses the FlightBookingSerializer for serialization and handles both GET and POST requests.
    """
    queryset = FlightBooking.objects.all()
    serializer_class = FlightBookingSerializer

    