const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
  .then(localMediaStream => {
    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err => {
    console.error('OH NO!!!', err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width,height);
  canvas.width = width;
  canvas.height = height;

  return setinterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take pixels out
    const pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // mess with them
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
    debugger;
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i=0; i<pixels.data.length; i+=4) {
    pixels[i + 0] = pixels.data[i +0] + 100; //red
    pixels[i + 1] = pixels.data[i +1] - 50;  //green
    pixels[i + 2] = pixels.data[i +2] * .5;  //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i=0; i<pixels.data.length; i+=4) {
    pixels[i - 150] = pixels.data[i +0]; //red
    pixels[i + 100] = pixels.data[i +1];  //green
    pixels[i - 150] = pixels.data[i +2];  //blue
  }
  return pixels;
}

getVideo();


video.addEventListener('canplay', paintToCanvas);
