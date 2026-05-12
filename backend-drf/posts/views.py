from django.shortcuts import render
from .serializers import PostSerializer, PostsDisplaySerializer
from .models import Post
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


class PostCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    
    parser_classes = [MultiPartParser, FormParser]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    
    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)


class PostsDisplayView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostsDisplaySerializer
    
    def get_queryset(self):
        return Post.objects.exclude(user=self.request.user).order_by('-created_at')