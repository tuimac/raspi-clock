from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.ConfigViews.as_view()),
    re_path('brightness/', views.BrightnessConfigViews.as_view()),
    re_path(r'^(?P<path>.*)/$', views.ConfigViews.as_view())
]
