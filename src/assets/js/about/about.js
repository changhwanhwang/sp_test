$(function () {
  // rem 비율 조절(1920 기준)
  // maxWidth1920('p-about');
  // $(".sec-space .play-btn").click(function () {
  //   console.log("나는야 천재");
  // });

  var pageCheck = $("#sp-wrap").hasClass("p-about");
  if (pageCheck) {
    $(".footer").addClass("st-black");
  }

  // var swiperSpace = null; // swiperSpace를 전역 변수로 선언

  var mobileAbout = window.innerWidth < 768; // 모바일 화면인지 확인

  var paginationConfig = {
    el: ".swiper-pagination",
    clickable: true,
  };

  if (mobileAbout) {
    paginationConfig.type = "bullets"; // 모바일 화면에서는 불릿으로 표시
  } else {
    paginationConfig.type = "fraction"; // 피시 화면에서는 숫자로 표시
  }

  var swiperSpace = new Swiper(".scroll-box", {
    pagination: paginationConfig,
    centeredSlides: true,
    autoHeight: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    breakpoints: {
      768: {
        navigation: {
          nextEl: ".space-next",
          prevEl: ".space-prev",
        },
        spaceBetween: 20,
      },
    },
  });

  var allSlideElements = $('.sec-space .swiper-slide');
  var allSlideIDs = [];
  allSlideElements.each(function (index, slideElement) {
    var slideID = $(slideElement).find(".videoIframe").attr('id');
    allSlideIDs.push(slideID);
  });
  console.log('모든 슬라이더의 ID:', allSlideIDs);
  
  var vimeoPlayers = [];
  allSlideIDs.forEach(function (slideID) {
    var player = new Vimeo.Player(slideID, { autoplay: true, background: true, loop: true, muted: true, responsive: true });
    vimeoPlayers.push(player);
    player.play();
    player.play().catch(function (error) {
      if (error.name === "NotAllowedError") {
        $(".video-control-btn").show();
        $(".video-thumbnail").show();
        // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
        console.log("(모바일)비디오 재생 권한이 거부되었습니다.");
        $(".btn-video-play").on("click", function () {
          $(".video-control-btn").hide();
          $(".video-thumbnail").hide();
            player.play();
        });
      }
    });
  });


    //  스와이프 동작이벤트 발생 시 s
    swiperSpace.on('slideChange', function () {
      // 현재 활성화된 슬라이드의 데이터 ID 값을 가져옵니다.
      swiperSpace.init();
      var activeSlide = swiperSpace.activeIndex; // 현재 활성 슬라이드의 인덱스
      var activeSlideElement = swiperSpace.slides[activeSlide]; // 활성 슬라이드 요소
      var activeSlideID = $(activeSlideElement).find(".videoIframe").attr('id'); // 데이터 ID 가져오기
  
      const videoPlayer = new Vimeo.Player(activeSlideID, { autoplay: true, background: true, loop: true, muted: true, responsive: true });
      videoPlayer.play();
      videoPlayer.play().catch(function (error) {
        if (error.name === "NotAllowedError") {
          $(".video-control-btn").show();
          $(".video-thumbnail").show();
          // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
          console.log("(모바일)비디오 재생 권한이 거부되었습니다.");
          $(".btn-video-play").on("click", function () {
            $(".video-control-btn").hide();
            $(".video-thumbnail").hide();
              videoPlayer.play();
          });
        }
      });
      console.log('현재 활성화된 슬라이더의 ID:', activeSlideID);

      // var allSlideElements = $('.sec-space .swiper-slide');
      // var allSlideIDs = [];

      // allSlideElements.each(function (index, slideElement) {
      //   var slideID = $(slideElement).find(".videoIframe").attr('id');
      //   if (slideID !== activeSlideID) {
      //     allSlideIDs.push(slideID);
      //   }
      // });
      // console.log('현재 활성화된 슬라이더를 제외한 다른 슬라이더의 ID:', allSlideIDs);
      // const stopvideoPlayer0 = new Vimeo.Player(allSlideIDs[0], { autoplay: true, background: true, loop: true, muted: true, responsive: true });
      // const stopvideoPlayer1 = new Vimeo.Player(allSlideIDs[1], { autoplay: true, background: true, loop: true, muted: true, responsive: true });
      // const stopvideoPlayer2 = new Vimeo.Player(allSlideIDs[2], { autoplay: true, background: true, loop: true, muted: true, responsive: true });
      // stopvideoPlayer0.pause();
      // stopvideoPlayer1.pause();
      // stopvideoPlayer2.pause();

    });
    //  스와이프 동작이벤트 발생 시 e
  

  // vimeo();



  // 창 크기 변경 시 슬라이더 초기화
  // window.addEventListener("resize", function () {
  //   initSwiperSpace();
  // });

  // // 페이지 로드 후 초기화
  // window.addEventListener("load", function () {
  //   initSwiperSpace();
  // });

  // 헤더 bg 투명하게 바꿔주는 함수
  headerScroll($(".history-list").offset().top, $(".sec-history").outerHeight(true));

  // 롤링 이벤트 (기업 롤링)
  if ($(window).width() <= 768) {
    rolling(".rolling-left", "left", 21900, false);
    rolling(".rolling-right", "right", 21900, false);
  } else {
    rolling(".rolling-left", "left", 50000, true);
    rolling(".rolling-right", "right", 50000, true);
  }

  AOS.init();
});
