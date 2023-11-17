import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

function saveTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

player.on('timeupdate', throttle(saveTime, 300));

const currentTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(currentTime || 0);
