import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  tracks = ["Abrelapuerta.mp3","Aretha.mp3","BeboyCigala.mp3","CryBaby.mp3","DiasEscuela.mp3","Ifeeltheearth.mp3","Whatsup.mp3"];
  tracksToPlay:string[] = [];

  constructor() { }

  getTracks(){
    return this.tracks;
  }

  addTrack(tracks:string[]){
    this.tracksToPlay = tracks;
  }

  

}
