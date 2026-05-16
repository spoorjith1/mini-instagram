from rest_framework import serializers
from .models import FriendShip


class FriendRequestSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='sender.id', read_only=True)
    username = serializers.CharField(source='sender.username', read_only=True)
    profile_pic = serializers.ImageField(source='sender.profile_pic', read_only=True)
    class Meta:
        model = FriendShip
        fields = ['user_id', 'username', 'profile_pic', 'status', 'created_at']