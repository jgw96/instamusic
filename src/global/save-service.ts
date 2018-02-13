declare var idbKeyval: any;

// did we already save this song?
function compare(songs: any[], song: any) {
  const test = songs.filter(testSong => testSong.trackName === song.trackName);
  return test;
}

export async function saveSong(song: any) {
  const value = await idbKeyval.get('faves');
  if (value === undefined) {
    await idbKeyval.set('faves', [song]);
  } else {
    const values = await idbKeyval.get('faves');
    const test = compare(values, song);

    if (test.length === 0) {
      values.push(song);
      await idbKeyval.set('faves', values);
    }
  }
}

export async function deleteFave(song: any) {
  const songs = await idbKeyval.get('faves');

  const found = songs.findIndex((element) => {
    return element.trackName === song.trackName;
  });

  if (found) {
    const newSongs = songs.splice(found, 1);
    console.log(newSongs);
    await idbKeyval.set('faves', newSongs);
  }
}

export async function getSaved() {
  return await idbKeyval.get('faves');
}