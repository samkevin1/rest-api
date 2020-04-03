from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()

urlpatterns = [
    path('list/', views.get_all),
    path('disabled/list/', views.get_all_disabled),
    path('create/', views.create),
    path('details/<int:pk>/', views.get_by_id),
    path('update/<int:pk>/', views.update),
    path('delete/<int:pk>/', views.delete),
    path('active/<int:pk>/', views.active)
]

