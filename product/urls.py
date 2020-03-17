from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()

router.register(r'list', views.ProductListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', views.CreateProduct.as_view()),
]
