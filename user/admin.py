from django.contrib import admin
from .models import UserAccount


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name',
                    'is_staff', 'is_superuser')

    list_filter = ('is_active', 'is_staff', 'is_superuser')

    search_fields = ('email', 'first_name', 'last_name')

    fieldsets = (
        ('Account Info', {
            'fields': ['email', 'password']
        }),
        ('Personal Info', {
            'fields': ['image', 'first_name', 'last_name', 'date_of_birth']
        }),
        ('Groups Info', {
            'fields': ['groups']
        }),
        ('Permissions Info', {
            'fields': ['user_permissions', 'is_active', 'is_staff', 'is_superuser']
        })
    )


admin.site.register(UserAccount, UserAdmin)
