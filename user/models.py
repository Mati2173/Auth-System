from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """Custom User Manager for UserAccount"""

    def create_user(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        """Create and save a user with the given email, first name, last name, date of birth and password"""

        if not email:
            raise ValueError('Users must have an email address')

        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields
        )
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        """Create and save a superuser"""
        extra_fields.update({
            'is_staff': True,
            'is_superuser': True
        })

        return self.create_user(email, first_name, last_name, date_of_birth, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Custom User model"""

    class Meta:
        """Metadata"""
        verbose_name = 'user'
        verbose_name_plural = 'users'
        ordering = ['-id']

    # User attributes
    email = models.EmailField(max_length=255, unique=True, verbose_name='email')
    first_name = models.CharField(max_length=50, verbose_name='first name')
    last_name = models.CharField(max_length=50, verbose_name='last name')
    date_of_birth = models.DateField(verbose_name='date of birth')
    image = models.ImageField(default='users/image_user.jpg', upload_to='users/', blank=True, null=True, verbose_name='profile image')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='creation date')

    # Status Flags
    is_active = models.BooleanField(default=True, verbose_name='active status')
    is_staff = models.BooleanField(default=False, verbose_name='staff status')
    is_superuser = models.BooleanField(default=False, verbose_name='superuser status')

    # Connects this model to the custom User Manager
    objects = UserAccountManager()

    # Custom authentication settings
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'date_of_birth']

    # Methods
    def get_full_name(self):
        """User full name"""
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        """User first name"""
        return self.first_name

    def __str__(self):
        """String representarion of the user"""
        return self.email
