from django.contrib import admin
from .models import User, Asset, InventoryItem, Assignment, RepairTicket

admin.site.register(User)
admin.site.register(Asset)
admin.site.register(InventoryItem)
admin.site.register(Assignment)
admin.site.register(RepairTicket)