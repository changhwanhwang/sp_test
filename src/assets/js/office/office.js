document.addEventListener("DOMContentLoaded", function () {
  // rem 비율 조절(1920 기준)
  maxWidth1920("p-office");

  // 지점리스트 링크이동
  // if ($(window).width() >= 768) {
  //   $(document).on("click", ".btn-more", function () {
  //     var btnHas = $(".btn-more").hasClass("is-open");
  //     var $this = $(this);
  //     if (btnHas == true) {
  //       $(".shop-link:not(:nth-child(-n+3))").css("display", "none");
  //       $this.text("더보기");
  //       $this.removeClass("is-open");
  //     } else {
  //       $(".shop-link").css("display", "flex");
  //       $this.text("닫기");
  //       $this.addClass("is-open");
  //     }
  //   });
  // } else {
  //   var shoptitle = $(".sec-shop-link .shop-item-title");

  //   shoptitle.click(function () {
  //     var $this = $(this);
  //     var shopBox = $this.parent();
  //     var linkWrap = $this.next();
  //     var openHas = shopBox.hasClass("is-open");
  //     if (openHas == true) {
  //       linkWrap.stop().slideUp(300);
  //       shopBox.removeClass("is-open");
  //     } else {
  //       shopBox.parents(".shop-wrap").find(".shop-box").removeClass("is-open");
  //       shopBox.parents(".shop-wrap").find(".link-wrap").stop().slideUp(300);
  //       linkWrap.stop().slideDown(300);
  //       shopBox.addClass("is-open");
  //     }
  //   });
  // }

  // header 스크롤 시 스타일 바뀜
  headerScroll($(".sec-kv").outerHeight(true), $(".sec-kv").outerHeight(true) / 2);

  // sub-gnb 이벤트
  $(function () {
    var header = $(".header");
    var $headerH = header.outerHeight(true);
    var $menu = $(".sub-gnb-link");
    var $menuH = $(".sub-gnb-link").outerHeight(true);
    var $contents = $(".scroll");
    var $doc = $("html, body");
    var $secSubGnb = $(".sec-sub-gnb");
    var secQuestion = $(".sec-shop").offset().top;
    var gnbOffset = $secSubGnb.offset().top - $menuH - $headerH;
    // var qustionOffset = $(".sec-shop").offset().top;

    function setActive(idx) {
      $menu.removeClass("is-active").eq(idx).addClass("is-active");
      $contents.removeClass("is-active").eq(idx).addClass("is-active");
    }

    $(window).scroll(function () {
      var scrollPos = $(window).scrollTop();
      var qustionOffset = $(".sec-shop").offset().top;

      // sub-gnb 고정
      $secSubGnb.toggleClass("fixed", scrollPos >= gnbOffset + $menuH);
      var fixedToggle = $secSubGnb.hasClass("fixed");
      if (!fixedToggle) {
        $(".sec-kv").css("margin-bottom", "");
        $(".header").css("border-bottom", "");
      } else {
        $(".header").css("border-bottom", "none");
        $(".sec-kv").css("margin-bottom", $menuH);
      }

      console.log(`scrollPos = ${scrollPos}`);
      console.log(`qustionOffset = ${qustionOffset}`);

      // sec-sub-gnb 스타일 변경
      if (scrollPos >= qustionOffset) {
        $secSubGnb.removeClass("fixed");
        $(".header").css("border-bottom", ".1rem solid #e0e0df");
        $(".sec-kv").css("margin-bottom", "");
      } else {
        $secSubGnb.addClass("fixed");
      }

      // 콘텐츠 활성화 처리
      $contents.each(function (idx) {
        var targetTop = $(this).offset().top;
        if (targetTop - 100 <= scrollPos) {
          setActive(idx);
        }
      });

      var place = $(".sec-kv").outerHeight();
      if (scrollPos <= place) {
        $secSubGnb.removeClass("fixed");
      }
    });

    // gnb 클릭 시 해당 영역으로 이동
    $menu.on("click", "a", function (e) {
      var idx = $(this).parent().index();
      var offsetTop = $contents.eq(idx).offset().top - 30;
      console.log(offsetTop);
      $doc.stop().animate({ scrollTop: offsetTop }, 1000);
      return false;
    });
  });

  // 슬라이더 호출
  preSlider();

  var ourOfficeSwiper = new Swiper(".our-office-slide", {
    loop: true,
    loopedSlides: 1,
    slidesPerView: 1,
    disableOnInteraction: false,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: {
      nextEl: ".our-office-next",
      prevEl: ".our-office-prev",
    },
  });

  // optionSlider();
  var optionSwiper = new Swiper(".option-slide", {
    loop: true,
    loopedSlides: 1,
    slidesPerView: 1,
    disableOnInteraction: false,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: {
      nextEl: ".option-next",
      prevEl: ".option-prev",
    },
  });

  // 스와이퍼
  var officeSwiper = new Swiper(".swiper-box", {
    slidesPerView: 1,
    watchOverflow: true,
    loop: true,
    disableOnInteraction: false,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      // dynamicBullets: true,
      // dynamicMainBullets: 3,
    },
    breakpoints: {
      768: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });

  // ourSlider();

  // 슬라이더 리사이징
  $(window).on("resize", function () {
    preSlider();
    // optionSlider();
    // ourSlider();
  });

  // 모바일에서만 swiper 활성화 되는 함수
  moblieSliderFuntion();

  // 모바일에서 역재생 시 같은 이미지 반복 이슈 해결 코드
  $(".our-office-slide .our-office-prev").on("click", function () {
    ourOfficeSwiper.slideNext();
  });
  $(".option-slide .option-prev").on("click", function () {
    optionSwiper.slideNext();
  });

  // 롤링 이벤트
  if ($(window).width() <= 768) {
    rolling(".rolling-left", "left", 21900, false);
    rolling(".rolling-right", "right", 21900, false);
  } else {
    rolling(".rolling-left", "left", 50000, false);
    rolling(".rolling-right", "right", 50000, false);
  }

  if ($(window).width() <= 768) {
    $(".sec-price .img-box").attr("data-aos-delay", "200");

    // custom-box
    $(".custom-box .text-wrap").attr("data-aos-delay", "200");
    $(".custom-box .option-slide").attr("data-aos-delay", "");
  }

  // 이전에 저장된 이벤트 상태를 복원
  // const savedEventState = sessionStorage.getItem("buttonEventState");

  // // URL 파라미터 확인
  // const urlParams = new URLSearchParams(window.location.search);
  // const btnOpen = urlParams.get("btnOpen");

  // if (btnOpen === "false") {
  //   // URL 파라미터로 버튼 상태가 "false"로 설정된 경우
  //   // 처음 페이지 진입 시 .shop-link:not(:nth-child(-n+3))를 숨김
  //   $(".sec-shop-link .shop-link:not(:nth-child(-n+3))").css("display", "none");
  // } else if (savedEventState === "true") {
  //   // 이전에 저장된 이벤트 상태가 true인 경우
  //   // 버튼 클릭 상태가 true인 경우, 리스트를 모두 flex로 표시
  //   $(".sec-shop-link .btn-more").addClass("is-open");
  //   $(".sec-shop-link .shop-link").css("display", "flex");
  // }

  // kv swiper
  const keycisualSwiper = new Swiper(".keycisual-swiper", {
    loop: true,
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  // sec-shop 롤링이벤트
  if ($(window).width() <= 768) {
    rolling(".sec-shop .rolling-wrap", "left", 21900, false);
  } else {
    rolling(".sec-shop .rolling-wrap", "left", 50000, false);
  }

  // sec-shop btn 깜빡이는 효과
  // var eventExecuted = false;
  $(window).on("scroll", function () {
    // if (!eventExecuted) {
    var currentScroll = $(window).scrollTop();
    var sectionTop = $(".sec-shop").offset().top;
    var sectionHeight = $(".sec-shop").outerHeight();
    var sectionBtn = $(".sec-shop .btn-more");

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      sectionBtn.addClass("active");
      setTimeout(function () {
        sectionBtn.removeClass("active");
        setTimeout(function () {
          sectionBtn.addClass("active");
          setTimeout(function () {
            sectionBtn.removeClass("active");
          }, 1000);
        }, 1000);
      }, 1000);
      // eventExecuted = true;
    }
    // }
  });

  // 기업소개 스와이퍼
  if ($(window).width() <= 768) {
    const companySwiper = new Swiper(".company-swiper", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
      },
      loop: true,
      disableOnInteraction: false,
      autoplay: { delay: 3000, disableOnInteraction: false },
    });
  }

  // 드롭다운모듈
  var dropDownList = $('[data-module="drop-down-list"]');
  var dropDownTitle = $('[data-module="drop-down-title"]');
  var dropDownContent = $('[data-module="drop-down-content"]');
  dropDownTitle.click(function () {
    var $this = $(this);
    var openHas = $this.parent().hasClass("is-open");
    if (openHas == true) {
      $this.next().stop().slideUp(300);
      $this.parent().removeClass("is-open");
    } else {
      dropDownList.removeClass("is-open");
      dropDownContent.stop().slideUp(300);
      $this.next().stop().slideDown(300);
      $this.parent().addClass("is-open");
    }
  });

  vimeo();
});

// our-office-slide
function ourSlider() {
  var ourOfficeSwiper = new Swiper(".our-office-slide", {
    loop: true,
    watchOverflow: true,
    loopedSlides: 1,
    slidesPerView: 1,
    autoplay: { delay: 1500 },
    navigation: {
      nextEl: ".our-office-next",
      prevEl: ".our-office-prev",
    },
  });
}

// option-slide
function optionSlider() {
  var optionSwiper = new Swiper(".option-slide", {
    loop: true,
    loopedSlides: 1,
    slidesPerView: 1,
    autoplay: { delay: 1500 },
    navigation: {
      nextEl: ".option-next",
      prevEl: ".option-prev",
    },
  });
}

// pre slider
function preSlider() {
  var swiperPre = new Swiper(".slide-box-pre", {
    slidesPerView: "auto",
    scrollbar: {
      el: ".pre-scrollbar",
      hide: true,
      draggable: true,
    },
    spaceBetween: 8,
    breakpoints: {
      768: {
        spaceBetween: 4,
      },
    },
  });
}

// 모바일에서만 swiper 활성화 되는 함수
function moblieSliderFuntion() {
  var swiperImages = null;
  var specialSlider = null;

  function destroySwiper(swiper) {
    if (swiper) {
      swiper.destroy();
    }
  }

  function swiperMobileImages() {
    var screenWidth = $(window).width();

    if (screenWidth < 769) {
      if (!swiperImages) {
        swiperImages = new Swiper(".images-slider", {
          slidesPerView: "auto",
          centeredSlides: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          loop: true,
          spaceBetween: 30,
          initialSlide: 2,
        });
        swiperImages.on("slideChange", function () {
          swiperImages.autoplay.start();
        });
      }

      if (!specialSlider) {
        specialSlider = new Swiper(".specialistSlide", {
          slidesPerView: "auto",
          centeredSlides: true,
          pagination: {
            el: ".special-pagination",
            clickable: true,
          },
        });
      }
    } else {
      destroySwiper(swiperImages);
      swiperImages = null;
      destroySwiper(specialSlider);
      specialSlider = null;
    }
  }

  swiperMobileImages();

  // 리사이징 됐을때 변화
  $(window).on("resize", swiperMobileImages);
}
