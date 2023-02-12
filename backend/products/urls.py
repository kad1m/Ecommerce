from django.urls import path
from . import views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/', views.createProduct, name='create-product'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('<str:pk>/', views.getProduct, name='product'),

    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
    path('update/<str:pk>/', views.updateProduct, name='update -product'),
]
