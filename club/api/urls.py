from django.urls import path, include
from .views import *
from knox.views import LogoutView

urlpatterns = [
    path('auth/', include('knox.urls')),
    path('auth/register', RegisterAPIView.as_view()),
    path('auth/login', LoginAPIView.as_view()),
    path('auth/logout', LogoutView.as_view(), name='knox_logout'),
    path('auth/user', UserAPIView.as_view()),
    path('books', BooksListView.as_view()),
    path('polls', PollListView.as_view()),
    path('poll/vote', vote, name='vote'),
    path('recents', RecentBooksView.as_view()),
    path('series', SeriesListView.as_view()),
    path('series/<series_title>', SeriesByTitleDetailView.as_view()),
    path('shared', SharedAccessListView.as_view()),
]