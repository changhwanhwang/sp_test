$(document).ready(function () {
  // p-promotion일 때, footer 스타일
  // if ($("#sp-wrap").hasClass("p-promotion") === true) {
  //   $(".footer").addClass("js-active");
  // }

  // maxWidth1920('p-promotion');

  maxWidthCustom('p-promotion', 1920, '0.520833vw');

  // 프로모션 매 월 변경되게끔 (231031 오픈 이후 주석해제)
  const now = new Date();
  const mon = now.getMonth() + 1;  
  const monText = $(".mon").html(mon);

    // 종료 날짜 설정 (1일 12시간 후로 설정)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);
    endDate.setHours(12, 0, 0, 0);
    
    // 카운트다운 함수
    function updateCountdown() {
        const now = new Date();
        const timeDifference = endDate - now;
    
        if (timeDifference <= 0) {
            $('.count-down').text('이벤트 종료');
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
            $('.count-down').text(days + '일 ' + hours + ': ' + minutes + ': ' + seconds + ' 남음');
        }
    }
    
    // 초기 카운트다운 업데이트
    // updateCountdown();
    
    // // 1초마다 카운트다운 업데이트
    // setInterval(updateCountdown, 1000);


})