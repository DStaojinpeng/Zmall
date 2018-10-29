from django.conf.urls import url

from app import views

urlpatterns = [
    url('^$', views.index, name='index'),
    url(r'^product.html$',views.product,name='product'),
    url(r'^login.html$',views.login,name='login'),
    url(r'^register.html$',views.register, name='register'),
    url(r'^car.html$', views.car, name='car'),
]