from django.urls import path
from .views import addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered, PayView

urlpatterns = [
    path('add/', addOrderItems, name='orders-add'),
    path('my-orders/', getMyOrders, name='my-orders'),
    path('', getOrders, name='orders'),
    path('details/<str:pk>/', getOrderById, name='order-detail'),
    path('pay/<str:pk>/', updateOrderToPaid, name='order-pay'),
    path('deliver/<str:pk>/', updateOrderToDelivered, name='order-delivered'),
    path('test/', PayView.as_view(), name='pay')
]