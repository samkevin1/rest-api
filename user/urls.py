from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

urlpatterns = [
    path('', views.ListUser.as_view()),
    path('login/', views.UserLoginApiView.as_view()),
    path('create/', views.CreateUserView.as_view()),
    path('me/', views.GetUserById.as_view(), name='me'),
    path(r'update/', views.UpdateUserView.as_view()),
    path('delete/', views.DeleteUserView.as_view())
]
