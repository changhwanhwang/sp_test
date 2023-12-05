$(function () {
  // 페이지에 따라 header의 첫 로드 스타일 달라지게
  $(function () {
    if ($(window).width() >= 768) {
      if ($("#sp-wrap").attr("class") == "p-lounge" || $("#sp-wrap").attr("class") == "p-office" || $("#sp-wrap").attr("class") == "p-about" || $("#sp-wrap").attr("class") == "p-detail") {
        $(".header").addClass("js-active");
        $("#sp-wrap").addClass("js-active");
      }
    }
  });
  // header gnb icon
  $(window).resize(function () {
    if ($(window).width() <= 768) {
      var gnbOpenHas = $(".header__list").hasClass("is-opened");
      if (gnbOpenHas) {
        $(".header__list").css("display", "flex");
      } else {
        $(".header__list").css("display", "none");
      }
    } else {
      $(".header__list").css("display", "flex");
    }
  });
  if ($(window).width() <= 768) {
    $(document).on("click", ".header__gnb .js-menu-toggle", function () {
      $(this).toggleClass("is-opened");
      var gnbOpenHas = $(this).hasClass("is-opened");
      if (gnbOpenHas) {
        $(".header").css("border-bottom", "none");
        $(".header__list").addClass("is-opened");
        $(".header").after('<div class="dim"></div></div>');
      } else {
        var mainSortation = $("#sp-wrap");
        var hasPageSearch = mainSortation.hasClass("p-search");
        if (hasPageSearch) {
          $(".header").css("border-bottom", "none");
        } else {
          $(".header").css("border-bottom", "");
        }
        $(".header__list").removeClass("is-opened");
        $(".dim").remove();
      }
      $(".header__list").toggle("blind", 200);
    });
  }

  // footer
  var infoBtn = $(".info .info-btn");

  infoBtn.click(function () {
    var $this = $(this);
    var infoBox = $this.parent();
    var infoWrap = $this.next();
    var openHas = infoBox.hasClass("is-open");
    if (openHas == true) {
      infoWrap.stop().slideUp(300);
      infoBox.removeClass("is-open");
    } else {
      infoWrap.stop().slideDown(300);
      infoBox.addClass("is-open");
    }
  });

  // #sp-wrap 내부의 .video 클래스를 가진 DOM 요소를 찾아서 자동으로 기능 적용
  // $('#sp-wrap .video').each(function () {
  //   ScrollVideo($(this));
  // });

  // // // pc safari 구분
  // if ($(window).width() >= 768) {
  //   var agent = navigator.userAgent.toLowerCase();

  //   if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1) {
  //     $(".safari").show();
  //     $(".safari").on('click', function () {
  //         $(".safari").remove();
  //         videoPlay(id);
  //       });
  //     }else{$(".safari").hide();}
  // }else{$(".safari").hide();}

  // var videoMain = document.getElementById("video00");

  // // 비디오 재생을 시도
  // videoMain.play().catch(function (error) {
  //     if (error.name === "NotAllowedError") {
  //         // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
  //         console.log("비디오 재생 권한이 거부되었습니다.");
  //         // 원하는 작업을 수행하거나 사용자에게 알림을 표시할 수 있습니다.
  //     } else {
  //         // 다른 오류인 경우, 여기서 처리
  //         console.error("오류 발생:", error);
  //     }
  // });
});

// header 스크롤 시 투명하게 바뀌는 함수
function headerScroll($posterOffset, $promotionBox) {
  if ($(window).width() >= 768) {
    const headerBox = $(".header").outerHeight(true);
    $(window).scroll(function () {
      let scrollPos = $(window).scrollTop();
      if (scrollPos >= $posterOffset - ($promotionBox + headerBox)) {
        $("header").removeClass("js-active");
      } else {
        $(".header").addClass("js-active");
      }
    });
  }
}

// 무한 롤링
function rolling($content, direction, duration, pauseOnHover) {
  $($content).marquee({
    duplicated: true,
    duration: duration,
    gap: 0,
    direction: direction,
    startVisible: true,
    pauseOnHover: pauseOnHover,
  });
}

// 1920 기준 작업 시
function maxWidth1920(pageName) {
  var pageCheck = $("#sp-wrap").hasClass(pageName);
  if (pageCheck) {
    if ($(window).width() <= 1440 && $(window).width() >= 769) {
      $("html").css("fontSize", "0.694444vw");
    } else if ($(window).width() <= 769) {
      $("html").css("fontSize", "2.6667777778vw");
    } else {
      $("html").css("fontSize", "62.5%");
    }
    $(window).resize(function () {
      if ($(window).width() <= 1440 && $(window).width() >= 769) {
        $("html").css("fontSize", "0.694444vw");
      } else if ($(window).width() <= 769) {
        $("html").css("fontSize", "2.6667777778vw");
      } else {
        $("html").css("fontSize", "62.5%");
      }
    });
  }
}
// 1440 기준 작업 시
function maxWidth1440(pageName) {
  var pageCheck = $("#sp-wrap").hasClass(pageName);
  if (pageCheck) {
    if ($(window).width() >= 768) {
      $("html").css("fontSize", "0.69445vw");
    } else {
      $("html").css("fontSize", "2.6667777778vw");
    }
    $(window).resize(function () {
      if ($(window).width() >= 768) {
        $("html").css("fontSize", "0.69445vw");
      } else {
        $("html").css("fontSize", "2.6667777778vw");
      }
    });
  }
}

// inner값에 따른 커스텀마이징
function maxWidthCustom(pageName, maxWidth, vw) {
  var pageCheck = $("#sp-wrap").hasClass(pageName);
  if (pageCheck) {
    if ($(window).width() <= maxWidth && $(window).width() > 768) {
      $("html").css("fontSize", vw);
    } else if ($(window).width() <= 768) {
      $("html").css("fontSize", "2.6667777778vw");
    } else {
      $("html").css("fontSize", "62.5%");
    }
    $(window).resize(function () {
      if ($(window).width() <= maxWidth && $(window).width() > 768) {
        $("html").css("fontSize", vw);
      } else if ($(window).width() <= 768) {
        $("html").css("fontSize", "2.6667777778vw");
      } else {
        $("html").css("fontSize", "62.5%");
      }
    });
  }
}

// 화면에 보이는 슬라이드 영상 제외 이전 영상 멈춤
function pauseAllVideos($yourSection) {
  const $section = $($yourSection);

  // 모든 슬라이드의 .video 소스를 가져와서 배열에 추가
  $section.find(".swiper-slide.videoSlide").each(function () {
    var element = $(this);
    const videoId = element.find(".videoIframe").attr("id");
    const videoPlayer = new Vimeo.Player(videoId, { autoplay: true, background: true, loop: true, muted: true, responsive: true });
    if (element.length > 0) {
      videoPlayer.pause();
    }else{
      videoPlayer.play();
    }
  });
}

// 화면에 보이는 슬라이드 영상 재생
function playCurrentSlideVideo(swiperInstance) {
  var currentSlide = swiperInstance.slides[swiperInstance.activeIndex];
  var element = $(currentSlide);
  if (element.length > 0) {
    const videoId = element.find(".videoIframe").attr("id");
    const videoPlayer = new Vimeo.Player(videoId, { autoplay: true, background: true, loop: true, muted: true, responsive: true });
    videoPlayer.play();
  }
}

// // 슬라이더 내에 여러개의 영상이 들어가있을 때 사용하는 함수 + 스크롤 포함
// function initializeSliderAutoPlay($yourSection, swiperInstance) {
//   // 초기 iframe 소스 URL을 저장할 배열
//   const $section = $($yourSection);
//   const initialSrcs = [];

//   // 모든 슬라이드의 iframe 소스를 가져와서 배열에 추가
//   $section.find(".swiper-slide.videoSlide").each(function () {
//     initialSrcs.push($(this).find(".videoIframe").attr("id"));
//   });

//   // 변경된 슬라이드를 추적하기 위한 배열
//   let changedSlides = [];

//   $(window).on("scroll", function () {
//     // 다음 섹션을 가져오고 높이를 계산
//     const nextSection = $section.next();
//     const nextSectionHeight = nextSection.offset().top + nextSection.height();
//     const sectionBottom = $section.offset().top + $section.height();
//     // 현재 활성화된 Swiper 슬라이드의 인덱스 가져오기
//     const currentIndex = swiperInstance.activeIndex;
//     // 현재 화면에 보이는 슬라이드의 iframe을 선택
//     console.log("currentIndex =" + currentIndex );
//     const currentIframe = $section.find(".swiper-slide.videoSlide").eq(currentIndex);
//     console.log("currentIframe =" + currentIframe );
//     // 새로운 iframe 소스를 가져옵니다.
//     const newSrc = currentIframe.find(".videoIframe").attr("id");
//     console.log("newSrc =" + newSrc );
//     const videoPlayer = new Vimeo.Player(newSrc, { autoplay: true, background: true, loop: true, muted: true, responsive: true });

//     // console.log($(window).scrollTop() + $(window).height());
//     // console.log(sectionBottom);
//     // 현재 슬라이드가 화면에 보일 때
//     if ($(window).scrollTop() + $(window).height() >= sectionBottom - 300 && $(window).scrollTop() + $(window).height() <= nextSectionHeight) {
//       // 변경된 슬라이드 배열에 현재 슬라이드 인덱스가 없으면
//       if (changedSlides.indexOf(currentIndex) === -1) {
//         // 현재 슬라이드의 iframe 소스에 자동 재생 및 루프 옵션을 추가
//         videoPlayer.play();
//         // console.log("슬라이드영상재생");
//         // 변경된 슬라이드 배열에 현재 슬라이드 인덱스를 추가
//         changedSlides.push(currentIndex);
//       }
//     } else {
//       // 스크롤 시 해당 섹션을 벗어나면 모든 슬라이드의 iframe 소스를 초기 상태로 다시 설정함
//       $section.find(".swiper-slide.videoSlide .videoIframe").attr("id", function (index) {
//         videoPlayer.pause();
//         // console.log("슬라이드영상정지");
//         return initialSrcs[index];
//       });
//       // 변경된 슬라이드 배열을 초기화
//       changedSlides = [];
//     }
//   });

//   vimeo();
// }

// 스크롤 시 자동으로 .video 를 순회해서 영상재생
function vimeo() {
  const $videoKvBox = $("#video00");
  const $videoKvHas = $videoKvBox.length;
  var videoKvPlayer;

  // kvbg
  const $videoKvBoxBg = $("#video0");
  var videoKvBgPlayer;

  var isMuted = false;


  if ($videoKvHas) {
    videoKvPlayer = new Vimeo.Player("video00", { autoplay: true, background: true, loop: true, muted: true, responsive: true });
    videoKvBgPlayer = new Vimeo.Player("video0", { autoplay: true, background: true, loop: true, muted: true, responsive: true });
    videoKvPlayer.play();
    videoKvBgPlayer.play();
    setTimeout(function () {
      $(".video-thumbnail-bg").hide();
    }, 10000);

    // 사운드컨트롤 s
    var $btnMutedOff = $(".btn-muted-off");
    var $btnMutedOn = $(".btn-muted-on");
    var $volumeSlider = $("#volume-slider");

    $btnMutedOff.on("click", function () {
      videoKvPlayer.setVolume(0);
      $volumeSlider.val(0);
      isMuted = true;
      $btnMutedOn.show();
      $btnMutedOff.hide();
    });
    $btnMutedOn.on("click", function () {
      videoKvPlayer.setVolume(1);
      $volumeSlider.val(1);
      isMuted = false;
      $btnMutedOff.show();
      $btnMutedOn.hide();
    });
    videoKvPlayer.ready().then(function () {
      videoKvPlayer.setVolume(0); // 초기 음량 설정
    });
    // 사운드컨트롤 e
    $(window).on("scroll", function () {
      const scrollTop = $(window).scrollTop();
      const videoKvHeight = $videoKvBox.offset().top + $videoKvBox.height();

      if (scrollTop <= videoKvHeight) {
        videoKvPlayer.play();
        console.log("메인재생");
      } else {
        videoKvPlayer.pause();
        console.log("메인멈춤");
      }

      const videoKvBgHeight = $videoKvBoxBg.offset().top + $videoKvBoxBg.height();

      if (scrollTop <= videoKvBgHeight) {
        videoKvBgPlayer.play();
        console.log("메인배경재생");
      } else {
        videoKvBgPlayer.pause();
        console.log("메인배경멈춤");
      }
    });

    //  pc일때
    if ($(window).width() >= 768) {
      // var agent = navigator.userAgent.toLowerCase();

      // if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1) {
      //   // 사파리 일때
      //   console.log("(pc)비디오 재생 권한이 거부되었습니다.");
      //   $('.video-control-btn').show();
      //   $('.video-thumbnail').show();
      //   $(".btn-video-play").on("click", function () {
      //     $('.video-control-btn').hide();
      //     $('.video-thumbnail').hide();
      //     if ($videoKvHas) {
      //       videoKvPlayer.play();
      //       videoKvBgPlayer.play();
      //     }
      //   });
      // } else {
      //   // 사파리가 아닐떄
      //   $('.video-control-btn').hide();
      //   $('.video-thumbnail').hide();
      //   if ($videoKvHas) {
      //     videoKvPlayer.play();
      //     videoKvBgPlayer.play();
      //   }
      // }
      videoKvPlayer.play();
      videoKvBgPlayer.play();

      videoKvPlayer.play().catch(function (error) {
        if (error.name === "NotAllowedError") {
          $(".video-control-btn").show();
          $(".video-thumbnail").show();
          // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
          console.log("(모바일)비디오 재생 권한이 거부되었습니다.");
          $(".btn-video-play").on("click", function () {
            $(".video-control-btn").hide();
            $(".video-thumbnail").hide();
            if ($videoKvHas) {
              videoKvPlayer.play();
              videoKvBgPlayer.play();
            }
          });
        }
      });
      // $('.video-control-btn').hide();
      // $('.video-thumbnail').hide();
      // if ($videoKvHas) {
      //   videoKvPlayer.play();
      //   videoKvBgPlayer.play();
      // }
    } else {
      // 모바일일때
      videoKvPlayer.play();
      videoKvBgPlayer.play();

      videoKvPlayer.play().catch(function (error) {
        if (error.name === "NotAllowedError") {
          $(".video-control-btn").show();
          $(".video-thumbnail").show();
          // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
          console.log("(모바일)비디오 재생 권한이 거부되었습니다.");
          $(".btn-video-play").on("click", function () {
            $(".video-control-btn").hide();
            $(".video-thumbnail").hide();
            if ($videoKvHas) {
              videoKvPlayer.play();
              videoKvBgPlayer.play();
            }
          });
        }
      });
    }
  }

  $(window).on("scroll", function () {
    // $('.video-control-btn').hide();
    // $('.video-thumbnail').hide();
    // .video 클래스 요소를 순회하며 화면에 보이는 요소를 찾습니다.
    $(".video").each(function () {
      const element = $(this);
      const videoId = element.attr("id");
      const videoPlayer = new Vimeo.Player(videoId, { autoplay: true, background: true, loop: true, muted: true, responsive: true });

      // 요소의 위치와 높이를 가져옵니다.
      const elementTop = element.offset().top;
      const elementBottom = elementTop + element.outerHeight();

      // 현재 스크롤 위치를 가져옵니다.
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      // 요소가 화면에 보이는지 확인합니다.
      if (elementBottom > viewportTop && elementTop + 300 < viewportBottom) {
        if ($(window).width() >= 768){
          $(".video-control-btn").hide();
          $(".video-thumbnail").hide();
        }
        videoPlayer.play();

        console.log('화면에 보이는 .video 클래스 요소의 id 값: ' + videoId);

        
        // console.log('영상재생');

        // 사운드컨트롤 s

        var $btnMutedOff = $("#" + videoId).parent().find(".btn-muted-off");
        var $btnMutedOn = $("#" + videoId).parent().find(".btn-muted-on");
    
        $btnMutedOff.on("click", function () {
          videoPlayer.setVolume(0);
          isMuted = true;
          $btnMutedOn.show();
          $btnMutedOff.hide();
        });
        $btnMutedOn.on("click", function () {
          videoPlayer.setVolume(1);
          isMuted = false;
          $btnMutedOff.show();
          $btnMutedOn.hide();
        });
        // videoPlayer.ready().then(function () {
        //   videoPlayer.setVolume(0); // 초기 음량 설정
        // });
        
        if ($(window).width() >= 768) {
          // videoPlayer.play();
          
          // videoPlayer.play().catch(function (error) {
          //   if (error.name === "NotAllowedError") {
          //     $(".video-control-btn").show();
          //     $(".video-thumbnail").show();
          //     // 사용자가 비디오 재생 권한을 거부한 경우, 여기서 처리
          //     console.log("(모바일)비디오 재생 권한이 거부되었습니다.");
          //     $(".btn-video-play").on("click", function () {
          //       $(".video-control-btn").hide();
          //       $(".video-thumbnail-bg").hide();
          //       $(".video-thumbnail").hide();
          //       videoPlayer.play();
          //     });
          //   }
          // });
        } else {
          // 모바일일때
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
                $(".video-thumbnail-bg").hide();
                videoPlayer.play();
              });
            }
          });
        }


      } else {
        // var $btnMutedOff = $("#" + videoId).parent().find(".btn-muted-off");
        // var $btnMutedOn = $("#" + videoId).parent().find(".btn-muted-on");
        // videoPlayer.setVolume(0);
        // isMuted = true;
        // $btnMutedOn.show();
        // $btnMutedOff.hide();
        // videoPlayer.pause();
        console.log('영상멈춤');
      }

      
      
    });
  });
}
