from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from django.conf import settings

admin.site.site_header = "TAMC Admin Center"
admin.site.site_title="TAMC Adminstration Center"
admin.site.index_title="Welcome to the TAMC Admin Center"

urlpatterns = [
    path('api-admin', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('club/', include('club.api.urls')),
]

if settings.DEBUG==True:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'', TemplateView.as_view(template_name='index.html'))
]
