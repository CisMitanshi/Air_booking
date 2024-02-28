from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    

class FlightBooking(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    children = models.CharField(max_length=50,default=0)
    adult = models.CharField(max_length=50,default=0)
    infants = models.CharField(max_length=50,default=0)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    address= models.CharField(max_length=200)
    city =models.CharField(max_length=50)
    country=models.CharField(max_length=50)
    user_id = models.CharField(max_length=10)
    flight_type =models.CharField(max_length=50)
    departure_date=models.DateField()
    departing_from=models.CharField(max_length=50)
    destination=models.CharField(max_length=50)
    flight_price = models.CharField(max_length=255)



    def __str__(self):
        return f"FlightBooking - {self.id}"
