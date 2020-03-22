from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

urlpatterns = [
    path('', views.ListUser.as_view()),
    path('login/', views.UserLoginApiView.as_view()),
    path('create/', views.UserProfileViewSet.as_view()),
    path('me/', views.ManageUserView.as_view(), name='me'),
]
