from django.urls import path
from accounts.views import RegisterView, OwnProfileView, OwnProfileSettingsDeleteView, OwnProfileEditView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts.views import PostView

urlpatterns = [
    # Register
    path('register/', RegisterView.as_view(), name='register'),
    # Login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    # Own Profile
    path('profile/me/', OwnProfileView.as_view(), name='my_profile'),
    # Own Profile Edit
    path('profile/me/edit/', OwnProfileEditView.as_view(), name='edit_my_profile'),
    # Own Profile Delete
    path('profile/me/delete/', OwnProfileSettingsDeleteView.as_view(), name='delete_my_profile'),
]