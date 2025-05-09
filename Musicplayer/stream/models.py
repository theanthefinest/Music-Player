from django.db import models

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=500,null=True, blank=True)
    artist = models.CharField(max_length=500,null=True, blank=True)
    album = models.ForeignKey(
        'Album', on_delete=models.SET_NULL, null=True, blank=True)
    audio_file = models.FileField(upload_to='musics/',null=True, blank=True)
    cover_image = models.ImageField(upload_to='music_image/',null=True, blank=True)

    def __str__(self):
        return self.title

    class META:
        ordering = ["title"]


class Album(models.Model):
    name = models.CharField(max_length=400,null=True, blank=True)