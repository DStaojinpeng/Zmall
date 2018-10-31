from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=40,default="昵称[]")
    password = models.CharField(max_length=256)
    tel = models.CharField(max_length=20,unique=True)
    token = models.CharField(max_length=80)
    imghead = models.CharField(max_length=256,default="default.jpg")
    def __str__(self):
        return self.username

class Imgsrc(models.Model):
    use = models.CharField(max_length=20)
    src = models.CharField(max_length=256)
    title = models.CharField(max_length=256,default='')
    discribe = models.CharField(max_length=256,default='')
    price = models.CharField(max_length=20,default="￥0")
    pPirice = models.CharField(max_length=20,default="￥0")
    sale = models.CharField(max_length=20,default="0")
    person = models.CharField(max_length=10,default="0")
    number = models.IntegerField()

