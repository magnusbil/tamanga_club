from django.urls import path, include
from .views import *
from knox.views import LogoutView

urlpatterns = [
    path('auth/', include('knox.urls')),
    path('auth/delete_account', delete_account, name='delete_account'),
    path('auth/login', LoginAPIView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='knox_logout'),
    path('auth/password_reset', PasswordAPIView.as_view()),
    path('auth/register', RegisterAPIView.as_view()),
    path('auth/security_question', get_security_question, name='get_security_question'),
    path('auth/user', UserAPIView.as_view()),
    path('auth/user/update/profile', update_profile, name='update_profile'),
    path('polls/<club_id>/<page_number>', PollListView.as_view()),
    path('polls/vote', vote, name='vote'),
    path('recents', RecentBooksView.as_view()),
    path('reserve', reserve, name="reserve"),
    path('reserve/delete', ReserveDelete.as_view()),
    path('series/<page_number>', SeriesListView.as_view()),
    path('series/genre/<series_genre>/<page_number>', SeriesByGenreView.as_view()),
    path('series/<series_title>', SeriesByTitleDetailView.as_view()),
    path('shared/<club_id>/<page_number>', SharedAccessListView.as_view()),
    path('request_shared_access', SharedAccessRequest.as_view()),
    path('access_request_respond', SharedAccessRequestResponse.as_view())
]