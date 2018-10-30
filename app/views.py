import hashlib
import os
import random
import time
from uuid import UUID

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from Django_Zmall import settings
from app.models import User

def generate_token():
    token = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))
    return md5.hexdigest()

def generate_password(password):
    sha = hashlib.sha512()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()

def index(request):
    token = request.COOKIES.get('token')
    user_list = User.objects.filter(token=token)
    if user_list.exists():
        user = user_list.first()
        name = user.username
        imghead = "/static/upload/" + user.imghead
        return render(request,'index.html',context={'status':'login','name':name, 'imghead': imghead})
    else:
        return render(request,'index.html',context={'status':'logout'})

def product(request):
    return render(request, 'product.html')


def login(request):
    if request.method == "GET":
        return render(request, 'login.html')
    elif request.method == "POST":
        tel = request.POST.get('tel')
        password = request.POST.get('password')
        user_list = User.objects.filter(tel=tel, password=generate_password(password))
        if user_list.exists():
            user = user_list.first()
            response = redirect('app:index')
            token = user.token
            response.set_cookie('token',token)
            return response
        else:
            return render(request,'login.html')

def register(request):
    if request.method == "GET":
        return render(request,'register.html')
    elif request.method == "POST":
        tel = request.POST.get("tel")
        tel_list = User.objects.filter(tel=tel)
        if tel_list.exists():
            return render(request,'register.html')
        else:
            password = generate_password(request.POST.get('password'))
            user = User()
            user.tel = tel
            user.password = password
            user.token = generate_token()
            user.username = "用户" + str(random.randrange(1,1000000))
            user.save()
            response = redirect('app:index')
            response.set_cookie('token',user.token)
            return response
    # if request.is_ajax():
    #     if request.POST.get("type")=='exists':
    #         tel = request.POST.get('tel')
    #         users = User.objects.filter(tel=tel)
    #         if users.exists():
    #             return HttpResponse("exists")
    #         else:
    #             return HttpResponse("noexists")
    #     if request.POST.get("type") == 'register':
    #         tel = request.POST.get('tel')
    #         password = generate_password(request.POST.get('password'))
    #         user = User()
    #         user.tel = tel
    #         user.password = password
    #         user.token = generate_token()
    #         user.save()
    #         request.session['token'] = user.token
    #         return HttpResponse("OK")
    # elif request.method == "POST":
    #     return redirect('app:index')
    # elif request.method == "GET":
    #     return render(request,'register.html')


def car(request):
    return render(request,'car.html')


def logout(request):
    response = redirect('app:index')
    response.delete_cookie('token')
    return response


def uploadhead(request):
    if request.method == "GET":
       return render(request,'uploadhead.html')
    elif request.method == "POST":
        token = request.COOKIES.get('token')
        user_list = User.objects.filter(token=token)
        if user_list.exists():
            user = user_list.first()
            file = request.FILES.get('imghead')
            filename = str(random.randrange(1,100)) + "-" + file.name
            filepath = os.path.join(settings.MEDIA_ROOT,filename)
            with open(filepath,'wb') as fb:
                for item in file.chunks():
                    fb.write(item)
            user.imghead = filename
            user.save()
            respone = redirect('app:index')
            return respone
        else:
            return HttpResponse('上传失败,请登陆')
    return HttpResponse('进入错误页面')