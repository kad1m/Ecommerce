from django.urls import path
from . import views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('categories/', views.getCategories, name='categories'),
    path('create/', views.createProduct, name='create-product'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('top/', views.getTopProducts, name='top-products'),

    path('<str:pk>/', views.getProduct, name='product'),
    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),

    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
    path('update/<str:pk>/', views.updateProduct, name='update-product'),
]
