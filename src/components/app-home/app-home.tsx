import { Component, Prop, State, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { searchTunes } from '../../global/http-service';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() songs: any[];

  @Prop() history: RouterHistory;
  @Prop({ context: 'isServer' }) private isServer: boolean;

  async componentDidLoad() {
    if (!this.isServer) {
      const response = await fetch('/assets/data.json');
      const data = await response.json();
      this.songs = data.results;
    }
  }

  @Listen('ionInput')
  search(ev) {
    setTimeout(async () => {
      if (ev.target.value.length > 0) {
        try {
          const searchTerm = ev.target.value;
          const data = await searchTunes(searchTerm);
          this.songs = data.results;
        }
        catch (err) {
          console.error(err);
        }
      }
    }, 500);
  }

  goFavorites() {
    this.history.push('/favorites', {});
  }


  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar color='dark'>
            <ion-title>InstaMusic</ion-title>

            <ion-buttons slot='end'>
              <ion-button onClick={() => this.goFavorites()} icon-only fill='clear'>
                <ion-icon name='star'></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          <ion-toolbar color='dark'>
            <ion-searchbar></ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <track-list tracks={this.songs}></track-list>
        </ion-content>
      </ion-page>
    );
  }
}
