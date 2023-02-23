import { Component } from '@angular/core';
import { TracksService } from '../services/tracks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  
    tracks:string[];
    tracksToPlay:string[] = [];
    constructor(private tracksService: TracksService, private router: Router) {
      this.tracks = tracksService.getTracks();
    }

    addTrack(){
      this.tracksService.addTrack(this.tracksToPlay);
    }
   
}
