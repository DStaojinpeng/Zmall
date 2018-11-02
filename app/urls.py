from django.conf.urls import url

from app import views

urlpatterns = [
    url('^$', views.index, name='index'),
    url(r'^product/(\w+)$',views.product,name='product'),
    url(r'^login/$',views.login,name='login'),
    url(r'^register/$',views.register, name='register'),
    url(r'^car/$', views.car, name='car'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^uploadhead/$',views.uploadhead,name='uploadhead'),
    url(r'^readjson/$',views.readjson,name="readjson")
]