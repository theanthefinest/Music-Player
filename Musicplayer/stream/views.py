from django.shortcuts import render,redirect
from .models import Song
from django.core.paginator import Paginator


# def index(request):
#     paginator=Paginator(Song.objects.all(),1)
#     page_number=request.GET.get('page')
#     page_obj=paginator.get_page(page_number)
#     context={"page_obj":page_obj}
#     return render(request,'index.html',context)

def index(request):
    music = Song.objects.all().order_by('title')
    music_list = list(Song.objects.all().order_by('title').values())
    # return HttpResponse(music_list, content_type='application/json')
    return render(request, 'home.html', {'musics': music, 'music_list': music_list})


def add(request):
    if(request.method == "POST"):
        title = request.POST.get('title')
        artist = request.POST.get('artist')
        audio = request.FILES.get('audio_file')
        image = request.FILES.get('cover_image')

        data = Song.objects.create(
            title=title, artist=artist, audio_file=audio, cover_image=image)
        data.save()
        return redirect('/home')
    return render(request, 'add.html')

from django.shortcuts import render
from django.conf import settings
from stream.services.discogs_service import DiscogsService

def search_tracks_view(request, query):
    # Initialize the Discogs service
    service = DiscogsService(api_key=settings.DISCOGS_API_KEY)
    
    # Search for tracks based on the query
    results = service.search_tracks(query)
    
    # Pass the results to the template
    return render(request, "search_results.html", {"tracks": results.get("results", [])})
