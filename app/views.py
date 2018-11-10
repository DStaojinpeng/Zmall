import hashlib
import os
import random
import time
import uuid
from uuid import UUID

import json

# 读取JOSN文件，写入数据库

    # print(type(res))
    # print(res)



from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from Django_Zmall import settings
from app.models import User, Imgsrc, Cart


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
    lunbo = Imgsrc.objects.filter(use="lunbo")
    goodlist = Imgsrc.objects.filter(use="list")
    open_group = Imgsrc.objects.filter(use="open_group")
    token = request.session.get('token')
    user_list = User.objects.filter(token=token)
    if user_list.exists():
        user = user_list.first()
        name = user.username
        imghead = "/static/upload/" + user.imghead
        return render(request,'index.html',context={'status':'login','name':name, 'imghead': imghead,"lunbo":lunbo,"goodlist":goodlist,"open_group":open_group})
    else:
        return render(request,'index.html',context={'status':'logout',"lunbo":lunbo,"goodlist":goodlist,"open_group":open_group})

def product(request,num):
    token = request.session.get('token')
    if token:
        user= User.objects.get(token=token)
        name = user.username
    else:
        name ='no'
    goods = Imgsrc.objects.filter(use="list",number=str(num))
    good = goods.first()
    return render(request, 'product.html', context={"good":good,'name':name})


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

            return response
        else:
            return render(request,'login.html')

def register(request):
    if request.method == "GET":
        return render(request,'register.html')
    elif request.method == "POST":
        tel = request.POST.get("tel")
        tel_list = User.objects.filter(tel=tel)
        password = generate_password(request.POST.get('password'))
        user = User()
        user.tel = tel
        user.password = password
        user.token = uuid.uuid3(uuid.uuid4(),'register')
        request.session['token'] = user.token
        user.username = "用户" + str(random.randrange(1,1000000))
        user.save()
        response = redirect('app:index')
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
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
        name = user.username
        carts = Cart.objects.filter(user=user)
        return render(request, 'car.html', context={'name':name, 'carts':carts})
    else:
        return redirect('app:login')


def logout(request):
    response = redirect('app:index')
    request.session.flush()
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


def readjson(request):
    file = "/home/tjp/Desktop/Django_Zmall/static/json/index.json"
    with open(file,"r") as fb:
        fileContent = fb.read()
        res = json.loads(fileContent)
    key_list = []
    for key in res:
        key_list.append(key)
    for key,value in res.items():
        for content in value:
            if key == key_list[0]:
                imgsrc = Imgsrc()
                imgsrc.use = key
                imgsrc.number = content["id"]
                imgsrc.src = content["img"]
                imgsrc.save()
            else:
                imgsrc = Imgsrc()
                imgsrc.number = content["id"]
                imgsrc.use = key
                imgsrc.discribe = content["discribe"]
                imgsrc.pPirice = content["pPrice"]
                imgsrc.price = content["price"]
                imgsrc.person = content["person"]
                imgsrc.title = content["title"]
                imgsrc.src = content["img"]
                imgsrc.sale = content["sale"]
                imgsrc.save()

    return HttpResponse("数据写入完成")
def chackingaccount(request):
    tel = request.GET.get('account')
    JsonData={
        'status':1
    }
    user_list = User.objects.filter(tel=tel)
    if user_list.exists():
        JsonData['status'] = -1
    return JsonResponse(JsonData)


def chackregister(request):
    user = User()
    tel =request.POST.get('tel')
    password = generate_password(request.POST.get('password'))
    user.tel = tel
    user.password = password
    user.token = uuid.uuid3(uuid.uuid4(), 'register')
    user.username = "用户" + str(random.randrange(100000, 1000000))
    user.save()
    request.session['token'] = str(user.token)
    return redirect('app:index')


def chacklogin(request):

    return HttpResponse("登录成功")


def chack(request):
    tel = request.GET.get('tel')
    print(tel)
    user_list = User.objects.filter(tel=tel)
    if user_list.exists():
        user = user_list.first()
        password = request.GET.get('password')
        print(type(password))
        password = generate_password(password)
        if password==user.password:
            user.token = uuid.uuid3(uuid.uuid4(),'login')
            request.session['token'] = str(user.token)
            user.save()
            return JsonResponse({'status': 1,'msg':''})
        else:
            return JsonResponse({'status': -1,'msg':'密码错误'})
    else:
        return JsonResponse({'status': -1,'msg':'账号错误'})


def addcart(request):
    token = request.session.get('token')
    if token:
        goodsid = request.GET.get('goodsid')
        goodsid = Imgsrc.objects.get(pk=goodsid)
        user = User.objects.get(token=token)
        goodsList = Cart.objects.filter(goodsid=goodsid)
        if goodsList.exists():
            goods = goodsList.first()
            goods.number += 1
            goods.isselect = True
            goods.save()
            JsonData = {
                'status': 1,
                'msg': '已添加到购物车',
                       'number':goods.number
            }
        else:
            goods = Cart()
            goods.user = user
            goods.goodsid = goodsid
            goods.isselect = True
            goods.save()
            JsonData = {
                'status': 1,
                'msg': '已添加到购物车',
                'number':goods.number
            }
        return JsonResponse(JsonData)
    else:
        JsonData = {
            'status': -1,
            'msg': '添加失败，未登录'
        }
        return JsonResponse(JsonData)


def subcart(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    goodsid = request.GET.get('goodsid')
    goddsid = Imgsrc.objects.get(pk=goodsid)
    cart = Cart.objects.get(goodsid=goddsid)
    cart.number = cart.number-1
    cart.save()
    JsonData = {
        'status':1,
        'msg':'减少商品数量成功',
        'number':cart.number
    }
    return JsonResponse(JsonData)


def generateorder(request):
    return


def orderdetail(request):
    return None