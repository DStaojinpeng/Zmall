import hashlib
import random
import time
from uuid import UUID

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from app.models import User

def generate_token():
    token = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))
    return md5.hexdigest()
def index(request):
    return render(request, 'index.html')


def product(request):
    return render(request, 'product.html')


def login(request):
    return render(request, 'login.html')


def register(request):
    if request.is_ajax():
        if request.POST.get("type")=='exists':
            tel = request.POST.get('tel')
            users = User.objects.filter(tel=tel)
            if users.exists():
                return HttpResponse("exists")
            else:
                return HttpResponse("noexists")
        if request.POST.get("type") == 'register':
            tel = request.POST.get('tel')
            password = request.POST.get('password')
            user = User()
            user.tel = tel
            user.password = password
            user.token = generate_token()
            user.save()
            request.session['token'] = user.token
            return HttpResponse("OK")
    elif request.method == "POST":
        return redirect('app:index')
    elif request.method == "GET":
        return render(request,'register.html')


def car(request):
    return render(request,'car.html')