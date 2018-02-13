import { Component, Prop } from '@stencil/core';

import { deleteFave } from '../../global/save-service';

@Component({
  tag: 'track-list',
  styleUrl: 'track-list.scss'
})
export class TrackList {

  @Prop() tracks: any[];
  @Prop() fave: boolean;

  componentDidLoad() {
    console.log(this.tracks);
  }

  render() {
    if (this.tracks) {
      const songs = this.tracks.map((track) => {
        return (
          <stencil-route-link url={`detail/${track.trackId}`}>
            <ion-item>
              <ion-thumbnail slot="start">
                <lazy-img src={track.artworkUrl100} alt={track.trackName}></lazy-img>
              </ion-thumbnail>
              <ion-label>
                <h2>{track.trackName}</h2>
                <p>Artist: {track.artistName}</p>
                <p>Album: {track.collectionName}</p>
              </ion-label>

              {
                this.fave ? <ion-button fill='clear' color='danger' onClick={() => deleteFave(track)}>Remove</ion-button> : null
              }
            </ion-item>
          </stencil-route-link>
        )
      });

      return (
        <ion-list>
          {songs}
        </ion-list>
      );
    } else {
      return(
        <div class='skeleton-list'></div>
      );
    }
  }
}