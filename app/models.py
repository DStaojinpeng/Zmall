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