from django.shortcuts import render, get_object_or_404
from accounts import serializers as AccountSerializers
from .models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response



#Own Profile
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializers.UserRegistrationSerializer
    permission_classes = [AllowAny]


class OwnProfileEditView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializers.OwnProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class OwnProfileDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class OwnProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializers.OwnProfileViewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


#Users List
class UsersListView(generics.ListAPIView):
    serializer_class = AccountSerializers.UsersSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


#Other Profile View
class OthersProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializers.OthersProfileViewSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'