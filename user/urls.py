from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

class Response:
    def __init__(self, success, data):
        self.success = success
        self.data = data


urlpatterns = [
    path('', Response(True, views.ListUser)),
    path('login/', views.UserLoginApiView.as_view()),
    path('create/', views.UserProfileViewSet.as_view()),
    path('me/', views.ManageUserView.as_view(), name='me'),
]
