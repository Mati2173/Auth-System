from djoser.serializers import UserSerializer as DUserSerializer
from .models import UserAccount


class UserAccountSerializer(DUserSerializer):
    """Custom UserAccountSerializer extending Djoser's UserSerializer"""
    class Meta(DUserSerializer.Meta):
        """Metadata"""
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name',
                  'date_of_birth', 'image', 'is_staff')
