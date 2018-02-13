import { Component, State } from '@stencil/core';

import { getSaved } from '../../global/save-service';


@Component({
  tag: 'fave-page',
  styleUrl: 'fave-page.scss'
})
export class FavePage {

  @State() tracks: any[] = [];

  async componentDidLoad() {
    this.tracks = await getSaved();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='dark'>
            <ion-title>Favorites</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <track-list fave={true} tracks={this.tracks}></track-list>
        </ion-content>
      </ion-page>
    );
  }
}