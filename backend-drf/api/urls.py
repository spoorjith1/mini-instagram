from django.urls import path
from accounts.views import RegisterView, OwnProfileView, OwnProfileDeleteView, OwnProfileEditView, OthersProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts.views import PostView

urlpatterns = [
    #Register
    path('register/', RegisterView.as_view(), name='register'),
    #Login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    #Own Profile View
    path('profile/me/', OwnProfileView.as_view(), name='my_profile'),
    #Own Profile Edit
    path('profile/me/edit/', OwnProfileEditView.as_view(), name='edit_my_profile'),
    #Own Profile Delete
    path('profile/me/delete/', OwnProfileDeleteView.as_view(), name='delete_my_profile'),
    
    #Others Profile View
    path('profile/<int:id>/', OthersProfileView.as_view(), name='others_profile'),
]