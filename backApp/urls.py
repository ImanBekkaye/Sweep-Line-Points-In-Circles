from django.urls import path
from .views import main, points_in_circles_view, getName

urlpatterns = [
    path('', main),
    path('name', getName),
    path('points-in-circles/', points_in_circles_view)
]
