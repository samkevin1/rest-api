from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()

router.register(r'list', views.CatalogListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', views.CreateCatalog.as_view()),
]
