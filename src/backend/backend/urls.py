from django.urls import path, include

urlpatterns = [
    path('api/tokens/', include('tokens.urls')),
    path('api/climate/', include('climate.urls')),
]
