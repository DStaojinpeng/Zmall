from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from app.models import User


def index(request):
    return render(request, 'index.html')


def product(request):
    return render(request, 'product.html')


def login(request):
    return render(request, 'login.html')


def register(request):
    if request.method=="POST":
        print("********************************8")
        if request.POST.get("type")=='exists':
            tel = request.POST.get('tel')
            users = User.objects.filter(tel=tel)
            if users.exists():
                return HttpResponse("exists")
            else:
                return HttpResponse("noexists")
    else:
        return render(request, 'register.html')


def car(request):
    return render(request,'car.html')