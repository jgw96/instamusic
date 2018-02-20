import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { ActiveRouter } from '@stencil/router';

import { deleteFave } from '../../global/save-service';

@Component({
  tag: 'track-list',
  styleUrl: 'track-list.scss'
})
export class TrackList {

  @Prop() tracks: any[];
  @Prop() fave: boolean;
  @Prop({ context: 'activeRouter' }) activeRouter: ActiveRouter;

  @Event() trackDeleted: EventEmitter;


  navigateToTrack(track) {
    console.log(track);
    this.activeRouter.get().history.push(`detail/${track.trackId}`, {});
  }

  async deleteFavorite(track) {
    await deleteFave(track);
    console.log('here');
    this.trackDeleted.emit();
  }

  render() {
    if (this.tracks) {
      const songs = this.tracks.map((track) => {
        /*return (
          <ion-item>
            <ion-thumbnail slot="start" onClick={() => this.navigateToTrack(track)}>
              <lazy-img src={track.artworkUrl100} alt={track.trackName}></lazy-img>
            </ion-thumbnail>
            <ion-label onClick={() => this.navigateToTrack(track)}>
              <h2>{track.trackName}</h2>
              <p>Artist: {track.artistName}</p>
              <p>Album: {track.collectionName}</p>
            </ion-label>

            {
              this.fave ? <ion-button fill='clear' color='danger' onClick={() => this.deleteFavorite(track)}>Remove</ion-button> : null
            }
          </ion-item>
        )*/
        return (
          <ion-card>
            <lazy-img src={track.artworkUrl100.replace(/100x100bb/, '400x400bb')} alt={track.trackName}></lazy-img>
            <ion-card-content>
              <ion-card-title>{track.trackName}</ion-card-title>

              <p>Artist: {track.artistName}</p>
              <p>Album: {track.collectionName}</p>
            </ion-card-content>

            <ion-buttons>
              <ion-button fill='clear' color='primary' onClick={() => this.navigateToTrack(track)}>
                Play
                </ion-button>
            </ion-buttons>
          </ion-card>
        )
      });

      return (
        <ion-list>
          {songs}
        </ion-list>
      );
    } else {
      return (
        <div class='skeleton-list'></div>
      );
    }
  }
}