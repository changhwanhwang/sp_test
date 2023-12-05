document.addEventListener("DOMContentLoaded", function () {
  
  // 프로모션 월 자동으로 변경되게
  const now = new Date();
  const mon = now.getMonth() + 1;  
  const monText = $(".mon").html(mon);

  function updateDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = new Date(year, month, 0).getDate(); // 해당 월의 마지막 일자 계산
  
    $('.promotion-box .auto-date').text(month + ".01-" + month + "." + day);
  }
  
  // 페이지 로드 시 날짜 업데이트
  updateDate();
  
  // sec-space tabmenu
  moduleTab("space-tab");

  maxWidth1920("p-detail");

  // header 스크롤 애니메이션
  headerScroll($(".sec-concierge").offset().top, $(".sec-poster .link-box").outerHeight(true));

  // 프로모션 섹션 롤링(#sp-wrap 안에 promtion-box class가 있으면 실행)
  var spWrap = $("#sp-wrap").children().hasClass("promotion-box");
  if (spWrap) {
    // 롤링 이벤트
    if ($(window).width() <= 768) {
      rolling(".promotion-box", "left", 20000, true);
    } else {
      rolling(".promotion-box", "left", 40000, true);
    }
  }

  // 프로모션 섹션 버튼 클릭 시 해당 섹션으로 이동 버튼
  $(".btn-promotion").click(function (event) {
    event.preventDefault();
    var targetSection = $(this.hash);
    $("html, body").animate(
      {
        scrollTop: targetSection.offset().top,
      },
      500
    );
  });

  // 리스트 더보기
  masonry();

  // 이미지 슬라이더 초기화
  const swiperSpace = new Swiper(".slide-box", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    disableOnInteraction: false,
    centeredSlides: false,
    slidesPerView: 1,
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  swiperSpace.on("slideChange", function () {
    swiperSpace.autoplay.start();
  });

  // if($(window).width() <= 768){
  //   var tabWrap = $(".sec-space .list-button");
  //   var tabButtonWidth = tabWrap.find("a").outerWidth();
  //   var tabButtonidx = tabWrap.find("a").length + 1;
  //   console.log(tabButtonWidth);
  //   var autoWidth = tabButtonWidth * tabButtonidx;
  //   tabWrap.css("width", autoWidth);
  // }

  if ($(window).width() <= 768) {
    const tabButtonSwiper = new Swiper(".tab-button-swiper", {
      slidesPerView: "auto",
      spaceBetween: 6,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    });
  }
  // 도면 이미지 스크롤 가운데정렬
  alignCenter();

  // 창 크기가 변경될 때도 실행
  $(window).resize(alignCenter);

  // 탭 메뉴 link 클릭 시 실행
  $(".link").click(function () {
    $(this).addClass("js-active");
    alignCenter();
  });

  function alignCenter() {
    var activeTab = $(".link.js-active");

    if (activeTab.length > 0) {
      $(".list-contents .img-box-map").each(function () {
        var scrollContainer = $(this);
        var img = scrollContainer.find("img");

        // 이미지와 스크롤 컨테이너를 가운데 정렬
        var containerWidth = scrollContainer.width();

        // 이미지를 가운데로 정렬
        var marginLeft = (containerWidth - img.width()) / 2;
        img.css("margin", "0 !important"); // 모든 마진을 제거
        img.css("margin-left", marginLeft + "px !important");

        // 스크롤을 가운데로 이동
        var scrollLeft = (img.width() - containerWidth) / 2;
        scrollContainer.scrollLeft(scrollLeft);
      });
    }
  }
});

// 리스트 더보기
function masonry() {
  $(".sec-review .review-list").masonry({
    itemSelector: ".sec-review .review-item",
    columnWidth: ".grid-sizer",
    gutter: ".gutter-sizer",
    percentPosition: true,
  });
}

// 리뷰 더보기 닫기 버튼
function listMore() {
  var review = $(".sec-review button");
  review.toggleClass("is-open");
  var hasOpen = review.hasClass("is-open");
  if (hasOpen == true) {
    review.text("닫기");
    $(".review-item").css("display", "block");
    $(".review-list").addClass("is-open");
    review.addClass("is-open");
    if ($(window).width() <= 768) {
      $(".sec-review").css("margin-bottom", "12rem");
    } else {
      $(".sec-review").css("margin-bottom", "16rem");
    }
  } else {
    review.text("더보기");
    $(".review-item:nth-child(n+11)").css("display", "none");
    $(".review-list").removeClass("is-open");
    if ($(window).width() <= 768) {
      $(".sec-review").css("margin-bottom", "0rem");
    } else {
      $(".sec-review").css("margin-bottom", "5rem");
    }
  }
  masonry();
}
$(document).ready(function () {
  var header = $("header");
  var spWrap = $("#sp-wrap");

  function setSpWrapMargin() {
    var promotionHeight = $(".promotion-box").innerHeight();
    var windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      header.css("margin-top", "0");
      spWrap.css("margin-top", "");
    } else {
      header.css("margin-top", promotionHeight + "px");
      spWrap.css("margin-top", "0");
    }
  }

  setSpWrapMargin();

  $(window).on("scroll", function () {
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition > header.outerHeight()) {
      header.css("margin-top", "0");
    } else {
      setSpWrapMargin();
    }
  });

  $(window).on("resize", setSpWrapMargin);
});
