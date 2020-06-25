from django.urls import path, include
from .views import *
from knox.views import LogoutView

urlpatterns = [
    path('auth/', include('knox.urls')),
    path('auth/register', RegisterAPIView.as_view()),
    path('auth/login', LoginAPIView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='knox_logout'),
    path('auth/user', UserAPIView.as_view()),
    path('auth/password_reset', PasswordAPIView.as_view()),
    path('auth/security_question', get_security_question, name='get_security_question'),
    path('polls/<club_id>', PollListView.as_view()),
    path('poll/vote', vote, name='vote'),
    path('recents', RecentBooksView.as_view()),
    path('reserve', reserve, name="reserve"),
    path('series', SeriesListView.as_view()),
    path('series/<series_title>', SeriesByTitleDetailView.as_view()),
    path('shared/<club_id>', SharedAccessListView.as_view()),
]