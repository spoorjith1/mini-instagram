from django.urls import path
from accounts import views as AccountViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts import views as PostViews

urlpatterns = [
    #Register
    path('register/', AccountViews.RegisterView.as_view(), name='register'),
    #Login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    #Own Profile View
    path('profile/me/', AccountViews.OwnProfileView.as_view(), name='my_profile'),
    #Own Profile Edit
    path('profile/me/edit/', AccountViews.OwnProfileEditView.as_view(), name='edit_my_profile'),
    #Own Profile Delete
    path('profile/me/delete/', AccountViews.OwnProfileDeleteView.as_view(), name='delete_my_profile'),
    
    #Others Profile View
    path('profile/<int:id>/', AccountViews.OthersProfileView.as_view(), name='others_profile'),
    
    #Add New Post
    path('post/create/', PostViews.PostCreateView.as_view(), name='create_post'),
    #Delete Post
    path('post/delete/<int:pk>/', PostViews.PostDeleteView.as_view(), name='delete_post'),
    #Display posts
    path('posts/', PostViews.PostsDisplayView.as_view(), name='display_posts'),
    
    #Users list
    path('users/', AccountViews.UsersListView.as_view(), name='users_list'),
    
    #Other Users Profile View
    path('users/<int:id>/', AccountViews.OthersProfileView.as_view(), name='users_profiles'),
]