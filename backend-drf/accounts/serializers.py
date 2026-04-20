from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'mobile_number', 'password']
    
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        
        user = User(
            email = validated_data.get('email'),
            username = validated_data.get('username'),
            first_name = validated_data.get('first_name', ''),
            last_name = validated_data.get('last_name', ''),
            mobile_number = validated_data.get('mobile_number')
        )
        
        user.set_password(password)
        user.save()
        return user


class OwnProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'mobile_number']
        
    def validate_email(self, value):
        user = self.instance
        
        if User.objects.filter(email__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        user = self.instance
        
        if User.objects.filter(username__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Username already exists")
        return value


class OthersProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']