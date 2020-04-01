from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

urlpatterns = [
    path('list/', views.get_all),
    path('disable/list', views.get_all_disabled),
    path('login/', views.UserLoginApiView.as_view()),
    path('create/', views.create),
    path('details/<str:pk>/', views.get_by_id),
    path('update/<str:pk>/', views.update),
    path('delete/<str:pk>/', views.DeleteUserView.as_view())
]
