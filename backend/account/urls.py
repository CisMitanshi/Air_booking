from django.urls import path
from .views import RegistrationView, LoginView,FlightListCreateView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('flight-booking/',FlightListCreateView.as_view()),

]
