from django.urls import path
from .views import addOrderItems, getOrderById, updateOrderToPaid, getMyOrders

urlpatterns = [
    path('add/', addOrderItems, name='orders-add'),
    path('my-orders/', getMyOrders, name='my-orders'),
    path('details/<str:pk>/', getOrderById, name='order-detail'),
    path('pay/<str:pk>/', updateOrderToPaid, name='order-pay')
]