from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)


class Asset(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default="Available")
    purchase_date = models.DateField()

    def __str__(self):
        return self.name
    
class InventoryItem(models.Model):
    item_type = models.CharField(max_length=100)
    quantity = models.IntegerField()
    threshold = models.IntegerField()

    def __str__(self):
        return self.item_type
    
class Assignment(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    date_assigned = models.DateField()
    date_returned = models.DateField(null=True, blank=True)
    

class RepairTicket(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    issue = models.TextField()
    status = models.CharField(max_length=50)
    assigned_technician = models.CharField(max_length=100, blank=True,null=True)