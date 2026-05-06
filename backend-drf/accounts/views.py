from django.shortcuts import render, get_object_or_404
from .serializers import UserRegistrationSerializer, OwnProfileSerializer, OwnProfileViewSerializer, OthersProfileViewSerializer
from .models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response



#Own Profile
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class OwnProfileEditView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = OwnProfileSerializer
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
    serializer_class = OwnProfileViewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


#Other Profile View
class OthersProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = OthersProfileViewSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'