from django.urls import path, include

urlpatterns = [
    path("api/natureremo", include("natureremo.urls")),
]
