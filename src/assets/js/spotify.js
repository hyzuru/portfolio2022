//install query-string 'npm install query-string' in the frontend directory
import queryString from 'query-string';
import { Buffer } from 'buffer';

export default async function renderSpotify() {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const PLAYER_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

  // var accessToken;

  // const getAccessToken = async () => {
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const accessToken = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    });
  return fetch(`${PLAYER_ENDPOINT}?limit=1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      return {
        statusCode: 200,
        // body: JSON.stringify(json.items[0]),
        body: json.items[0],
      };
    })
    .then(({ body }) => {
      const {
        artists: artistArr,
        name: trackName,
        external_urls: urls,
        album,
      } = body.track;

      const artistSimple = artistArr.map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      }));
      const trackUrl = urls.spotify;
      const artworkUrl = album.images[1].url;
      return {
        statusCode: 200,
        body: { artists: artistSimple, trackName, trackUrl, artworkUrl },
      };
    })
    .then(({ body }) => {
      const { artists, trackName, trackUrl, artworkUrl } = body;
      const spotifyContainer = document.querySelector('.l-header__spotify');
      const artistTemplate = (artistObject) =>
        `<a href="${artistObject.url}">${artistObject.name}</a>`;
      const artistList = artists
        .map((artist) => artistTemplate(artist))
        .join(', ');
      spotifyContainer.innerHTML = `
      <img class="vinyl" src="/assets/images/vinyl.png"/>
      <div class="expander">
        <img class="artwork" src="${artworkUrl}"/>
        <div class="artists">${artistList}</div>
        <div class="song"><a href="${trackUrl}">${trackName}</a></div>
      </div>

      `;
    })
    .catch((err) => console.error(err));
}
