import { Component, OnInit } from '@angular/core';
import { Howl, Howler } from 'howler';
import { TracksService } from '../services/tracks.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent {

  //Variables
  tracksToPlay: any;
  sound: any;
  currentTrack: string = '';
  currentTime: number = 0;
  timer:number=0;
  seekTimer: any;
  duration: number = 0;
 

  constructor(private tracksService: TracksService) {
    this.tracksToPlay = this.tracksService.tracksToPlay;
  }

  ngOnInit(): void {
    //Reproducir la primera canción
    if(this.tracksToPlay.length > 0){
    this.currentTrack = this.tracksToPlay[0];
    this.sound = new Howl({
      src: ['../assets/music/' + this.tracksToPlay[0]],
      preload: true,
      html5: true,
    });
    this.duration = this.sound.duration();
    this.sound.play();
    this.updateSeek();
    }
  }

  playTrack(track: string) {
    this.sound.stop();
    this.currentTrack = track;


    this.sound = new Howl({
      src: ['../assets/music/' + track],
      preload: true,
      html5: true,
    });

    this.duration = this.sound.duration();
    this.sound.play();
    this.updateSeek();
  }

  playMusic() {
    if(!this.sound.playing())
    this.sound.play();
  }

  pauseMusic() {
    this.sound.pause();
  }

  setVolume(e: any) {
    Howler.volume(e.value/100);
  }

  // Seek the track to a specific percentage
  seekTrack(e: any) {
    const percent = e.value;
    this.sound.seek(this.sound.duration() * (percent / 100));
  }

  // Actualizar barras de progreso y pasar a la siguiente canción
  updateSeek() {
    this.timer = this.sound.seek() * (100 / this.sound.duration());
    this.currentTime = this.sound.seek();
    this.duration = this.sound.duration();
    if (this.timer >= 99) {
      this.playNextSong();
    }

    this.seekTimer = setTimeout(() => {
      this.updateSeek();
    }, 1000);
  }

  //Metodo para pasar a la siguiente canción
  playNextSong() {
    let index = this.tracksToPlay.indexOf(this.currentTrack);
    if (index < this.tracksToPlay.length - 1) {
      this.playTrack(this.tracksToPlay[index + 1]);
    } else {
      this.playTrack(this.tracksToPlay[0]);
    }
  }

  //Parar el timer cuando se destruye el componente
  ngOnDestroy() {
    this.sound?.stop();
    clearTimeout(this.seekTimer);
  }
  
}
