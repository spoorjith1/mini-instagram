from rest_framework import serializers
from .models import Post


#Add New Post
class PostSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    image = serializers.ImageField(required=True)
    class Meta:
        model = Post
        fields = ['id', 'user_id', 'username', 'image', 'caption', 'created_at']


#Posts Display
class PostsDisplaySerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.CharField(source='user.profile_pic', read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'user_id', 'username', 'image', 'caption', 'created_at', 'profile_pic']