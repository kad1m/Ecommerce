from django.urls import path
from . import views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product')
]
