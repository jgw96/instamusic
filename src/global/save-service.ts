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
    console.log(element, song);
    return element.trackName === song.trackName;
  });

  console.log(found);

  if (found >= 0) {
    songs.splice(found, 1);
    console.log(songs);
    await idbKeyval.set('faves', songs);
  }
}

export async function getSaved() {
  return await idbKeyval.get('faves');
}