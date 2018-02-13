import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { ToastController } from '@ionic/core';

import { loadSong } from '../../global/http-service';
import { saveSong } from '../../global/save-service';

declare var MediaMetadata: any;

@Component({
  tag: 'track-detail',
  styleUrl: 'track-detail.scss'
})
export class TrackDetail {

  @Prop() match: MatchResults;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  @State() song: any;
  @State() cover: string;
  @State() title: string = 'loading...';
  @State() playing: boolean = false;

  @Element() el: Element;

  async componentDidLoad() {
    const data = await loadSong(this.match.params.id);
    this.song = data.results[0];
    console.log(this.song);

    this.title = this.song.trackName;
    this.cover = this.song.artworkUrl100.replace(/100x100bb/, '800x800bb');
  }

  @Watch('playing')
  handleNotify(newValue: boolean) {
    console.log('playing', newValue);
    if (newValue === true) {
      if ('mediaSession' in navigator) {
        (navigator as any).mediaSession.metadata = new MediaMetadata({
          title: this.song.trackName,
          artist: this.song.artistName,
          album: this.song.collectionName,
          artwork: [
            { src: this.song.artworkUrl100.replace(/100x100bb/, '96x96bb'), sizes: '96x96', type: 'image/jpg' },
            { src: this.song.artworkUrl100.replace(/100x100bb/, '128x128bb'), sizes: '128x128', type: 'image/jpg' },
            { src: this.song.artworkUrl100.replace(/100x100bb/, '192x192bb'), sizes: '192x192', type: 'image/jpg' },
            { src: this.song.artworkUrl100.replace(/100x100bb/, '256x256bb'), sizes: '256x256', type: 'image/jpg' },
            { src: this.song.artworkUrl100.replace(/100x100bb/, '384x384bb'), sizes: '384x384', type: 'image/jpg' },
            { src: this.song.artworkUrl100.replace(/100x100bb/, '512x512bb'), sizes: '512x512', type: 'image/jpg' },
          ]
        });

        (navigator as any).mediaSession.setActionHandler('play', this.playSong());
        (navigator as any).mediaSession.setActionHandler('pause', this.pause());
      }
    }
  }

  async playSong() {
    const audio = (this.el.querySelector('audio') as HTMLAudioElement);
    await audio.play();
    this.playing = true;
  }

  pause() {
    const audio = (this.el.querySelector('audio') as HTMLAudioElement);
    audio.pause();

    this.playing = false;
  }

  share() {
    (navigator as any).share({
      title: `${this.song.trackName}`,
      text: `Check out ${this.song.trackName} by ${this.song.artistName}`,
      url: location.href,
    })
  }

  async fave() {
    saveSong(this.song);

    const toast = await this.toastCtrl.create({
      message: 'Song saved',
      duration: 1000
    });
    await toast.present();
  }

  render() {
    if (this.song) {
      return (
        <ion-page>
          <ion-content>
            <ion-button onClick={() => this.fave()} id='fave-button' icon-only fill='clear'>
              <ion-icon name='star'></ion-icon>
            </ion-button>

            <ion-button onClick={() => this.share()} id='share-button' icon-only fill='clear'>
              <ion-icon name='share'></ion-icon>
            </ion-button>

            <img id='cover-image' src={this.cover}></img>

            <div id='player-block'>
              <h2>{this.title}</h2>
              <h2>by {this.song.artistName}</h2>
            </div>

            <audio src={this.song.previewUrl}></audio>
          </ion-content>

          {this.playing ? <ion-fab>
            <ion-fab-button onClick={() => this.pause()}>
              <ion-icon name='pause'></ion-icon>
            </ion-fab-button>
          </ion-fab> : <ion-fab>
              <ion-fab-button onClick={() => this.playSong()}>
                <ion-icon name='play'></ion-icon>
              </ion-fab-button>
            </ion-fab>
          }
        </ion-page>
      );
    }
  }
}