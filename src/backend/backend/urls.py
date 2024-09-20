from django.urls import path, include

urlpatterns = [
    path('api/config', include('config.urls')),
    path('api/climate', include('climate.urls')),
    path('api/commands', include('commands.urls')),
]
