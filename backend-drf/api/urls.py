from django.urls import path
from accounts import views as AccountViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts import views as PostViews
from friendships import views as FrdViews

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
    
    #Send Frd Request
    path('friends/request/<int:id>/', FrdViews.FriendRequestView.as_view(), name='friend_request'),
    #List Pending Requests
    path('friends/requests/', FrdViews.ListRequestsView.as_view(), name='friend_requests'),
    #Accept Request
    path('friends/request/accept/<int:id>/', FrdViews.RequestAcceptView.as_view(), name='accept_request'),
    #Reject Request
    path('friends/request/reject/<int:id>/', FrdViews.RequestRejectView.as_view(), name='reject_request'),
    #List Friends
    path('friends/', FrdViews.ListFriendsView.as_view(), name='friends_list'),
]