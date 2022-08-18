const videoSrc = [
  "textures/test.mp1",
  "textures/test.mp2",
  "textures/test.mp3",
  "textures/test.mp4",
];

const ranVideoSrc = videoSrc[Math.floor(Math.random() * videoSrc.length)];

console.log(ranVideoSrc);
