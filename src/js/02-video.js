import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const dataFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY);

if (dataFromLocalStorage){
  player.setCurrentTime(dataFromLocalStorage);
}
function onPlay({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}
player.on('timeupdate', throttle(onPlay, 1000));
