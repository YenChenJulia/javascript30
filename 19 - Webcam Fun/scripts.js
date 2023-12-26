const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      video.srcObject = mediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("oh no!!!", err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    // debugger;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  //play sounds
  snap.currentTime = 0
  snap.play()

  //take the data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "selfie");
  link.innerHTML = `<img src="${data}" alt ="selfie"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 500; //red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i + 500]; //red
    pixels.data[i + 1] = pixels.data[i + 100]; //green
    pixels.data[i + 2] = pixels.data[i + 150]; //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  //levels 物件擺放用法第一次學，實用!!!
  const levels = {};

  const inputBars = document.querySelectorAll("[type = range]");
  inputBars.forEach((inputBar) => {
    levels[inputBar.name] = inputBar.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3]; //透明度

    if (
      levels.rmin <= red &&
      red <= levels.rmax &&
      levels.gmin <= green &&
      green <= levels.gmax &&
      levels.bmin <= blue &&
      blue <= levels.bmax
    ) {
      // alpha = 0;
      pixels.data[i + 3] = 0
    }
  }
  return pixels
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
