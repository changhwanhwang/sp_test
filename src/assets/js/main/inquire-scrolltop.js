// 문의하기 버튼 + 스크롤 버튼
$(function () {
  let isScrolling;
  const scrollButton = $(".btn-scroll-top");
  const inquireButton = $(".btn-inquire");

  // 페이지 처음 진입시 기본 값 (15초면 충분해요 텍스트 화면색 배경)
  function whiteBg() {
    $(".btn-inquire").removeClass("js-active");
  }
  whiteBg();

  // 스크롤
  $(window).scroll(function () {
    // 스크롤 중에는 버튼을 숨깁니다.
    scrollButton.removeClass("show");
    inquireButton.removeClass("show");

    // 스크롤이 멈추면 타이머를 시작하여 일정 시간 후에 버튼을 표시합니다.
    clearTimeout(isScrolling);

    isScrolling = setTimeout(function () {
      scrollButton.addClass("show");
      inquireButton.addClass("show");
      // scrollButton.show();

      $(".btn-inquire").removeClass("js-active");
      // 스크롤이 멈추면 일정 시간 후에 민트, 흰색글씨로 색 변경
      setTimeout(function () {
        $(".btn-inquire").addClass("js-active");
      }, 400);
    }, 400); // 0.4초 후에 버튼을 표시합니다.
  });

  scrollButton.click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      {
        duration: 500, // 부드러운 스크롤 지속 시간 (밀리초)
        easing: "swing", // 스크롤 애니메이션 형태
      }
    );
  });
});
