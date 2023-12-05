$(function () {
  // rem 비율 조절(1920 기준)
  maxWidth1920('p-lounge');
  // maxWidthCustom("p-lounge", 1920, "0.520833vw");

  $(function () {
    // // sec-membership tabmenu
    moduleTab("membership-tab");
    moduleTab("membership-tab2");

    var scrollbarBg = $(".swiper-scrollbar").width();
    var scrollbarInner = $(".swiper-scrollbar-drag");
    var scrollBarWidth = 33390 / scrollbarBg;

    // 스크롤바 너비 설정
    scrollbarInner.css("width", scrollBarWidth + "px");
  });

  // header 스크롤 시 스타일 바뀌게
  headerScroll($(".content").offset().top, $(".title-box").outerHeight(true));

  // 첫 번째 이미지 슬라이더 초기화
  // let swiperAos = new Swiper(".slide-box-aos");
  // 두 번째 이미지 슬라이더 초기화

  function slideResizing() {
    const winWidth = $(window).width();
    if (winWidth <= 768) {
      swiperSpace = new Swiper(".slide-box-space", {
        slidesPerView: "auto",
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
        },
        spaceBetween: 4,
      });
    }
  }
  slideResizing();
  $(window).resize(function () {
    slideResizing();
  });

  // jh 추가 첫번째 섹션
  var screenWidth = $(window).width();
  var swiperImages = undefined;

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

  var swiperPicture = new Swiper(".slide-box-picture", {
    slidesPerView: 1,
    watchOverflow: true,
    loop: true,
    disableOnInteraction: false,
    autoplay: { delay: 2000, disableOnInteraction: false },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
  });

  // 스와이퍼
  var loungeSwiper = new Swiper(".swiper-box", {
    slidesPerView: 1,
    watchOverflow: true,
    loop: true,
    disableOnInteraction: false,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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

  $(window).on("resize", function () {
    screenWidth = $(window).width();
    initSwiper();
  });

  // 멤버십 확인하기 버튼 클릭 시 해당 섹션으로 이동 버튼
  $(".btn-membership").click(function (event) {
    event.preventDefault();
    var targetSection = $(this.hash);
    var offset = -100; // 섹션 상단이 살짝 위에 보이도록 조절값을 설정합니다.
    $("html, body").animate(
      {
        scrollTop: targetSection.offset().top + offset,
      },
      500
    );
  });

  var reviewWrap = $(".sec-review");
  var revieMoreBtn = $(".sec-review .btn-more");
  var reviewList = $(".review-list");
  $(".review-item:gt(3)").css("display", "none");
  var winWidth = $(window).width();
  if (winWidth <= 768) {
    $(".review-item:gt(3)").css("display", "block");
    $(".sec-review").removeClass("is-close");
  }

  revieMoreBtn.click(function () {
    $(".sec-review").toggleClass("is-close");
    var $this = $(this);
    var thisHas = $this.hasClass("is-open");
    if (thisHas == true) {
      $this.text("더보기");
      $(".review-item:gt(3)").css("display", "none");
      $this.removeClass("is-open");
      $(".sec-review::before").css("display", "block");
    } else {
      $this.addClass("is-open");
      $(".review-item:gt(3)").css("display", "block");
      $this.text("닫기");
      $(".sec-review::before").css("display", "none");
    }
  });

  // 지점이동 드롭다운
  var shoptitle = $(".sec-shop-link .shop-item-title");

  shoptitle.click(function () {
    var $this = $(this);
    var shopBox = $this.parent();
    var linkWrap = $this.next();
    var openHas = shopBox.hasClass("is-open");
    if (openHas == true) {
      linkWrap.stop().slideUp(300);
      shopBox.removeClass("is-open");
    } else {
      shopBox.parent().find(".shop-box").removeClass("is-open");
      shopBox.parent().find(".link-wrap").stop().slideUp(300);
      linkWrap.stop().slideDown(300);
      shopBox.addClass("is-open");
    }
  });

  // if($(window).width() <= 768){
  //   $(".sec-shop-link .shop-box").removeClass("is-open");
  //   $(".sec-shop-link .link-wrap").stop().slideUp(300);
  // }

  // 현재 페이지의 URL 가져오기
  var currentURL = window.location.href;
  var targetSection = $("#sec-membership");
  var offset = ($(window).width() >= 768) ? 200 : 100; // 창 너비에 따라 오프셋 값을 설정합니다.
  
  if (currentURL.includes("link=mem")) {
    setTimeout(function () {
      $("html, body").animate({ scrollTop: targetSection.offset().top - offset }, 500);
    }, 300);
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
