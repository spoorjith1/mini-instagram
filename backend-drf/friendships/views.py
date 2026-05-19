from django.shortcuts import render
from .models import FriendShip
from .serializers import FriendRequestSerializer, ListRequestsSerializer, ListFriendsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from rest_framework import generics
from django.db.models import Q


class FriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        receiver = User.objects.get(id=id)
        serializer = FriendRequestSerializer(
            data = request.data, 
            context = {'request': request, 'receiver': receiver}
            )
        if serializer.is_valid():
            serializer.save(sender=request.user, receiver=receiver)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListRequestsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListRequestsSerializer
    def get_queryset(self):
        return FriendShip.objects.filter(
            receiver=self.request.user,
            status=FriendShip.Status.PENDING
        ).order_by('-created_at')


class RequestAcceptView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            frd_request = FriendShip.objects.get(id=id, receiver=request.user)
        except FriendShip.DoesNotExist:
            return Response({'errors': 'Friend request not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if frd_request.status != FriendShip.Status.PENDING:
            return Response({'errors': 'Request already handled'}, status=status.HTTP_400_BAD_REQUEST)
        
        frd_request.status = FriendShip.Status.ACCEPTED
        frd_request.save()
        
        return Response({'message': 'Friend request accepted'}, status=status.HTTP_200_OK)


class RequestRejectView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            frd_request = FriendShip.objects.get(id=id, receiver=request.user)
        except FriendShip.DoesNotExist:
            return Response({'errors': 'Friend request not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if frd_request.status != FriendShip.Status.PENDING:
            return Response({'errors': 'Request already handled'}, status=status.HTTP_400_BAD_REQUEST)
        
        frd_request.status = FriendShip.Status.REJECTED
        frd_request.save()
        
        return Response({'message': 'Friend request rejected'}, status=status.HTTP_200_OK)


class ListFriendsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListFriendsSerializer
    
    def get_queryset(self):
        return FriendShip.objects.filter(
            Q(sender = self.request.user) | Q(receiver = self.request.user), status=FriendShip.Status.ACCEPTED
        ).order_by('-updated_at')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context