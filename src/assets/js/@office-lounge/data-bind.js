import { Data } from './data.js';

$(document).ready(function() {
  const pageName = $("#sp-wrap").attr("class");

  // 바인딩 할 섹션 class
  // const $kv = $(".sec-kv");
  const $app = $(".sec-app");
  const $questionList = $(".sec-question");

  // 오피스 일때 삽입되는 데이터
  if (pageName == "p-office") {
    initializePage(Data.office, $app, $questionList);
  }
  // 라운지 일때 삽입되는 데이터
  else if (pageName == "p-lounge") {
    initializePage(Data.lounge, $app, $questionList);
  }
});

function initializePage(data,  $app, $questionList) {
  // 지정 클래스 내부에 어떤 페이지를 로드 할지
  // if ($kv.length > 0) {
  //   KeyVisuals($kv, data);
  // }
  if ($app.length > 0) {
    secApp($app, data);
  }
  if ($questionList.length > 0) {
    questions($questionList, data);
  }
}


















