from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^config(?P<path>.*)/$', views.ClimateConfigViews.as_view()),
    re_path(r'^(?P<path>.*)/$', views.ClimateAPIViews.as_view())
]
