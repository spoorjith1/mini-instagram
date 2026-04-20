from django.shortcuts import render, get_object_or_404
from .serializers import UserRegistrationSerializer, OwnProfileSerializer, OthersProfileSerializer
from .models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    
class OwnProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = OwnProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class OwnProfileSettingsDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class OthersProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = OthersProfileSerializer(user)
        return Response(serializer.data)