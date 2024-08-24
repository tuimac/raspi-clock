from django.urls import path, include

urlpatterns = [
    path("api/natureremo/token", include("natureremo.token.urls")),
]
