from rest_framework import serializers
from .models import User

#Own Profile
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
    
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
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class OwnProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'profile_pic', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'date_of_birth']
        
    def validate_email(self, value):
        user = self.instance
        
        if user and User.objects.filter(email__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        user = self.instance
        
        if user and User.objects.filter(username__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    

#Others Profile