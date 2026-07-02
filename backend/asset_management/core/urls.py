from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    AssetViewSet,
    InventoryItemViewSet,
    AssignmentViewSet,
    RepairTicketViewSet,
    ProfileView,
    MyAssetsView,
    DashboardStatsView,
)

router = DefaultRouter()

router.register('assets', AssetViewSet)
router.register('inventory', InventoryItemViewSet)
router.register('assignments', AssignmentViewSet)
router.register('tickets', RepairTicketViewSet)

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('my-assets/', MyAssetsView.as_view(), name='my-assets'),

    path(
        'dashboard-stats/',
        DashboardStatsView.as_view(),
        name='dashboard-stats'
    ),
]

urlpatterns += router.urls