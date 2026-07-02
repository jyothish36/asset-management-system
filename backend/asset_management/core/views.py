from django.db import models
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Asset, InventoryItem, Assignment, RepairTicket
from .serializers import (
    AssetSerializer,
    InventoryItemSerializer,
    AssignmentSerializer,
    RepairTicketSerializer
)


class AssetViewSet(ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class InventoryItemViewSet(ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer


class AssignmentViewSet(ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def perform_create(self, serializer):
        assignment = serializer.save()

        asset = assignment.asset
        asset.status = "Assigned"
        asset.save()


class RepairTicketViewSet(ModelViewSet):
    queryset = RepairTicket.objects.all()
    serializer_class = RepairTicketSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "role": request.user.role,
            "email": request.user.email
        })


class MyAssetsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        assignments = Assignment.objects.filter(employee=request.user)

        assets = [assignment.asset for assignment in assignments]

        serializer = AssetSerializer(assets, many=True)

        return Response(serializer.data)


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_assets = Asset.objects.count()

        assigned_assets = Asset.objects.filter(
            status="Assigned"
        ).count()

        available_assets = Asset.objects.filter(
            status="Available"
        ).count()

        open_tickets = RepairTicket.objects.exclude(
            status="Completed"
        ).count()

        low_stock_items = InventoryItem.objects.filter(
            quantity__lte=models.F("threshold")
        ).count()

        return Response({
            "total_assets": total_assets,
            "assigned_assets": assigned_assets,
            "available_assets": available_assets,
            "open_tickets": open_tickets,
            "low_stock_items": low_stock_items,
        })