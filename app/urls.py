from django.conf.urls import url

from app import views

urlpatterns = [
    url('^$', views.index, name='index'),
    url('^index/$', views.index, name='index'),
    url(r'^product/(\w+)$',views.product,name='product'),
    url(r'^login/$',views.login,name='login'),
    url(r'^register/$',views.register, name='register'),
    url(r'^car/$', views.car, name='car'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^uploadhead/$',views.uploadhead,name='uploadhead'),
    url(r'^chackingaccount/$',views.chackingaccount,name='chackingaccount'),
    url(r'^chackregister/$',views.chackregister,name='chackregister'),
    url(r'chacklogin/$',views.chacklogin,name='chacklogin'),
    url(r'^chack/$',views.chack,name='chack'),
    url(r'^addcart/$',views.addcart,name='addcart'),
    url(r'^subcart/$',views.subcart,name='subcart'),
    url(r'^generateorder/$',views.generateorder,name='generateorder'),
    url(r'^orderdetail/$',views.orderdetail,name='orderdetail'),
    url(r'^readjson/$',views.readjson,name="readjson")
]