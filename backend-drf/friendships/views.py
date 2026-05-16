from django.shortcuts import render
from .models import FriendShip
from .serializers import FriendRequestSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class FriendRequestView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer
    queryset = FriendShip.objects.all()