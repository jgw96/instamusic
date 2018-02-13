export function searchTunes(query: string) {
  return fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music`).then((res) => {
    return res.json()
  }).then((data) => {
    return data;
  })
}

export function loadSong(id: string) {
  return fetch(`https://itunes.apple.com/lookup?id=${id}`).then((res) => {
    return res.json()
  }).then((data) => {
    console.log(data);
    return data;
  })
}