//已完成： 顯示倒數多久/ 結束時間
//未完成： 倒數功能/ 自行輸入時間就算設了preventDefault還是只有跳閃一下
const timeButtons = document.querySelectorAll(".timer__button");
const customInput = document.querySelector('[name = "minutes"]');
const displayTimeLeft = document.querySelector(".display__time-left");
const displayEndTime = document.querySelector(".display__end-time");

function countdown() {
  const totalSeconds = this.dataset.time;
  const countdownObj = getCountdownMinutesAndSeconds(totalSeconds);
  showDisplayTimeLeft(countdownObj);
  showDisplayEndTime(countdownObj)
}

function customCountdown(e) {
  const countdownObj = { countdownMinutes: this.value, countdownSeconds: 0 };
  showDisplayTimeLeft(countdownObj);
  showDisplayEndTime(countdownObj)
  e.preventDefault();
}

function getCountdownMinutesAndSeconds(totalSeconds) {
  const countdownMinutes = Math.floor(totalSeconds / 60);
  const countdownSeconds = totalSeconds % 60;
  return { countdownMinutes, countdownSeconds };
}

function showDisplayEndTime(obj) {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  endSeconds = (currentSeconds + obj.countdownSeconds) % 60
  endMinutes = ((currentMinutes + obj.countdownMinutes) + Math.floor((currentSeconds + obj.countdownSeconds)/ 60)) % 60
  endHours = currentHours + Math.floor(((currentMinutes + obj.countdownMinutes) + Math.floor((currentSeconds + obj.countdownSeconds)/ 60)) / 60)

  displayEndTime.textContent = `Be back at ${showNumber(
    endHours
  )}:${showNumber(endMinutes)}`;
}

function showDisplayTimeLeft(obj) {
  displayTimeLeft.textContent = `${showNumber(
    obj.countdownMinutes
  )}:${showNumber(obj.countdownSeconds)}`;
}

function showNumber(num) {
  return num > 10 ? num : "0" + num;
}

timeButtons.forEach(button => button.addEventListener("click", countdown));
customInput.addEventListener("change", customCountdown);
