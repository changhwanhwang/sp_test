$(function () {
  var mainSortation = $("#sp-wrap");
  var hasPageSearch = mainSortation.hasClass("p-search");
  if (hasPageSearch == true) {
    $("body").css("overflow", "hidden");
    if ($(window).width() <= 768) {
      $(".header").css("border", "none");
    }
  }

  // aside 버튼 클릭시 clsoe/open (pc)
  var SearchPanel = $(".sec-panel");
  var btnSubPanelToggle = $(".panel__sub .btn-close");
  btnSubPanelToggle.on("click", function () {
    var href = $(this).parent("a").attr("href");

    if (href === "javascript:;") {
      SearchPanel.toggleClass("is-sub-open");
      if ($(window).width() <= 768) {
        $("#sp-wrap").removeClass("is-fixed");
      }
    }
  });

  $("#current-location-button").on("touchstart", function (event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var currentLocation = new naver.maps.LatLng(lat, lng);

        map.setCenter(currentLocation); // 현재 위치로 지도 이동
      });
    } else {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
    // Zoom 레벨 설정
    map.setZoom(19);
  });

  // 주소 클릭 시 카피 툴팁 오픈
  $(document).on("click", ".is-tooltip", function () {
    var $this = $(this);
    var activeHas = $this.hasClass("is-active");
    $(".is-tooltip, .tooltip").removeClass("is-active");
    if (!activeHas) {
      $this.addClass("is-active");
      $this.next().addClass("is-active");
    }
  });

  // 추천 섹션 스와이프
  var swiperRecommend = new Swiper(".recommend-swiper", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // loop: true,
  });

  // copy
  $(document).on("click", ".btn-copy", function () {
    var input = $(this).prev("input");
    var textToCopy = input.val();
    var copyType = input.data("copy-type");
    $(".is-tooltip").removeClass("is-active");
    $(".tooltip").removeClass("is-active");

    navigator.clipboard
      .writeText(textToCopy)
      .then(function () {
        var alertWrap = $(".alert-box");
        var alertContent = alertWrap.children().data("alert-content", "copy");
        alertWrap.addClass("js-active " + copyType);
        alertContent.addClass("js-active");
        setTimeout(function () {
          alertWrap.removeClass("js-active " + copyType);
          alertContent.removeClass("js-active");
        }, 3000);
      })
      .catch(function (error) {
        console.error("클립보드 복사 중 오류 발생: " + error);
      });
  });
  moduleTab("membership-tab");

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

  // // 인디케이터 엘리먼트를 찾습니다. 이 엘리먼트의 CSS 선택자를 사용합니다.
  // var indicator = document.querySelector(".loading-indicator");

  // // 인디케이터가 존재하는지 확인합니다.
  // if (indicator) {
  //   // 인디케이터가 화면에 나타날 때 작업을 수행합니다.
  //   indicator.addEventListener("animationstart", function () {
  //     $(".btn-panel-list").click(function () {
  //       var isDepth = $(".sec-panel").hasClass("ismo-open-depth2");
  //       if (isDepth) {
  //         $(".p-search .btn-panel-list").css("top", "300%");
  //         $(".p-search .btn-panel-map").css("bottom", "9.8rem");
  //         $(".p-search .alert-box").css("bottom", "14.6rem");
  //       } else {
  //       }
  //     });

  //     $(".btn-panel-map").click(function () {
  //       $(".p-search .btn-panel-list").css("top", "calc(100% - 9.7rem)");
  //     });
  //   });

  //   indicator.addEventListener("animationend", function () {
  //     $(".p-search .btn-panel-list").css("top", "calc(100% - 9.7rem)");
  //   });
  // }

  // // User-Agent 문자열을 소문자로 변경하여 비교
  // var kakaoBrowser = navigator.userAgent.indexOf("KAKAOTALK") !== -1;
  // var isDepth = $(".sec-panel").hasClass("ismo-open-depth2");

  // if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1 && kakaoBrowser) {
  //   $(".btn-panel-list").click(function () {
  //     if (isDepth) {
  //       $(".p-search .btn-panel-list").css("top", "300%");
  //     } else {
  //       $(".p-search .btn-panel-list").css("top", "-9.2rem");
  //     }
  //   });
  //   $(".btn-panel-map").click(function () {
  //     $(".p-search .btn-panel-list").css("top", "-9.2rem");
  //   });
  // } else if (kakaoBrowser) {
  //   $(".btn-panel-list").click(function () {
  //     if (isDepth) {
  //       $(".p-search .btn-panel-list").css("top", "300%");
  //     } else {
  //       $(".p-search .btn-panel-list").css("top", "-6rem");
  //     }
  //   });
  //   $(".btn-panel-map").click(function () {
  //     $(".p-search .btn-panel-list").css("top", "-6rem");
  //   });
  // }

  // // 아이폰 전용 코드 애플
  // if ($(window).width() < 768) {
  //   var agent = navigator.userAgent.toLowerCase();

  // if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1) {
  // }
  // }
});
