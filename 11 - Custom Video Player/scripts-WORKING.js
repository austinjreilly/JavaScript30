 /* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

 /* Build functions */

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

const updateButton = target => {
  toggle.textContent = target.paused ? '►' : '❚ ❚';
}

const skip = target => {
  video.currentTime += parseFloat(target.dataset.skip);
}

const handleRangeUpdate = target => {
  video[target.name] = target.value;
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = event => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

 /* Hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', event => updateButton(event.target));
video.addEventListener('pause', event => updateButton(event.target));

skipButtons.forEach(button => button.addEventListener('click', event => skip(event.target)));

ranges.forEach(range => range.addEventListener('change', event => handleRangeUpdate(event.target)));
ranges.forEach(range => range.addEventListener('mousemove', event => handleRangeUpdate(event.target)));

video.addEventListener('timeupdate', handleProgress);


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
