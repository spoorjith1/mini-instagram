from rest_framework import serializers
from .models import FriendShip


class FriendRequestSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='sender.id', read_only=True)
    username = serializers.CharField(source='sender.username', read_only=True)
    profile_pic = serializers.ImageField(source='sender.profile_pic', read_only=True)
    class Meta:
        model = FriendShip
        fields = ['id', 'user_id', 'username', 'profile_pic', 'status', 'created_at']

    def validate(self, data):
        request = self.context.get('request')
        sender = request.user
        receiver = self.context.get('receiver')

        if sender == receiver:
            raise serializers.ValidationError("You cannot send request to yourself")

        existing_request = FriendShip.objects.filter(sender=sender, receiver=receiver).first()

        if existing_request:
            if existing_request.status == FriendShip.Status.PENDING:
                raise serializers.ValidationError("Request already sent")

            if existing_request.status == FriendShip.Status.ACCEPTED:
                raise serializers.ValidationError("Already friends")

            if existing_request.status == FriendShip.Status.REJECTED:
                existing_request.delete()

        reverse_request = FriendShip.objects.filter(sender=receiver, receiver=sender, status=FriendShip.Status.PENDING).first()
        if reverse_request:
            raise serializers.ValidationError("This user already sent you request")
        return data
    

class ListRequestsSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='sender.id', read_only=True)
    username = serializers.CharField(source='sender.username', read_only=True)
    profile_pic = serializers.ImageField(source='sender.profile_pic', read_only=True)
    class Meta:
        model = FriendShip
        fields = ['id', 'user_id', 'username', 'profile_pic', 'status', 'created_at']


class ListFriendsSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()
    class Meta:
        model = FriendShip
        fields = ['id', 'user_id', 'username', 'profile_pic', 'status', 'created_at']
    
    def get_friend_user(self, obj):
        request = self.context.get('request')
        if obj.sender == request.user:
            return obj.receiver
        return obj.sender
    
    def get_user_id(self, obj):
        friend = self.get_friend_user(obj)
        return friend.id
    
    def get_username(self, obj):
        friend = self.get_friend_user(obj)
        return friend.username
    
    def get_profile_pic(self, obj):
        friend = self.get_friend_user(obj)
        if friend.profile_pic:
            return friend.profile_pic.url
        return None


class FriendShipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendShip
        fields = ['id', 'status']