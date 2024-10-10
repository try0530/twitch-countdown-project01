// 整體時間，剩餘時間，已過時間，用秒計算
let totalTime,
  countdownTime = 1234,
  passedTime = 2345;

// 控制倒數計時是否運作
let countdownControl,
  isWork = false;

function init() {
  getInitData();
  createView();
}

// 建立整體畫面
function createView() {
  const containerEle = document.createElement("div");
  containerEle.setAttribute("id", "container");
  document.getElementsByTagName("body")[0].appendChild(containerEle);

  createMainBlock();

  createTabBlock();
}

/************ 主畫面 ***************/
// 建立上方主畫面
function createMainBlock() {
  const mainBlockEle = document.createElement("div");
  mainBlockEle.setAttribute("id", "main-block-div");
  document.getElementById("container").appendChild(mainBlockEle);

  const mainBlockDiv = document.getElementById("main-block-div");

  // create div
  const clockDivEle = document.createElement("div");
  clockDivEle.setAttribute("id", "clock-div");
  mainBlockDiv.appendChild(clockDivEle);
  createClock(countdownTime, "countdown");
  createClock(passedTime, "passed");

  // 建立倒數計時控制按鈕
  createCountdownControlBtn();

  // 建立動畫設定畫面
  createAnimationSetting();

  // 如果系統設定開始計時，則開始倒數
  if (countdownControl) {
    startCountdown();
  }
}

// 顯示時間畫面
function createClock(time, type) {
  const clockDiv = document.getElementById("clock-div");
  const title =
    type === "countdown" ? "剩餘時間" : type === "passed" ? "已過時間" : null;

  const titleEle = document.createElement("h2");
  const titleTextNode = document.createTextNode(title);
  titleEle.appendChild(titleTextNode);
  clockDiv.appendChild(titleEle);

  // 計算時分秒
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  // 格式化
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const timeEle = document.createElement("p");
  const timeTextNode = document.createTextNode(
    `${hours} : ${minutes} : ${seconds}`
  );
  timeEle.appendChild(timeTextNode);
  timeEle.setAttribute("id", `${type}-time`);
  clockDiv.appendChild(timeEle);
}

function createAnimationSetting() {
  const mainDiv = document.getElementById("main-block-div");

  const animationSetDivEle = document.createElement("div");
  animationSetDivEle.setAttribute("id", "animation-set-div");
  mainDiv.appendChild(animationSetDivEle);

  const animationSet = document.getElementById("animation-set-div");

  const animationSetLabelEle = document.createElement("label");
  const animationSetTextNode = document.createTextNode("動畫: ");
  animationSetLabelEle.setAttribute("for", "animation-set");
  animationSetLabelEle.appendChild(animationSetTextNode);
  animationSet.appendChild(animationSetLabelEle);

  const animationSetInputEle = document.createElement("input");
  animationSetInputEle.setAttribute("id", "animation-set");
  animationSetInputEle.setAttribute("name", "animation-set");
  animationSetInputEle.setAttribute("type", "text");
  animationSet.appendChild(animationSetInputEle);
}
// 建立倒數暫停與開始按鈕
function createCountdownControlBtn() {
  const mainBlockDiv = document.getElementById("main-block-div");
  const countdownControlDivEle = document.createElement("div");
  countdownControlDivEle.setAttribute("id", "countdown-control-div");
  mainBlockDiv.appendChild(countdownControlDivEle);

  const countdownControlDiv = document.getElementById("countdown-control-div");

  // 暫停倒數
  const stopBtnEle = document.createElement("button");
  const stopBtnTextNode = document.createTextNode("暫停倒數");
  stopBtnEle.appendChild(stopBtnTextNode);
  stopBtnEle.setAttribute("id", "stop-countdown-btn");
  countdownControlDiv.appendChild(stopBtnEle);

  const stopBtn = document.getElementById("stop-countdown-btn");

  const startBtnEle = document.createElement("button");
  const startBtnTextNode = document.createTextNode("開始倒數");
  startBtnEle.appendChild(startBtnTextNode);
  startBtnEle.setAttribute("id", "start-countdown-btn");
  countdownControlDiv.appendChild(startBtnEle);

  const startBtn = document.getElementById("start-countdown-btn");

  stopBtn.addEventListener("click", function () {
    clearInterval(countdownControl);
    isWork = false;
  });
  startBtn.addEventListener("click", function () {
    startCountdown();
  });
}
/************ 主畫面 ***************/

/************ 分頁畫面 *************/
function createTabBlock() {
  const tabDivEle = document.createElement("div");
  tabDivEle.setAttribute("id", "tab-div");
  document.getElementById("container").appendChild(tabDivEle);

  createTabButtons();

  createBasicTabPage();

  createInterfaceSettingView();

  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  // 監聽每個Tab button的click
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 移除active狀態
      tabs.forEach((btn) => btn.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // 加入相關的active
      tab.classList.add("active");
      document
        .getElementById(tab.getAttribute("data-tab"))
        .classList.add("active");
    });
  });
}

// 建立tab的分頁按鈕
function createTabButtons() {
  const tabDiv = document.getElementById("tab-div");

  const tabButtonsDivEle = document.createElement("div");
  tabButtonsDivEle.setAttribute("id", "tab-buttons-div");
  tabDiv.appendChild(tabButtonsDivEle);

  const tabButtonsDiv = document.getElementById("tab-buttons-div");

  // 基本操作button
  const basicTabBtn = document.createElement("button");
  const basicTabTextNode = document.createTextNode("基本操作");
  basicTabBtn.appendChild(basicTabTextNode);
  basicTabBtn.setAttribute("id", "tab-button-basic");
  basicTabBtn.setAttribute("class", "tab-button active");
  basicTabBtn.setAttribute("data-tab", "basic-tab-div");

  tabButtonsDiv.appendChild(basicTabBtn);

  // 介面設定button
  const interfaceTabBtn = document.createElement("button");
  const interfaceTabTextNode = document.createTextNode("介面設定");
  interfaceTabBtn.appendChild(interfaceTabTextNode);
  interfaceTabBtn.setAttribute("id", "tab-button-interface");
  interfaceTabBtn.setAttribute("class", "tab-button");
  interfaceTabBtn.setAttribute("data-tab", "setting-interface-div");

  tabButtonsDiv.appendChild(interfaceTabBtn);
}

// 建立基本操作頁面tab
function createBasicTabPage() {
  const basicTabPage = document.createElement("div");
  basicTabPage.setAttribute("id", "basic-tab-div");
  basicTabPage.setAttribute("class", "tab-content active");

  document.getElementById("tab-div").appendChild(basicTabPage);

  createAddTimeManual();
  createAddTimeBtn();

  createModifyTimeBlock();
}

// 建立手動加時畫面
function createAddTimeManual() {
  const basicTabDiv = document.getElementById("basic-tab-div");
  // 建立輸入時間的div
  const enterTimeDivEle = document.createElement("div");
  enterTimeDivEle.setAttribute("id", "enter-time-div");

  basicTabDiv.appendChild(enterTimeDivEle);

  const enterTimeDiv = document.getElementById("enter-time-div");

  // 加時區域title
  const enterTimeTitleEle = document.createElement("h3");
  const enterTimeTitleTextNode = document.createTextNode("加時");
  enterTimeTitleEle.appendChild(enterTimeTitleTextNode);
  enterTimeDiv.appendChild(enterTimeTitleEle);

  // 輸入加時區域
  const enterFormEle = document.createElement("form");
  enterTimeDiv.appendChild(enterFormEle);

  const enterForm = document
    .getElementById("enter-time-div")
    .getElementsByTagName("form")[0];

  // 小時
  const hoursInput = document.createElement("input");
  hoursInput.setAttribute("type", "text");
  hoursInput.setAttribute("id", "add-hours");
  hoursInput.setAttribute("name", "add-hours");

  enterForm.appendChild(hoursInput);

  const hoursLabel = document.createElement("label");
  const hoursLabelTextNode = document.createTextNode("時");
  hoursLabel.appendChild(hoursLabelTextNode);
  hoursLabel.setAttribute("for", "add-hours");
  enterForm.appendChild(hoursLabel);

  // 分鐘
  const minutesInput = document.createElement("input");
  minutesInput.setAttribute("type", "text");
  minutesInput.setAttribute("id", "add-minutes");
  minutesInput.setAttribute("name", "add-minutes");

  enterForm.appendChild(minutesInput);

  const minutesLabel = document.createElement("label");
  const minutesLabelTextNode = document.createTextNode("分");
  minutesLabel.appendChild(minutesLabelTextNode);
  minutesLabel.setAttribute("for", "add-minutes");
  enterForm.appendChild(minutesLabel);

  // 秒
  const secondsInput = document.createElement("input");
  secondsInput.setAttribute("type", "text");
  secondsInput.setAttribute("id", "add-seconds");
  secondsInput.setAttribute("name", "add-seconds");

  enterForm.appendChild(secondsInput);

  const secondsLabel = document.createElement("label");
  const secondsLabelTextNode = document.createTextNode("秒");
  secondsLabel.appendChild(secondsLabelTextNode);
  secondsLabel.setAttribute("for", "add-seconds");
  enterForm.appendChild(secondsLabel);

  // 手動加時
  const manualBtnEle = document.createElement("button");
  const manualBtnTextNode = document.createTextNode("確定手動加時");
  manualBtnEle.appendChild(manualBtnTextNode);
  manualBtnEle.setAttribute("id", "manual-add-btn");
  enterTimeDiv.appendChild(manualBtnEle);

  const manualBtn = document.getElementById("manual-add-btn");

  // 當點擊手動加時
  manualBtn.addEventListener("click", function () {
    let hours = document.getElementById("add-hours").value
      ? document.getElementById("add-hours").value * 3600
      : 0;
    let minutes = document.getElementById("add-minutes").value
      ? document.getElementById("add-minutes").value * 60
      : 0;
    let seconds = document.getElementById("add-seconds").value
      ? document.getElementById("add-seconds").value
      : 0;

    console.log(hours, minutes, seconds);

    const time = Number(hours) + Number(minutes) + Number(seconds);

    addTime(time);

    // 清空form 欄位值
    document.getElementById("add-hours").value = "";
    document.getElementById("add-minutes").value = "";
    document.getElementById("add-seconds").value = "";

    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }

    const animationValue = document.getElementById("animation-set").value
      ? document.getElementById("animation-set").value
      : "手動加時";
    createAnAnimationItem(animationValue);
  });
}

// 建立固定加時按鈕
function createAddTimeBtn() {
  const basicTabDiv = document.getElementById("basic-tab-div");

  // create div
  const addTimeBtnDivEle = document.createElement("div");
  addTimeBtnDivEle.setAttribute("id", "add-time-btn-div");
  basicTabDiv.appendChild(addTimeBtnDivEle);

  const addTimeBtnDiv = document.getElementById("add-time-btn-div");

  // 建立 +60分鐘按鈕
  const add60BtnEle = document.createElement("button");
  const add60BtnTextNode = document.createTextNode("+60分鐘");
  add60BtnEle.appendChild(add60BtnTextNode);
  add60BtnEle.setAttribute("id", "add-60-btn");

  addTimeBtnDiv.appendChild(add60BtnEle);

  // +10分鐘按鈕
  const add10BtnEle = document.createElement("button");
  const add10BtnTextNode = document.createTextNode("+10分鐘");
  add10BtnEle.appendChild(add10BtnTextNode);
  add10BtnEle.setAttribute("id", "add-10-btn");

  addTimeBtnDiv.appendChild(add10BtnEle);

  // +3分鐘按鈕
  const add3BtnEle = document.createElement("button");
  const add3BtnTextNode = document.createTextNode("+3分鐘");
  add3BtnEle.appendChild(add3BtnTextNode);
  add3BtnEle.setAttribute("id", "add-3-btn");

  addTimeBtnDiv.appendChild(add3BtnEle);

  // +3分鐘按鈕
  const add1BtnEle = document.createElement("button");
  const add1BtnTextNode = document.createTextNode("+1分鐘");
  add1BtnEle.appendChild(add1BtnTextNode);
  add1BtnEle.setAttribute("id", "add-1-btn");

  addTimeBtnDiv.appendChild(add1BtnEle);

  // 監聽各個按鈕
  const add60Btn = document.getElementById("add-60-btn");
  const add10Btn = document.getElementById("add-10-btn");
  const add3Btn = document.getElementById("add-3-btn");
  const add1Btn = document.getElementById("add-1-btn");

  add60Btn.addEventListener("click", function () {
    addTime(3600);

    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }

    const animationValue = document.getElementById("animation-set").value
      ? document.getElementById("animation-set").value
      : "+60";
    createAnAnimationItem(animationValue);
  });

  add10Btn.addEventListener("click", function () {
    addTime(600);
    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }

    const animationValue = document.getElementById("animation-set").value
      ? document.getElementById("animation-set").value
      : "+10";
    createAnAnimationItem(animationValue);
  });

  add3Btn.addEventListener("click", function () {
    addTime(180);
    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }

    const animationValue = document.getElementById("animation-set").value
      ? document.getElementById("animation-set").value
      : "+3";
    createAnAnimationItem(animationValue);
  });

  add1Btn.addEventListener("click", function () {
    addTime(60);
    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }

    const animationValue = document.getElementById("animation-set").value
      ? document.getElementById("animation-set").value
      : "+1";
    createAnAnimationItem(animationValue);
  });
}

// 更新顯示時間
function changeShowTime(time, type) {
  const showTimeEle = document.getElementById(`${type}-time`);

  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  // 格式化
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let newtime = `${hours} : ${minutes} : ${seconds}`;
  showTimeEle.textContent = newtime;
}

// 建立修改時間畫面
function createModifyTimeBlock() {
  const basicTabDiv = document.getElementById("basic-tab-div");

  // 建立輸入時間的div
  const modifyTimeDivEle = document.createElement("div");
  modifyTimeDivEle.setAttribute("id", "modify-time-div");

  basicTabDiv.appendChild(modifyTimeDivEle);

  const modifyTimeDiv = document.getElementById("modify-time-div");

  // 修改區域title
  const modifyTimeTitleEle = document.createElement("h3");
  const modifyTimeTitleTextNode = document.createTextNode("修正時間");
  modifyTimeTitleEle.appendChild(modifyTimeTitleTextNode);
  modifyTimeDiv.appendChild(modifyTimeTitleEle);

  // 修改區域提醒
  const modifyTimeNoticeEle = document.createElement("span");
  const modifyTimeNoticeTextNode = document.createTextNode("請輸入完整的時間");
  modifyTimeNoticeEle.appendChild(modifyTimeNoticeTextNode);
  modifyTimeDiv.appendChild(modifyTimeNoticeEle);

  const modifyTimeNotice = document
    .getElementById("modify-time-div")
    .getElementsByTagName("span")[0];
  modifyTimeNotice.style.color = "red";

  // 輸入加時區域
  const modifyFormEle = document.createElement("form");
  modifyTimeDiv.appendChild(modifyFormEle);

  const modifyForm = modifyTimeDiv.getElementsByTagName("form")[0];

  // 小時
  const hoursInput = document.createElement("input");
  hoursInput.setAttribute("type", "text");
  hoursInput.setAttribute("id", "modify-hours");
  hoursInput.setAttribute("name", "modify-hours");

  modifyForm.appendChild(hoursInput);

  const hoursLabel = document.createElement("label");
  const hoursLabelTextNode = document.createTextNode("時");
  hoursLabel.appendChild(hoursLabelTextNode);
  hoursLabel.setAttribute("for", "modify-hours");
  modifyForm.appendChild(hoursLabel);

  // 分鐘
  const minutesInput = document.createElement("input");
  minutesInput.setAttribute("type", "text");
  minutesInput.setAttribute("id", "modify-minutes");
  minutesInput.setAttribute("name", "modify-minutes");

  modifyForm.appendChild(minutesInput);

  const minutesLabel = document.createElement("label");
  const minutesLabelTextNode = document.createTextNode("分");
  minutesLabel.appendChild(minutesLabelTextNode);
  minutesLabel.setAttribute("for", "modify-minutes");
  modifyForm.appendChild(minutesLabel);

  // 秒
  const secondsInput = document.createElement("input");
  secondsInput.setAttribute("type", "text");
  secondsInput.setAttribute("id", "modify-seconds");
  secondsInput.setAttribute("name", "modify-seconds");

  modifyForm.appendChild(secondsInput);

  const secondsLabel = document.createElement("label");
  const secondsLabelTextNode = document.createTextNode("秒");
  secondsLabel.appendChild(secondsLabelTextNode);
  secondsLabel.setAttribute("for", "modify-seconds");
  modifyForm.appendChild(secondsLabel);

  // 各類按鈕
  // 修改剩餘時間
  //   const countdownBr = document.createElement("br");
  const countdownBtnEle = document.createElement("button");
  const countdownTextNode = document.createTextNode("修改剩餘時間");
  countdownBtnEle.appendChild(countdownTextNode);
  countdownBtnEle.setAttribute("id", "modify-countdown-btn");

  modifyForm.appendChild(countdownBtnEle);

  const countdownBtn = document.getElementById("modify-countdown-btn");

  const passedBtnEle = document.createElement("button");
  const passedTextNode = document.createTextNode("修改已過時間");
  passedBtnEle.appendChild(passedTextNode);
  passedBtnEle.setAttribute("id", "modify-passed-btn");

  modifyForm.appendChild(passedBtnEle);

  const passedBtn = document.getElementById("modify-passed-btn");

  // 當點擊修改剩餘時間
  countdownBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const hours = document.getElementById("modify-hours").value;
    const minutes = document.getElementById("modify-minutes").value;
    const seconds = document.getElementById("modify-seconds").value;

    const time = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    modifyWholeTime(time, "countdown");

    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("countdown");
    }
  });

  // 當點擊修改已過時間
  passedBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const hours = document.getElementById("modify-hours").value;
    const minutes = document.getElementById("modify-minutes").value;
    const seconds = document.getElementById("modify-seconds").value;

    const time = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    modifyWholeTime(time, "passed");

    // 當計時器沒有在運作時，更新畫面上顯示的時間
    if (!isWork) {
      updateClock("passed");
    }
  });
}

// 修改相關時間
function modifyWholeTime(time, type) {
  if (type === "countdown") {
    countdownTime = time;
  } else if (type === "passed") {
    passedTime = time;
  }

  totalTime = countdownTime + passedTime;
}

/*********** 介面設定 ***************/
// 建立整體介面設定畫面
function createInterfaceSettingView() {
  const tabDiv = document.getElementById("tab-div");

  const settingInterfaceDivEle = document.createElement("div");
  settingInterfaceDivEle.setAttribute("id", "setting-interface-div");
  settingInterfaceDivEle.setAttribute("class", "tab-content");
  tabDiv.appendChild(settingInterfaceDivEle);

  createCountdownTimeInterface();
  createPassedTimeInterface();
}
// 建立剩餘時間介面設定畫面
function createCountdownTimeInterface() {
  const settingInterfaceDiv = document.getElementById("setting-interface-div");

  const countdownSettingDivEle = document.createElement("div");
  countdownSettingDivEle.setAttribute("id", "countdown-setting-div");
  settingInterfaceDiv.appendChild(countdownSettingDivEle);

  const countdownSettingDiv = document.getElementById("countdown-setting-div");

  // 建立title
  const countdownSettingTitleEle = document.createElement("h3");
  const countdownSettingTitleText = document.createTextNode("剩餘時間設定");
  countdownSettingTitleEle.appendChild(countdownSettingTitleText);
  countdownSettingDiv.appendChild(countdownSettingTitleEle);

  // 建立form
  const countdownSettingFormEle = document.createElement("form");
  countdownSettingFormEle.setAttribute("id", "countdown-setting-form");

  countdownSettingDiv.appendChild(countdownSettingFormEle);

  const countdownSettingForm = document.getElementById("countdown-setting-div");

  // 建立label和input
  // color
  const colorLabel = document.createElement("label");
  const colorLabelTextNode = document.createTextNode("Color: ");
  colorLabel.appendChild(colorLabelTextNode);
  colorLabel.setAttribute("for", "countdown-color");
  countdownSettingForm.appendChild(colorLabel);

  const colorInputEle = document.createElement("input");
  colorInputEle.setAttribute("type", "text");
  colorInputEle.setAttribute("id", "countdown-color");
  colorInputEle.setAttribute("name", "countdown-color");
  countdownSettingForm.appendChild(colorInputEle);

  countdownSettingForm.appendChild(document.createElement("br"));

  // 字體
  const fontLabel = document.createElement("label");
  const fontLabelTextNode = document.createTextNode("字體: ");
  fontLabel.appendChild(fontLabelTextNode);
  fontLabel.setAttribute("for", "countdown-font");
  countdownSettingForm.appendChild(fontLabel);

  const fontInputEle = document.createElement("input");
  fontInputEle.setAttribute("type", "text");
  fontInputEle.setAttribute("id", "countdown-font");
  fontInputEle.setAttribute("name", "countdown-font");
  countdownSettingForm.appendChild(fontInputEle);

  countdownSettingForm.appendChild(document.createElement("br"));

  // 字體大小
  const fontSizeLabel = document.createElement("label");
  const fontSizeLabelTextNode = document.createTextNode("字體大小: ");
  fontSizeLabel.appendChild(fontSizeLabelTextNode);
  fontSizeLabel.setAttribute("for", "countdown-fontsize");
  countdownSettingForm.appendChild(fontSizeLabel);

  const fontSizeInputEle = document.createElement("input");
  fontSizeInputEle.setAttribute("type", "text");
  fontSizeInputEle.setAttribute("id", "countdown-fontsize");
  fontSizeInputEle.setAttribute("name", "countdown-fontsize");
  countdownSettingForm.appendChild(fontSizeInputEle);

  countdownSettingForm.appendChild(document.createElement("br"));

  // 外框大小
  const outerFrameLabel = document.createElement("label");
  const outerFrameLabelTextNode = document.createTextNode("外框大小: ");
  outerFrameLabel.appendChild(outerFrameLabelTextNode);
  outerFrameLabel.setAttribute("for", "countdown-outerframe");
  countdownSettingForm.appendChild(outerFrameLabel);

  const outerFrameInputEle = document.createElement("input");
  outerFrameInputEle.setAttribute("type", "text");
  outerFrameInputEle.setAttribute("id", "countdown-outerframe");
  outerFrameInputEle.setAttribute("name", "countdown-outerframe");
  countdownSettingForm.appendChild(outerFrameInputEle);

  countdownSettingForm.appendChild(document.createElement("br"));

  // 外框顏色
  const outerColorLabel = document.createElement("label");
  const outerColorLabelTextNode = document.createTextNode("外框顏色: ");
  outerColorLabel.appendChild(outerColorLabelTextNode);
  outerColorLabel.setAttribute("for", "countdown-outercolor");
  countdownSettingForm.appendChild(outerColorLabel);

  const outerColorInputEle = document.createElement("input");
  outerColorInputEle.setAttribute("type", "text");
  outerColorInputEle.setAttribute("id", "countdown-outercolor");
  outerColorInputEle.setAttribute("name", "countdown-outercolor");
  countdownSettingForm.appendChild(outerColorInputEle);

  countdownSettingForm.appendChild(document.createElement("br"));

  // 監聽各個欄位的輸入
  const countdown = document.getElementById("countdown-time");
  const countdownColor = document.getElementById("countdown-color");
  countdownColor.addEventListener("input", function () {
    const value = countdownColor.value;

    countdown.style.color = value;
  });

  const countdownFont = document.getElementById("countdown-font");
  countdownFont.addEventListener("input", function () {
    const value = countdownFont.value;
    countdown.style.fontFamily = value;
  });

  const countdownFontSize = document.getElementById("countdown-fontsize");
  countdownFontSize.addEventListener("input", function () {
    const value = countdownFontSize.value;
    countdown.style.fontSize = value;
  });

  // ??? 外框是指什麼?
  const countdownFrameSize = document.getElementById("countdown-outerframe");
  countdownFrameSize.addEventListener("input", function () {
    const value = countdownFrameSize.value;
    countdown.style.padding = value;
  });

  // ??? 外框是指什麼?
  const countdownFrameColor = document.getElementById("countdown-outercolor");
  countdownFrameColor.addEventListener("input", function () {
    const color = countdownFrameColor.value;
    value = `1px solid ${color}`;
    countdown.style.border = value;
  });
}

// 建立已過時間介面設定畫面
function createPassedTimeInterface() {
  const settingInterfaceDiv = document.getElementById("setting-interface-div");

  const passedSettingDivEle = document.createElement("div");
  passedSettingDivEle.setAttribute("id", "passed-setting-div");
  settingInterfaceDiv.appendChild(passedSettingDivEle);

  const passedSettingDiv = document.getElementById("passed-setting-div");

  // 建立title
  const passedSettingTitleEle = document.createElement("h3");
  const passedSettingTitleText = document.createTextNode("已過時間設定");
  passedSettingTitleEle.appendChild(passedSettingTitleText);
  passedSettingDiv.appendChild(passedSettingTitleEle);

  // 建立form
  const passedSettingFormEle = document.createElement("form");
  passedSettingFormEle.setAttribute("id", "passed-setting-form");

  passedSettingDiv.appendChild(passedSettingFormEle);

  const passedSettingForm = document.getElementById("passed-setting-div");

  // 建立label和input
  // color
  const colorLabel = document.createElement("label");
  const colorLabelTextNode = document.createTextNode("Color: ");
  colorLabel.appendChild(colorLabelTextNode);
  colorLabel.setAttribute("for", "passed-color");
  passedSettingForm.appendChild(colorLabel);

  const colorInputEle = document.createElement("input");
  colorInputEle.setAttribute("type", "text");
  colorInputEle.setAttribute("id", "passed-color");
  colorInputEle.setAttribute("name", "passed-color");
  passedSettingForm.appendChild(colorInputEle);

  passedSettingForm.appendChild(document.createElement("br"));

  // 字體
  const fontLabel = document.createElement("label");
  const fontLabelTextNode = document.createTextNode("字體: ");
  fontLabel.appendChild(fontLabelTextNode);
  fontLabel.setAttribute("for", "passed-font");
  passedSettingForm.appendChild(fontLabel);

  const fontInputEle = document.createElement("input");
  fontInputEle.setAttribute("type", "text");
  fontInputEle.setAttribute("id", "passed-font");
  fontInputEle.setAttribute("name", "passed-font");
  passedSettingForm.appendChild(fontInputEle);

  passedSettingForm.appendChild(document.createElement("br"));

  // 字體大小
  const fontSizeLabel = document.createElement("label");
  const fontSizeLabelTextNode = document.createTextNode("字體大小: ");
  fontSizeLabel.appendChild(fontSizeLabelTextNode);
  fontSizeLabel.setAttribute("for", "passed-fontsize");
  passedSettingForm.appendChild(fontSizeLabel);

  const fontSizeInputEle = document.createElement("input");
  fontSizeInputEle.setAttribute("type", "text");
  fontSizeInputEle.setAttribute("id", "passed-fontsize");
  fontSizeInputEle.setAttribute("name", "passed-fontsize");
  passedSettingForm.appendChild(fontSizeInputEle);

  passedSettingForm.appendChild(document.createElement("br"));

  // 外框大小
  const outerFrameLabel = document.createElement("label");
  const outerFrameLabelTextNode = document.createTextNode("外框大小: ");
  outerFrameLabel.appendChild(outerFrameLabelTextNode);
  outerFrameLabel.setAttribute("for", "passed-fontsize");
  passedSettingForm.appendChild(outerFrameLabel);

  const outerFrameInputEle = document.createElement("input");
  outerFrameInputEle.setAttribute("type", "text");
  outerFrameInputEle.setAttribute("id", "passed-outerframe");
  outerFrameInputEle.setAttribute("name", "passed-outerframe");
  passedSettingForm.appendChild(outerFrameInputEle);

  passedSettingForm.appendChild(document.createElement("br"));

  // 外框顏色
  const outerColorLabel = document.createElement("label");
  const outerColorLabelTextNode = document.createTextNode("外框顏色: ");
  outerColorLabel.appendChild(outerColorLabelTextNode);
  outerColorLabel.setAttribute("for", "passed-fontsize");
  passedSettingForm.appendChild(outerColorLabel);

  const outerColorInputEle = document.createElement("input");
  outerColorInputEle.setAttribute("type", "text");
  outerColorInputEle.setAttribute("id", "passed-outercolor");
  outerColorInputEle.setAttribute("name", "passed-outercolor");
  passedSettingForm.appendChild(outerColorInputEle);

  passedSettingForm.appendChild(document.createElement("br"));

  // 監聽各個欄位的輸入
  const passed = document.getElementById("passed-time");
  const passedColor = document.getElementById("passed-color");
  passedColor.addEventListener("input", function () {
    const value = passedColor.value;

    passed.style.color = value;
  });

  const passedFont = document.getElementById("passed-font");
  passedFont.addEventListener("input", function () {
    const value = passedFont.value;
    passed.style.fontFamily = value;
  });

  const passedFontSize = document.getElementById("passed-fontsize");
  passedFontSize.addEventListener("input", function () {
    const value = passedFontSize.value;
    passed.style.fontSize = value;
  });

  // ??? 外框是指什麼?
  const passedFrameSize = document.getElementById("passed-outerframe");
  passedFrameSize.addEventListener("input", function () {
    const value = passedFrameSize.value;
    passed.style.padding = value;
  });

  // ??? 外框是指什麼?
  const passedFrameColor = document.getElementById("passed-outercolor");
  passedFrameColor.addEventListener("input", function () {
    const color = passedFrameColor.value;
    value = `1px solid ${color}`;
    passed.style.border = value;
  });
}
/*********** 介面設定 ***************/

/************ 分頁畫面 *************/

/*********** 儲存時間資料 ********** */
function getInitData() {}
function storeTime() {}

function getTime() {}
/*********** 儲存時間資料 ************/

/*********** 其他功能 ***************/
// 依據傳入的數字增加時間
function addTime(time) {
  countdownTime += time;
}

// 開始倒數的fuction
function startCountdown() {
  // isWork
  isWork = true;

  // 每秒跑一次
  countdownControl = setInterval(() => {
    changeShowTime(countdownTime, "countdown");
    changeShowTime(passedTime, "passed");
    // 如果剩餘時間歸零，則停止
    if (countdownTime <= 0) {
      clearInterval(interval);
      console.log("時間到!");
    }

    countdownTime--;
    passedTime++;
  }, 1000);
}

// 更新時間畫面
function updateClock(type) {
  if (type === "countdown") {
    const updateTime = document.getElementById("countdown-time");
    let updateHours = Math.floor(countdownTime / 3600);
    let updateMinutes = Math.floor((countdownTime % 3600) / 60);
    let updateSeconds = countdownTime % 60;

    console.log(updateSeconds);

    updateHours = updateHours < 10 ? "0" + updateHours : updateHours;
    updateMinutes = updateMinutes < 10 ? "0" + updateMinutes : updateMinutes;
    updateSeconds = updateSeconds < 10 ? "0" + updateSeconds : updateSeconds;

    updateTime.textContent = `${updateHours} : ${updateMinutes} : ${updateSeconds}`;
  } else if (type === "passed") {
    const updateTime = document.getElementById("passed-time");
    let updateHours = Math.floor(passedTime / 3600);
    let updateMinutes = Math.floor((passedTime % 3600) / 60);
    let updateSeconds = passedTime % 60;

    console.log(updateSeconds);

    updateHours = updateHours < 10 ? "0" + updateHours : updateHours;
    updateMinutes = updateMinutes < 10 ? "0" + updateMinutes : updateMinutes;
    updateSeconds = updateSeconds < 10 ? "0" + updateSeconds : updateSeconds;

    updateTime.textContent = `${updateHours} : ${updateMinutes} : ${updateSeconds}`;
  }
}
/*********** 其他功能 ***************/

/************* 動畫 ****************/
function createAnAnimationItem(text) {
  const animationItemEle = document.createElement("span");
  const animationItemTextNode = document.createTextNode(text);
  animationItemEle.appendChild(animationItemTextNode);
  animationItemEle.setAttribute("id", "animation-span");

  const countdownTime = document.getElementById("countdown-time");
  countdownTime.appendChild(animationItemEle);

  const animationItem = document.getElementById("animation-span");
  animationItem.addEventListener("animationend", function () {
    animationItem.remove();
  });
}
/************* 動畫 ****************/
