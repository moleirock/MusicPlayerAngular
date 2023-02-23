import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  { path: '', component: MusicComponent },
  { path: 'playlist', component: PlaylistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
