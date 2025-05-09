from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from .import views

app_name="stream"

urlpatterns=[
    path('',views.index,name=''),
    path('add/',views.add, name='add'),
    path('search/<str:query>/', views.search_tracks_view),
]