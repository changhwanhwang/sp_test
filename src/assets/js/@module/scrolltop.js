$(function () {
  let isScrolling;
  const $scrollButtonBox = $(".scroll-button-box");
  const inquireButton = $(".btn-inquire");
  const scrollButton = $(".btn-scroll-top");

  // 페이지 최초 로딩 시에는 scrollButton를 숨깁니다.
  scrollButton.hide();

  // 스크롤
  $(window).scroll(function () {
    // 스크롤 중에는 버튼을 숨기지 않도록 설정
    $scrollButtonBox.removeClass("show");

    // 스크롤이 멈추면 타이머를 시작하여 일정 시간 후에 버튼을 표시합니다.
    clearTimeout(isScrolling);

    isScrolling = setTimeout(function () {
      $scrollButtonBox.addClass("show");

      // 화면 너비가 768px 이상이고 'bubble' 클래스가 추가되지 않았을 때만 'bubble' 클래스 추가
      if (!isMobile() && $(window).width() >= 768) {
        if (!inquireButton.hasClass("bubble")) {
          inquireButton.addClass("bubble");
        }
      }

      // 5초마다 'active' 클래스를 추가하고 제거하여 애니메이션 실행
      setInterval(function () {
        inquireButton.toggleClass("active");
      }, 5000);
    }, 100);

    // 스크롤 위치에 따라 최상단 버튼 보이기/숨기기
    if ($(this).scrollTop() > 0) {
      scrollButton.show();
    } else {
      scrollButton.hide();
    }
     // 화면 너비가 768px 미만일 때 ".btn-scroll-top" 버튼 숨기기
     if ($(window).width() < 768) {
      scrollButton.hide();
    }
  });

  // 최상단 버튼 클릭 시 스크롤 이동
  scrollButton.click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      {
        duration: 500,
        easing: "swing"
      }
    );
  });

  // 모바일 감지 함수
  function isMobile() {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // 초기 페이지 로딩 시에도 'bubble' 클래스 추가 (화면 너비가 768px 이상인 경우)
  if (!isMobile() && $(window).width() >= 768) {
    inquireButton.addClass("bubble");
  }
});