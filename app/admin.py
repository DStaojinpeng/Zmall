from django.contrib import admin

# Register your models here.
from app.models import User



class UserAdmin(admin.ModelAdmin):
    #显示字段
    list_display = ['id','username','tel','password']
    #按字段搜索
    search_fields = ['tel']
    #设置过滤
    list_filter = ['tel']

    # 修改 添加修改页面
    fields = ['username','tel','password']
    pass

admin.site.register(User, UserAdmin)