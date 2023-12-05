import { spData } from "./data.js";

// 지도 옵션 설정
var mapOptions = {
  center: new naver.maps.LatLng(37.5276642, 126.98798185), //지도 시작 지점
  zoom: 13,
};
if ($(window).width() <= 768) {
  // 지도 옵션 설정
  var mapOptions = {
    center: new naver.maps.LatLng(37.53093825, 127.01547635), //지도 시작 지점
    zoom: 12,
  };
}
var map = new naver.maps.Map("map-container", mapOptions);

var SearchPanel = $(".sec-panel");
var isClose = SearchPanel.hasClass("is-close");
var isSubOpen = SearchPanel.hasClass("is-sub-open");
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var mapWidth = windowWidth - 440;
var windowSubWidth = $(".panel-sub").width();
var mapSubWidth = mapWidth - windowSubWidth;

// 마커 및 정보창 표시
var markers = new Array(); // 마커 정보를 담는 배열
var infoWindows = new Array(); // 정보창을 담는 배열

// 마커 생성 함수
function createMarkers(data, map, infoWindows, SearchPanel, windowHeight) {
  // 기존 마커를 삭제합니다.
  if (markers) {
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
  }
  markers = []; // markers 배열 초기화

  // 기존 마커 정보 창을 닫습니다.
  infoWindows.forEach(function (infoWindow) {
    infoWindow.close();
  });

  // popupStyle 변수 정의
  var popupStyle = "display: flex; flex-direction: column; justify-content: center; gap: 0.8rem; width: auto; height: 3.8rem; padding: 1rem 1rem 1rem 1.4rem; color: #000;";

  function getOfficeData(markerCategory, data) {
    // 오피스 마커의 카테고리에 해당하는 데이터 필터링
    return data.filter(function (res) {
      return res.type === "office" && res.office === markerCategory;
    });
  }

  function getLoungeData(markerLocation, data) {
    // 라운지 마커의 위치에 해당하는 라운지 데이터 필터링
    return data.filter(function (res) {
      return res.type === "lounge" && res.lounge === markerLocation;
    });
  }

  data.forEach((res, index) => {
    var popupType, iconUrl, iconAlt, infoCont;

    if (res.type === "office") {
      popupType = "office-type-1";
      iconUrl = "office_maker";
      iconAlt = "오피스";
      if (res.office === "역삼점(본사)") {
        infoCont = `
        <div class="popup-map ${popupType} popup-office" style="${popupStyle}">
          <ul class="popup-list" style="pointer-events: none;">
            <li class="popup-title head-office">역삼점(본사)</li>
          </ul>
        </div>
        `;
      } else {
        infoCont = `
        <div class="popup-map ${popupType}" style="${popupStyle}">
          <ul class="popup-list popup-office">
            <li class="popup-title"><a href="${res.url}" target="_blank" data-office-open="${res.office}">${res.office}</a></li>
          </ul>
        </div>
        `;
      }
    } else if (res.type === "lounge") {
      if (res.isAlli !== "o") {
        popupType = "office-type-2";
        iconUrl = "lounge_maker";
        iconAlt = "라운지";
      } else {
        popupType = "office-type-3";
        iconUrl = "partner_maker";
        iconAlt = "제휴";
      }

      infoCont = `
      <div class="popup-map ${popupType}" style="${popupStyle}">
        <ul class="popup-list popup-lounge">
          <li class="popup-title"><a class="popup-sub-open" href="javascript:void(0);" data-lounge-open="${res.lounge}">${res.lounge}</a></li>
        </ul>
      </div>
      `;
    }

    var marker = new naver.maps.Marker({
      map: map,
      title: res.location,
      office: res.office,
      lounge: res.lounge,
      category: res.category,
      location: res.location,
      position: new naver.maps.LatLng(res.lat, res.lng),
      icon: {
        content: `<div class="custom-marker" data-lounge-open="${res.lounge}"><img src="../../assets/img/place/map/${iconUrl}.svg" alt="${iconAlt} 지점 마커"></div>`,
        size: new naver.maps.Size(44, 57),
        anchor: new naver.maps.Point(22, 33.5),
      },
    });

    markers.push(marker);

    var isPopupOpen = false;
    var isMouseOverEventAllowed = true;
    var isClickEventRunning = false;
    var filteredData = [];

    naver.maps.Event.addListener(marker, "mouseover", function () {
      if (isMouseOverEventAllowed && !isClickEventRunning) {
        isMouseOverEventAllowed = false;

        infoWindow.open(map, marker);
        $(".popup-map").parent().parent().addClass("popup-map-wrap");
        $(".popup-map").parent().siblings().hide();

        var officeLinks = document.querySelectorAll(".popup-office");
        var markerCategory = marker.office;
        var markerLocation = marker.lounge;

        // if (res.office === "역삼점(본사)") {
        //   $(".popup-office").hide();
        // }

        // 라운지 마커 팝업 클릭
        // .popup-sub-open 클래스가 있는 요소를 클릭했을 때 서브 패널 열기
        var loungeLinks = document.querySelectorAll(".popup-lounge");
        if (loungeLinks) {
          for (var i = 0; i < loungeLinks.length; i++) {
            loungeLinks[i].addEventListener("click", function () {
              var lounge = this.getAttribute("data-lounge-open");
              var markerCategory = this.getAttribute("data-office-open");

              if (lounge !== "") {
                map.setCenter(marker.getPosition());
                map.setZoom(19);
                resetSubPanel();
                $(".header").addClass("is-sub-open");
                var windowWidth = $(window).width();
                var mapWidth = windowWidth - $(".panel-main").width() - $(".panel-sub").width();
                subPanelOpen($(marker.icon.content));

                if (markerCategory) {
                  // 오피스 마커를 클릭한 경우
                  panelTitleActive("office");
                  subPanelClose();
                } else {
                  // 라운지 마커를 클릭한 경우
                  panelTitleActive("lounge");
                  SearchPanel.addClass("is-sub-open");
                  SearchPanel.removeClass("is-close");
                  $(".custom-zoom-controls").addClass("is-sub-open");
                  $(".panel-sub .button-wrap").addClass("is-sub-open");
                  map.setSize(new naver.maps.Size(mapWidth, windowHeight));
                }

                var filteredData = [];
                if (markerLocation) {
                  // 라운지 마커를 클릭한 경우 라운지 데이터 가져오기
                  filteredData = getLoungeData(markerLocation, data);
                } else if (markerCategory) {
                  // 오피스 마커를 클릭한 경우 오피스 데이터 가져오기
                  filteredData = getOfficeData(markerCategory, data);
                }

                // 패널에 데이터 출력
                panelList(filteredData);

                // li.main-item 요소 개수를 세기
                var mainItems = document.querySelectorAll("li.main-item");
                var itemCount = mainItems.length;

                // 숫자를 표시할 요소를 찾기
                var numberCountElement = document.querySelector(".number-count");

                // 숫자를 넣어주기
                numberCountElement.textContent = itemCount;

                // 웹 페이지가 로드된 후 Swiper 초기화
                setTimeout(function () {
                  initSwiper();
                }, 100); // 1000 밀리초(1초) 지연
                event.stopPropagation();
              }
            });
          }
        }

        if (officeLinks) {
          for (var i = 0; i < officeLinks.length; i++) {
            officeLinks[i].addEventListener("click", function () {
              map.setCenter(marker.getPosition());
              var office = this.getAttribute("data-office-open");

              if (office !== "") {
                subPanelOpen($(marker.icon.content));
                panelTitleActive("office");
                subPanelClose();

                if (markerLocation) {
                  // 라운지 마커를 클릭한 경우 라운지 데이터 가져오기
                  filteredData = getLoungeData(markerLocation, data);
                } else if (markerCategory) {
                  // 오피스 마커를 클릭한 경우 오피스 데이터 가져오기
                  filteredData = getOfficeData(markerCategory, data);
                }
                panelList(filteredData);
              }
              resizeMap();
              event.stopPropagation();
            });
          }
        }

        setTimeout(function () {
          isMouseOverEventAllowed = true;
        }, 50);
      }
    });

    function handleMarkerClick(marker, infoWindow, map, SearchPanel, windowHeight, data) {
      naver.maps.Event.addListener(marker, "click", function () {
        if ($(window).width() <= 768) {
          historyBack();
        }
        resetSubPanel();
        map.setCenter(marker.getPosition());

        // 데이터 추출
        var markerCategory = marker.office;
        var markerLocation = marker.lounge;
        // filteredData 배열 초기화

        if (markerLocation) {
          $(".header").addClass("is-sub-open");
          var windowWidth = $(window).width();
          var mapWidth = windowWidth - $(".panel-main").width() - $(".panel-sub").width();
          subPanelOpen($(marker.icon.content));
          // 라운지 마커를 클릭한 경우 라운지 데이터 가져오기
          panelTitleActive("lounge");
          SearchPanel.addClass("is-sub-open");
          SearchPanel.removeClass("is-close");
          $(".custom-zoom-controls").addClass("is-sub-open");
          $(".panel-sub .button-wrap").addClass("is-sub-open");
          map.setSize(new naver.maps.Size(mapWidth, windowHeight));
          filteredData = getLoungeData(markerLocation, data);
        } else if (markerCategory) {
          // 오피스 마커를 클릭한 경우 오피스 데이터 가져오기
          panelTitleActive("office");
          filteredData = getOfficeData(markerCategory, data);
        }

        panelList(filteredData);

        if (isPopupOpen) {
          infoWindow.close();
          isPopupOpen = false;
        } else {
          infoWindow.open(map, marker);
          isPopupOpen = true;

          $(".popup-map").parent().parent().addClass("popup-map-wrap");
          $(".popup-map").parent().siblings().hide();
        }

        // 라운지 마커 팝업 클릭
        // .popup-sub-open 클래스가 있는 요소를 클릭했을 때 서브 패널 열기
        var loungeLinks = document.querySelectorAll(".popup-lounge");
        if (loungeLinks) {
          for (var i = 0; i < loungeLinks.length; i++) {
            loungeLinks[i].addEventListener("click", function () {
              var lounge = this.getAttribute("data-lounge-open");
              var markerCategory = this.getAttribute("data-office-open");

              if (lounge !== "") {
                map.setCenter(marker.getPosition());
                map.setZoom(19);
                resetSubPanel();
                $(".header").addClass("is-sub-open");
                var windowWidth = $(window).width();
                var mapWidth = windowWidth - $(".panel-main").width() - $(".panel-sub").width();
                subPanelOpen($(marker.icon.content));

                if (markerCategory) {
                  // 오피스 마커를 클릭한 경우
                  panelTitleActive("office");
                  subPanelClose();
                } else {
                  // 라운지 마커를 클릭한 경우
                  panelTitleActive("lounge");
                  SearchPanel.addClass("is-sub-open");
                  SearchPanel.removeClass("is-close");
                  $(".custom-zoom-controls").addClass("is-sub-open");
                  $(".panel-sub .button-wrap").addClass("is-sub-open");
                  map.setSize(new naver.maps.Size(mapWidth, windowHeight));
                }

                var filteredData = [];
                if (markerLocation) {
                  // 라운지 마커를 클릭한 경우 라운지 데이터 가져오기
                  filteredData = getLoungeData(markerLocation, data);
                } else if (markerCategory) {
                  // 오피스 마커를 클릭한 경우 오피스 데이터 가져오기
                  filteredData = getOfficeData(markerCategory, data);
                }

                // 패널에 데이터 출력
                panelList(filteredData);

                // li.main-item 요소 개수를 세기
                var mainItems = document.querySelectorAll("li.main-item");
                var itemCount = mainItems.length;

                // 숫자를 표시할 요소를 찾기
                var numberCountElement = document.querySelector(".number-count");

                // 숫자를 넣어주기
                numberCountElement.textContent = itemCount;

                // 웹 페이지가 로드된 후 Swiper 초기화
                setTimeout(function () {
                  initSwiper();
                }, 100); // 1000 밀리초(1초) 지연
                event.stopPropagation();
              }
            });
          }
        }

        if ($(window).width() <= 768) {
          SearchPanel.removeClass("is-sub-open");
          resizeMobile();
        }

        // li.main-item 요소 개수를 세기
        var mainItems = document.querySelectorAll("li.main-item");
        var itemCount = mainItems.length;

        // 숫자를 표시할 요소를 찾기
        var numberCountElement = document.querySelector(".number-count");

        // 숫자를 넣어주기
        numberCountElement.textContent = itemCount;
        // 웹 페이지가 로드된 후 Swiper 초기화
        setTimeout(function () {
          initSwiper();
        }, 100); // 1000 밀리초(1초) 지연
        event.stopPropagation();
      });
      isClickEventRunning = false;
    }

    var infoWindow = new naver.maps.InfoWindow({
      content: infoCont,
    });

    infoWindows.push(infoWindow);

    handleMarkerClick(marker, infoWindow, map, SearchPanel, windowHeight, data);
  });

  // 마커들을 생성하고 난 후에 calculateCenter 함수를 호출하여 새로운 중심을 계산합니다.
  // var newCenter = calculateCenter(markers); // 변경된 부분
  // 지도를 새로운 중심으로 이동
  // map.panTo(newCenter); // 변경된 부분

  // 클러스터 1차 개발
  // // 클러스터 아이콘 설정
  // var clusterIcons = [
  //   {
  //     content: '<div class="cluster-icon">1</div>',
  //     size: new naver.maps.Size(48, 48),
  //     anchor: new naver.maps.Point(24, 24),
  //   },
  //   {
  //     content: '<div class="cluster-icon">2</div>',
  //     size: new naver.maps.Size(56, 56),
  //     anchor: new naver.maps.Point(28, 28),
  //   },
  //   {
  //     content: '<div class="cluster-icon">3</div>',
  //     size: new naver.maps.Size(66, 66),
  //     anchor: new naver.maps.Point(33, 33),
  //   },
  // ];

  // // 클러스터링 라이브러리 초기화
  // var clusterer = new MarkerClustering({
  //   minClusterSize: 2, // 클러스터를 생성하는 최소 마커 수
  //   maxZoom: 16, // 클러스터가 풀어지는 최대 줌 레벨
  //   map: map, // 지도 객체
  //   markers: markers, // 마커 배열
  //   disableClickZoom: false, // 클러스터를 클릭할 때 확대 기능 사용 여부
  //   gridSize: 120, // 클러스터링 그리드 크기
  //   icons: clusterIcons, // 클러스터 아이콘 설정
  //   indexGenerator: [10, 100, 1000, 10000], // 클러스터 아이콘 표시 인덱스
  // });

  // // 나머지 코드는 이전과 동일

  // // 클러스터 클릭 이벤트 처리
  // naver.maps.Event.addListener(clusterer, "clusterclick", function (e) {
  //   var clusterMarkers = e.getMarkers(); // 클러스터에 속한 마커들
  //   var bounds = e.getBounds(); // 클러스터 경계

  //   // 클러스터 내의 마커 정보 출력 또는 처리
  //   // 여기에 클러스터를 클릭했을 때의 동작을 추가합니다.
  //   // 예를 들어 클러스터 내의 마커를 나열하거나 확대하여 보여줄 수 있습니다.

  //   // 클러스터 경계로 지도 확대
  //   map.fitBounds(bounds);
  // });

  // // 클러스터링 적용
  // clusterer.setMap(map);

  return markers;
}

///// 지도 노출 /////
function mapInit(data) {
  console.log("mapInit 호출");
  // 확대 버튼 클릭 이벤트 핸들러
  $(document)
    .off("click", "#custom-zoom-in")
    .on("click", "#custom-zoom-in", function () {
      var currentZoom = map.getZoom();
      var targetZoom = currentZoom + 1;

      // 애니메이션 설정
      var zoomAnimationOptions = {
        zoom: targetZoom,
        duration: 500, // 애니메이션 지속 시간 (밀리초)
        easing: "easeInOutExpo", // 이징 함수 설정
      };

      map.setZoom(targetZoom, zoomAnimationOptions);
    });

  // 축소 버튼 클릭 이벤트 핸들러
  $(document)
    .off("click", "#custom-zoom-out")
    .on("click", "#custom-zoom-out", function () {
      var currentZoom = map.getZoom();
      var targetZoom = currentZoom - 1;

      // 애니메이션 설정
      var zoomAnimationOptions = {
        zoom: targetZoom,
        duration: 500, // 애니메이션 지속 시간 (밀리초)
        easing: "easeInOutExpo", // 이징 함수 설정
      };

      map.setZoom(targetZoom, zoomAnimationOptions);
    });

  // 현재위치 버튼
  var locationBtnHtml = '<button id="current-location-button" class="current-location-button">현재 위치로 이동</button>';

  naver.maps.Event.once(map, "init", function () {
    //customControl 객체 이용하기
    var customControl = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.TOP_RIGHT,
    });

    customControl.setMap(map);

    naver.maps.Event.addDOMListener(customControl.getElement(), "click", function () {
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
  });

  $(".btn-panel-toggle").on("click", function (event) {
    togglePanel($(SearchPanel), windowHeight);
  });

  $(window).resize(function () {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var mapWidth = windowWidth - 440;
    var asideContentIs = $(".sec-panel").hasClass("is-close");
    if (asideContentIs) {
      map.setSize(new naver.maps.Size(windowWidth, windowHeight));
    } else {
      map.setSize(new naver.maps.Size(mapWidth, windowHeight));
    }
    if ($(window).width() <= 768) {
      map.setSize(new naver.maps.Size(windowWidth, windowHeight));
    }
  });

  // 오피스 목록과 라운지 목록을 통합
  var setData;
  var receivedData = data;
  var totalData = spData.panelListOffice.concat(spData.panelListLounge);

  if (receivedData === "") {
    setData = totalData;
  } else {
    setData = receivedData;
  }

  // 기존 마커 삭제
  markers.forEach((el) => {
    el.setMap(null);
  });

  // 마커 및 정보창 생성
  markers = createMarkers(setData, map, infoWindows, SearchPanel, windowHeight);
}

// 메인 패널 리스트 바인딩
function panelList(data) {
  var $panelList = $("[data-panel-list]");
  $panelList.html("");
  data.forEach(function (res) {

    var linkTarget = res.lounge === "" ? res.url : "javascript:;";
    var trackClass = res.lounge === "" ? "track_b" : "track_spl_b";
    var targetBlank = res.lounge === "" ? "_blank" : "_self";
    var latLng = res.lat + ", " + res.lng;

    if (res.office === "역삼점(본사)") {
      linkTarget = "javascript:;";
      targetBlank = "_self";
    }

    var item = `
      <li class="main-item track_b"">
        <div class="item-content">
          <a href="${linkTarget}" target="${targetBlank}" class="js-center-marker ${trackClass}" data-${res.type}-open="${res.lounge}" data-placeid="${res.placeid}">
            <div class="img-box">
              <img src="${res.img}" alt="${res.alt}" class="title">
              <input type="hidden" value="${latLng}" />
            </div>
          </a>
          <div class="text-box">
            <a href="${linkTarget}" class="js-center-marker ${trackClass}" data-${res.type}-open="${res.lounge}" target="${targetBlank}">
              <h3 class="title">${res.lounge === "" ? res.office : res.lounge}</h3>
              <input type="hidden" value="${latLng}" />
            </a>
            <div class="address-box">
              <a href="javascript:;" class="address-text icon-arrow is-tooltip">${res.address}</a>
              <div class="tooltip">
                <span class="tooltip-tag">도로명</span>
                <p class="tooltip-text">${res.copyAddress}</p>
                <input type="hidden" value="${res.copyAddress}" data-copy-type="address">
                <button class="btn-copy">복사</button>
              </div>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="btn-heart">
          <div class="icon-heart"><span class="sr-only">좋아요</span></div>
          <div class="heart-count">${res.count}</div>
        </a>
      </li>
    `;

    $panelList.append(item);
  });

  $(".js-center-marker").on("click", function () {
    resetSubPanel();
    var latLng = $(this).find("input[type=hidden]").val().split(", ");
    var lat = parseFloat(latLng[0]);
    var lng = parseFloat(latLng[1]);

    map.setCenter(new naver.maps.LatLng(lat, lng));
    map.setZoom(19);
  });

  // // 인디케이터 엘리먼트를 찾습니다. 이 엘리먼트의 CSS 선택자를 사용합니다.
  // var indicator = document.querySelector(".loading-indicator");

  // // 인디케이터가 존재하는지 확인합니다.
  // if (indicator) {
  //   // 인디케이터가 화면에 나타날 때 작업을 수행합니다.
  //   indicator.addEventListener("animationstart", function () {
  //     // 아이폰 전용 코드 애플
  //     if ($(window).width() < 768) {
  //       $(".js-center-marker").on("click", function () {
  //         $(".p-search .panel-sub .button-wrap").css("height", "8.8rem");
  //         $(".p-search .panel-sub .button-buy").css("padding-bottom", "2.4rem");
  //       });
  //     }
  //   });

  //   indicator.addEventListener("animationend", function () {
  //     $(".p-search .panel-sub .button-wrap").css("height", "6.4rem");
  //     $(".p-search .panel-sub .button-buy").css("padding-bottom", "0");
  //   });
  // }

  // User-Agent 문자열을 소문자로 변경하여 비교

  // // 아이폰 전용 코드 애플
  // if ($(window).width() < 768) {
  //   // User-Agent 문자열을 소문자로 변경하여 비교
  //   var agent = navigator.userAgent.toLowerCase();
  //   var kakaoBrowser = navigator.userAgent.indexOf("KAKAOTALK") !== -1;

  //   if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1 && kakaoBrowser) {
  //     // 아이폰 전용 코드 애플
  //     $(".js-center-marker").on("click", function () {
  //       $(".p-search .panel-sub .button-wrap").css("height", "8.8rem");
  //       $(".p-search .panel-sub .button-buy").css("padding-bottom", "2.4rem");
  //     });
  //   }
  // }
}

///// 오피스/라운지 데이터 바인딩 /////
function dataInit(data) {
  // 오피스/라운지 카테고리 별 데이터 길이 노출
  $("[data-panel-count]").each(function () {
    var category = $(this).attr("data-panel-count");
    var data_length;
    if (category === "office") {
      data_length = spData.panelListOffice.length;
    }
    if (category === "lounge") {
      data_length = spData.panelListLounge.length;
    }
    $(this).text(data_length);
  });

  // 총 데이터 숫자 표시
  $("[data-panel-total").text(data.length);

  // 동일한 카테고리와 지역을 가지는 데이터 분류 (중복된 지역 카운트)
  var result = Object.values(
    data.reduce((a, { category, location }) => {
      var key = `${category}_${location}`;
      a[key] = a[key] || { category, location, count: 0 };
      a[key].count++;
      return a;
    }, {})
  );

  panelList(data);



  // 지역 선택 모바일 팝업 닫기
  $(document).on("click", ".zone-content .btn-close", function () {
    if ($(window).width() <= 768) {
      $("#sp-wrap").removeClass("is-fixed");
      $(".zone-select, .zone-content, .header").removeClass("is-select").css("z-index", "999");
    }
  });

  $(document).on("touchstart", ".zone-select", function () {
      console.log('touchstart 필터 클릭');

    if ($(window).width() <= 768) {
      $("#sp-wrap").addClass("is-fixed");
      $(".header").css("z-index", "99");
    }

    // "is-active" 클래스를 가진 요소의 data-panel-title 값을 확인
    var activeTitle = $(".main-title .title-box.is-active").attr("data-panel-title");

    // data-panel-title 값에 따라 클래스 설정
    var buttonClass = activeTitle === "office" ? "track_c" : "track_spl_c";

    // 버튼에 클래스 추가
    $("[data-panel-category] a.button-box").each(function () {
      $(this).removeClass("track_c track_spl_c").addClass(buttonClass);
    });

    // 모든 .category 요소를 선택
    var categories = document.querySelectorAll(".category");
    // 각 카테고리에 대한 처리
    categories.forEach(function (category) {
      var categoryButtons = category.querySelectorAll(".button-box[data-sort]"); // 현재 카테고리 내의 모든 data-sort 요소를 선택
      var allButton = category.querySelector(".button-box[data-sort-all]"); // 현재 카테고리 내의 "전체" 버튼을 선택
      // 만약 현재 카테고리 내의 data-sort 요소가 1개만 있다면
      if (categoryButtons.length === 1) {
        allButton.style.display = "none"; // "전체" 버튼을 숨김
      }
    });
  });

  // 지역 선택 모바일 팝업 닫기
  $(document).on("touchstart", ".zone-content .btn-close", function () {
    if ($(window).width() <= 768) {
      $("#sp-wrap").removeClass("is-fixed");
      $(".zone-select, .zone-content, .header").removeClass("is-select").css("z-index", "999");
    }
  });

  // 지역선택 클릭 시 노출되는 툴팁 데이터
  $("[data-panel-category]").each(function () {
    var category = $(this).attr("data-panel-category");
    var counter = 0;
    $(this).html("");
    result.forEach((res) => {
      if (res.category === category) {
        counter += res.count;
        $(this).append(`
        <a href="javascript:;" class="button-box" data-sort="${res.location}">
          <p class="txt">${res.location}</p>
          <p class="number">(<span class="count">${res.count}</span>)</p>
        </a>
        `);
      }
    });
    $(this).prepend(`
    <a href="javascript:;" class="button-box all" data-sort-all="${category}">
      <p class="txt">전체</p>
      <p class="number">(<span class="count">${counter}</span>)</p>
    </a>
    `);
  });

  var selectedMarkers = []; // 선택된 마커들을 저장할 배열

  // 툴팁 클릭 시 해당되는 데이터만 패널에 출력 및 지도에 마커 표시
  $(document)
    .off("click", "[data-sort-all], [data-sort]")
    .on("click", "[data-sort-all], [data-sort]", function () {
      if ($(window).width() <= 768) {
        historyBack();
      }
      subPanelClose();

      mapWidth = windowWidth - $(".panel-main").width();
      map.setSize(new naver.maps.Size(mapWidth, windowHeight));

      var sortCategory = $(this).attr("data-sort-all");
      var sortLocation = $(this).attr("data-sort");

      // filteredData 배열 초기화
      var filteredData = [];

      // 데이터 필터링
      if (sortCategory) {
        map.setZoom(15); // 원하는 줌 레벨로 설정

        if (sortCategory === "경기・기타") {
          map.setZoom(11);
        } else if (sortCategory === "강북") {
          map.setZoom(12);
        } else if (sortCategory === "강남") {
          map.setZoom(13);
        }

        filteredData = data.filter(function (res) {
          return res.category === sortCategory;
        });
      } else {
        map.setZoom(17); // 원하는 줌 레벨로 설정

        if (sortLocation === "선릉") {
          map.setZoom(16);
        } else if (sortLocation === "홍대") {
          map.setZoom(18);
        } else if (sortLocation === "용산" || sortLocation === "여의도") {
          map.setZoom(15);
        } else if (sortLocation === "삼성") {
          map.setZoom(15);
        } else if (sortLocation === "성수") {
          map.setZoom(15);
        } else if (sortLocation === "분당") {
          map.setZoom(15);
        }

        filteredData = data.filter(function (res) {
          return res.location === sortLocation;
        });
      }

      if ($(window).width() <= 768) {
        if (sortCategory === "경기・기타") {
          map.setZoom(9);
        } else if (sortLocation === "용산" || sortLocation === "여의도") {
          map.setZoom(13);
        } else if (sortLocation === "삼성") {
          map.setZoom(16);
        } else if (sortLocation === "성수") {
          map.setZoom(15);
        } else if (sortLocation === "분당") {
          map.setZoom(14);
        }
      }

      selectedMarkers = createMarkers(filteredData, map, infoWindows, SearchPanel, windowHeight);

      // 클릭 이벤트 핸들러에서 사용
      var newCenter = calculateCenter(selectedMarkers);
      // 지도를 새로운 중심으로 이동
      map.panTo(newCenter); // panTo 함수를 사용하여 지도를 새로운 중심으로 이동시킵니다.

      if (sortCategory === "경기") {
        map.setCenter(new naver.maps.LatLng(37.362988, 127.105072));
      }

      // 패널에 데이터 출력
      panelList(filteredData);
      hidePopup();
      resizeMap();

      $("#sp-wrap").removeClass("is-fixed");
      $(".zone-select, .zone-content, .header").removeClass("is-select").css("z-index", "");

      var countValue = parseInt($(this).find(".count").text()); // 클릭한 버튼의 .count 값을 가져옵니다.
      $(".number-count[data-panel-total]").text(countValue); // .number-count[data-panel-total]에 해당 값을 설정합니다.
    });

    console.log('dataInit 함수 호출');
}

$(function(){
  // 지역 선택 팝업 오픈
  $(".zone-select").on("click", function () {
    console.log('dataInit 호출 내에 필터 클릭');
    var currentURL = window.location.href;

    $(this).toggleClass("is-select").next().toggleClass("is-select");

    if ($(window).width() <= 768) {
      $("#sp-wrap").addClass("is-fixed");
      $(".header").css("z-index", "99");
    }

    // "is-active" 클래스를 가진 요소의 data-panel-title 값을 확인
    var activeTitle = $(".main-title .title-box.is-active").attr("data-panel-title");

    // data-panel-title 값에 따라 클래스 설정
    var buttonClass = activeTitle === "office" ? "track_c" : "track_spl_c";

    // 버튼에 클래스 추가
    $("[data-panel-category] a.button-box").each(function () {
      $(this).removeClass("track_c track_spl_c").addClass(buttonClass);
    });

    // 모든 .category 요소를 선택
    var categories = document.querySelectorAll(".category");
    // 각 카테고리에 대한 처리
    categories.forEach(function (category) {
      var categoryButtons = category.querySelectorAll(".button-box[data-sort]"); // 현재 카테고리 내의 모든 data-sort 요소를 선택
      var allButton = category.querySelector(".button-box[data-sort-all]"); // 현재 카테고리 내의 "전체" 버튼을 선택
      // 만약 현재 카테고리 내의 data-sort 요소가 1개만 있다면
      if (categoryButtons.length === 1) {
        allButton.style.display = "none"; // "전체" 버튼을 숨김
      }
    });

      // 현재 URL 가져오기
    var currentURL = window.location.href;
    // 라운지 지점 파라미터 값을 가지고 진입 했을 경우 url 초기화(라운지만)
    if (currentURL.indexOf('#lounge') !== -1) {
      // #lounge 이후의 값 제거
      var newURL = currentURL.split('#lounge')[0];
      
      // History API를 사용하여 URL 변경 (페이지 새로고침 없이)
      history.replaceState({}, document.title, newURL);
      $(".category_etc").show();
      $(".category_kyonggi").hide();
    }

  });
});

// 모든 호출되고 표시되는 마커들의 중심을 고려하여 새로운 중심 계산하는 함수
function calculateCenter(selectedMarkers) {
  var totalLat = 0;
  var totalLng = 0;

  // 호출되고 표시되는 마커들만 선택되도록 필터링
  var visibleMarkers = selectedMarkers.filter(function (marker) {
    return marker.getMap() !== null;
  });

  // 마커가 하나도 선택되지 않았을 경우 초기 지도 중심을 반환
  if (visibleMarkers.length === 0) {
    return map.getCenter();
  }

  visibleMarkers.forEach(function (marker) {
    var position = marker.getPosition();
    totalLat += parseFloat(position.lat());
    totalLng += parseFloat(position.lng());
  });

  var averageLat = totalLat / visibleMarkers.length;
  var averageLng = totalLng / visibleMarkers.length;

  return new naver.maps.LatLng(averageLat, averageLng);
}

// 초기 데이터를 보여주는 함수
function showInitialData() {
  var initialData = spData.panelListOffice;
  // mapInit(initialData);
  console.log('showInitialData 호출');
  // dataInit(initialData);
  // 초기 데이터를 활성화된 탭으로 표시
  $("[data-panel-title='office']").addClass("is-active");
  // 다른 탭의 is-active 클래스 제거
  $("[data-panel-title]").removeClass("is-active");
  resizeMap();

  // 지역 선택 팝업 오픈
  // $(".zone-select").on("click", function () {
  //   console.log('showInitialData 호출 내에 필터 클릭');
  //   $(this).toggleClass("is-select").next().toggleClass("is-select");

  //   if ($(window).width() <= 768) {
  //     $("#sp-wrap").addClass("is-fixed");
  //     $(".header").css("z-index", "99");
  //   }

  //   // "is-active" 클래스를 가진 요소의 data-panel-title 값을 확인
  //   var activeTitle = $(".main-title .title-box.is-active").attr("data-panel-title");

  //   // data-panel-title 값에 따라 클래스 설정
  //   var buttonClass = activeTitle === "office" ? "track_c" : "track_spl_c";

  //   // 버튼에 클래스 추가
  //   $("[data-panel-category] a.button-box").each(function () {
  //     $(this).removeClass("track_c track_spl_c").addClass(buttonClass);
  //   });

  //   // 모든 .category 요소를 선택
  //   var categories = document.querySelectorAll(".category");
  //   // 각 카테고리에 대한 처리
  //   categories.forEach(function (category) {
  //     var categoryButtons = category.querySelectorAll(".button-box[data-sort]"); // 현재 카테고리 내의 모든 data-sort 요소를 선택
  //     var allButton = category.querySelector(".button-box[data-sort-all]"); // 현재 카테고리 내의 "전체" 버튼을 선택
  //     // 만약 현재 카테고리 내의 data-sort 요소가 1개만 있다면
  //     if (categoryButtons.length === 1) {
  //       allButton.style.display = "none"; // "전체" 버튼을 숨김
  //     }
  //   });
  // });
}

// map 리사이징
function resizeMap(hasSubPanel) {
  var $map = $("#map-container");
  var windowWidth = $(window).width();
  var panelMainWidth = $(".panel-main").width();
  var panelSubWidth = hasSubPanel ? $(".panel-sub").width() : 0; // .is-sub-open 클래스가 있는 경우 panel-sub의 너비를 고려
  var mapWidth = windowWidth - panelMainWidth - panelSubWidth;

  if (hasSubPanel) {
    // .is-sub-open 클래스가 없는 경우
    var panelSubWidth = $(".panel-sub").width();
    mapWidth = windowWidth - panelMainWidth - panelSubWidth;
  } else {
    // .is-sub-open 클래스가 있는 경우
    mapWidth = windowWidth - panelMainWidth;
  }

  map.setSize(new naver.maps.Size(mapWidth, windowHeight));
  // 맵 리사이징에 필요한 추가 작업을 수행하세요
}

///// 최초 1회 실행 /////
mapInit(spData.panelListOffice);
dataInit(spData.panelListOffice);

// 마커 팝업 숨기는 함수
function hidePopup() {
  var popup = $(".popup-map-wrap");
  popup.hide();
}

// 서브패널 닫기 함수
function subPanelClose() {
  SearchPanel.removeClass("is-sub-open");
  $(".main-item .title").removeClass("active");
  $(".custom-zoom-controls, .panel-sub .button-wrap").removeClass("is-sub-open");
  if ($(window).width() <= 768) {
    $(".header").removeClass("is-sub-open");
  }
}

// 패널 열림여부에 따른 지도크기 리사이징
function togglePanel(SearchPanel, windowHeight) {
  var windowWidth = $(window).width();
  var mapWidth;

  if (SearchPanel.hasClass("is-sub-open")) {
    // 패널이 열려 있고 is-sub-open 클래스가 있는 경우
    subPanelClose();
    mapWidth = windowWidth - $(".panel-main").width();
  } else if (SearchPanel.hasClass("is-close")) {
    SearchPanel.removeClass("is-close");
    mapWidth = windowWidth - $(".panel-main").width();
  } else {
    SearchPanel.addClass("is-close");
    mapWidth = windowWidth;
  }

  map.setSize(new naver.maps.Size(mapWidth, windowHeight));
}

///// 오피스/라운지 탭메뉴 클릭 시 데이터 교체 /////
$(document)
  .off("click", "[data-panel-title]")
  .on("click", "[data-panel-title]", function (event) {
    // map.setZoom(12);

    $(".zone-content").removeClass("is-select");
    $(".zone-select").removeClass("is-select");

    var windowWidth = $(window).width();
    var mapWidth = windowWidth - $(".panel-main").width();

    // mapBtn(); // 모바일 지도 노출
    hidePopup(); // 팝업 닫기
    subPanelClose();
    // subPanelClose(); // 서브패널 닫기

    // 마커 클릭 이벤트 핸들러 함수 호출
    var $this = $(this);
    var panel_title = $(this).attr("data-panel-title");
    var data;
    if (panel_title === "office") {
      data = spData.panelListOffice;
      // console.log("오피스 필터링 노출");
      $(".category_kyonggi").show();
      $(".category_etc").hide();
    }
    if (panel_title === "lounge") {
      data = spData.panelListLounge;
      // console.log("라운지 필터링 노출");
      $(".category_etc").show();
      $(".category_kyonggi").hide();
    }

    showInitialData();
    mapInit(data);
    console.log('탭 클릭 시 이벤트 호출');
    dataInit(data);
    map.setSize(new naver.maps.Size(mapWidth, windowHeight));

    $this.addClass("is-active");
    // 추가로 이벤트 전파를 중단하여 다른 이벤트 핸들러에 영향을 미치지 않도록 합니다.
    event.stopPropagation();
    // 모바일 화면에서 resizeMobile 함수 실행
    if ($(window).width() <= 768) {
      resizeMobile();
    }
  });


var btnMapState = {
  isBtnMapOpen: false,
  mapState: null,
};

$(".btn-panel-list").click(function () {
  historyBack();
  mapBtn(); // 모바일 지도 노출
  subPanelClose(); // 서브패널 닫기
});

var originalState = null;

function mapBtn() {
  // 모바일 패널 버튼
  var recommend = $(".panel-recommend.mo-only");
  if ($(window).width() <= 768) {
    SearchPanel.addClass("ismo-open-depth2");
    var hasPanel = SearchPanel.hasClass("ismo-open-depth2");
    if (hasPanel) {
      recommend.css("display", "flex");
      $(".btn-panel-map").addClass("on");
    } else {
      recommend.css("display", "none");
      $(".btn-panel-map").removeClass("on");
    }
  }
  // SearchPanel.addClass("ismo-open-depth2");
  $(".btn-panel-map").click(function () {
    btnMapState.isBtnMapOpen = false;
    history.replaceState({}, document.title, location.pathname);

    $(".btn-panel-map").removeClass("on");
    recommend.css("display", "none");
    SearchPanel.removeClass("ismo-open-depth1");
    SearchPanel.removeClass("ismo-open-depth2");
    // btnCount = 0;
    resizeMobile();
  });
}

// 초기 HTML 구조 저장
var initialPanelHtml = $(".panel-sub").html();

// subPanelOpen() 함수 내에서 초기화 함수 호출
function resetSubPanel() {
  subPanelClose();
  // 초기 HTML 구조로 패널을 되돌림
  $(".panel-sub").html(initialPanelHtml);
}

var subPanel = false;
///// 라운지 서브패널 데이터 함수 /////
function subPanelOpen($clickedElement) {
  subPanel = true;
  // 라운지 데이터를 가지고 있을 때에만 작동
  if ($clickedElement.attr("data-lounge-open")) {
    var loungeName = $clickedElement.attr("data-lounge-open");

    // 라운지 데이터를 가지고 있을 때에만 작동
    if (loungeName !== "") {
      // var loungeData = spData.panelInfoLounge;

      // 라운지 데이터 리스트에서 동일한 역 이름을 가지고있는 라운지 정보 불러오기
      function findValue(arr, key) {
        return arr.find(function (o) {
          return o.title === key;
        });
      }
      var res = findValue(spData.panelInfoLounge, loungeName);

      $("[data-lounge]").each(function () {
        var loungeVal = $(this).attr("data-lounge");
        switch (loungeVal) {
          // 지점명
          case "title":
            $(this).text(res.title);
            break;

          // 복사하기 text
          case "copy":
            $(this).text(res.shareUrl);
            break;

          // 복사하기 input
          case "copyVal":
            $(this).val(res.shareUrl);
            break;

          // 슬라이드 이미지
          case "slides":
            var loungeSlides = ``;
            var $loungeSlidesArea = $(this).parents(".panel-swiper");
            if (res.infoSlide.length > 0) {
              res.infoSlide.forEach((res) => {
                loungeSlides += `
                  <div class="swiper-slide img-box">
                    <img src="${res.src}" alt="${res.alt}" />
                  </div>
                  `;
              });
              $(this).html(loungeSlides);
              $loungeSlidesArea.show();
            } else {
              $loungeSlidesArea.hide();
            }
            break;

          // 주소
          case "address":
            $(this).text(res.address);
            break;

          // 지하철 노선 정보
          case "subway":
            var loungeSubway = ``;
            var $loungeSubwayArea = $(this);
            if (res.subwayLine.length > 0) {
              res.subwayLine.forEach((res) => {
                if (!isNaN(parseFloat(res.text))) {
                  loungeSubway += `
                    <li class="subway-item ${res.class}">${res.text}</li>
                    `;
                } else {
                  loungeSubway += `
                  <li class="subway-item subway-square ${res.class}">${res.text}</li>
                  `;
                }
              });
              $(this).html(loungeSubway);
              $loungeSubwayArea.show();
            } else {
              $loungeSubwayArea.hide();
            }
            break;

          // 지점소개
          case "intro":
            var $loungeIntroArea = $(this).parents(".panel-intro");
            if (res.intro !== "") {
              $(this).html(res.intro);
              $loungeIntroArea.show();
            } else {
              $loungeIntroArea.hide();
            }
            break;

          // 라운지 시설
          case "facility":
            var loungeFacility = ``;
            var $loungeFacilityArea = $(this).parents(".panel-info");

            //!SECTION facility 항목의 내용을 배열에 저장
            var facilityItems = [
              { type: "monitor", label: "모니터데스크 시설사진", image: "../../assets/img/place/panel_sub/img_facility01.jpg", title: "모니터 데스크", desc: "예약 후 이용하는 <br />모니터 좌석" },
              { type: "openTable", label: "오픈테이블 시설사진", image: "../../assets/img/place/panel_sub/img_facility02.jpg", title: "오픈 테이블", desc: "캐주얼 업무를 위한 <br />오픈형 좌석" },
              { type: "boothTable", label: "부스테이블 시설사진", image: "../../assets/img/place/panel_sub/img_facility03.jpg", title: "부스 테이블", desc: "협업/집중을 위한 <br />부스형 좌석" },
              { type: "sofa", label: "소파 시설사진", image: "../../assets/img/place/panel_sub/img_facility04.jpg", title: "소파", desc: "잠깐의 휴식을 위한 소파" },
              { type: "smartWorkSofa", label: "스마트워크 소파 시설사진", image: "../../assets/img/place/panel_sub/img_facility05.jpg", title: "스마트워크 소파", desc: "휴식과 업무가 가능한 <br />기능성 소파" },
              { type: "barTable", label: "바 테이블 시설사진", image: "../../assets/img/place/panel_sub/img_facility06.jpg", title: "바 테이블", desc: "간단한 업무를 위한 <br />오픈형 좌석" },
              { type: "meetingRoom", label: "미팅룸 시설사진", image: "../../assets/img/place/panel_sub/img_facility07.jpg", title: "미팅룸", desc: "모니터/화상장비 제공" },
              { type: "OAzoon", label: "OA존 시설사진", image: "../../assets/img/place/panel_sub/img_facility08.jpg", title: "OA존", desc: "공용 복합기/사무용품 제공" },
              { type: "locker", label: "사물함 시설사진", image: "../../assets/img/place/panel_sub/img_facility09.jpg", title: "사물함", desc: "개인 물품 보관(선착순 신청)" },
              // 다른 facility 항목들도 필요한 만큼 추가
            ];

            var trueFacilityItems = facilityItems.filter(function (facilityItem) {
              return res.facility[facilityItem.type];
            });

            if (trueFacilityItems.length > 0) {
              trueFacilityItems.forEach(function (facilityItem, index) {
                if (index < 4) {
                  // 인덱스가 3 이하인 경우 (상위 4개 엘리먼트)
                  loungeFacility += `
                      <li class="item on"> <!-- "on" 클래스 추가 -->
                        <div class="img-box">
                          <img src="${facilityItem.image}" alt="${facilityItem.label}" />
                        </div>
                        <h4 class="info-title">${facilityItem.title}</h4>
                        <p class="info-desc">${facilityItem.desc}</p>
                      </li>
                    `;
                } else {
                  loungeFacility += `
                      <li class="item">
                        <div class="img-box">
                          <img src="${facilityItem.image}" alt="${facilityItem.label}" />
                        </div>
                        <h4 class="info-title">${facilityItem.title}</h4>
                        <p class="info-desc">${facilityItem.desc}</p>
                      </li>
                    `;
                }
              });
              $(this).html(loungeFacility);
              $loungeFacilityArea.show();
            } else {
              $loungeFacilityArea.hide();
            }
            break;

          // 더보기
          case "more":
            var $loungeFacilityArea = $(this).parents(".panel-info");
            var $facilityItems = $loungeFacilityArea.find(".item");
            var $loungeMoreBtn = $loungeFacilityArea.find(".see-more");

            // on 클래스가 붙지 않은 개수를 계산하여 더보기 버튼에 표시
            var remainingHiddenFacilityItems = $facilityItems.filter(":not(.on)").length;

            if (remainingHiddenFacilityItems > 0) {
              $loungeFacilityArea.find(".see-more-count").text(remainingHiddenFacilityItems);
              // 더 이상 숨겨진 컨텐츠가 있으면 더보기 버튼 보이기
              $loungeMoreBtn.show();
            } else {
              // 더 이상 숨겨진 컨텐츠가 없으면 더보기 버튼 숨기기
              $loungeMoreBtn.hide();
            }

            $loungeMoreBtn.on("click", function () {
              // 모든 li 엘리먼트에 "on" 클래스 추가
              $(this).prev().find("li.item").addClass("on");

              // see-more 버튼 숨기기
              $(this).hide();
            });

            break;

          // 이용 서비스
          case "service":
            var loungeService = ``;
            var $loungeServiceArea = $(this).parents(".panel-service");
            if (res.service.length > 0) {
              res.service.forEach((res) => {
                loungeService += `
                  <li class="item">
                    <div class="icon-box">
                      <div class="icon img-box">
                        <img src="${res.icon}" alt="${res.alt}" />
                      </div>
                    </div>
                    <p class="desc">${res.title}</p>
                  </li>
                  `;
              });
              $(this).html(loungeService);
              $loungeServiceArea.show();
            } else {
              $loungeServiceArea.hide();
            }
            break;

          // 라운지패스권 구매하기 URL
          case "purchase":
            break;

          // 디폴트
          default:
            break;
        }
      });
    }
  } else if ($clickedElement.hasClass("title")) {
    // 현재 클릭된 .title 요소에 대한 sub-panel 토글
    if ($clickedElement.hasClass("active")) {
      // 같은 .title을 클릭했을 때, sub-panel 닫기
      $clickedElement.parents(".item-content").find(".title").removeClass("active");

      subPanelClose();

      // .is-sub-open 클래스가 없는 경우 맵 너비를 조절
      resizeMap(false);
    } else {
      // 다른 .title을 클릭했을 때, 해당 .title의 sub-panel 열기
      $(".main-item .title.active").removeClass("active");
      $clickedElement.parents(".item-content").find(".title").addClass("active");
      SearchPanel.addClass("is-sub-open");
      $(".custom-zoom-controls, .panel-sub .button-wrap").addClass("is-sub-open");
      // .is-sub-open 클래스가 있는 경우 맵 너비를 조절
      resizeMap(true);
      if ($(window).width() <= 768) {
        $("#sp-wrap").addClass("is-fixed");
      }
    }

    // 스와이퍼 초기화
    initSwiper();

    // resizeMap() 호출
    // 이 부분에서 .is-sub-open 클래스의 유무를 전달하여 맵의 너비를 조절
    // .is-sub-open 클래스가 있으면 true, 없으면 false 전달
    resizeMap($clickedElement.hasClass("active"));
  }
}

// 클릭 이벤트 핸들러에서 사용할 함수
function loungeClicked() {
  // 모바일에서는 서브패널이 팝업형태라 header의 z-index값을 변경해야함
  if ($(window).width() <= 768) {
    historyBack();
    $(".header").addClass("is-sub-open");
  }
  var $clickedElement = $(this);
  subPanelOpen($clickedElement);

  if ($("a.js-center-marker[data-office-open='']").length) {
    subPanelClose();
    resizeMap();
  }

  // li.main-item 요소 개수를 세기
  var mainItems = document.querySelectorAll("li.main-item");
  var itemCount = mainItems.length;

  // 숫자를 표시할 요소를 찾기
  var numberCountElement = document.querySelector(".number-count");

  // 숫자를 넣어주기
  numberCountElement.textContent = itemCount;

  // 웹 페이지가 로드된 후 Swiper 초기화
  setTimeout(function () {
    initSwiper();
  }, 100); // 1000 밀리초(1초) 지연
}

// 클릭 이벤트 핸들러
$(document).on("click", "[data-lounge-open], .main-item .title", loungeClicked);

// 모바일 화면에서만 map의 너비와 높이를 window 크기에 맞게 조절하는 함수
function resizeMobile() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  // .panel-main 요소가 화면에 보이는 부분의 높이를 계산
  var panelMainVisibleHeight = windowHeight;

  // 지도의 크기를 조절
  map.setSize(new naver.maps.Size(windowWidth, panelMainVisibleHeight));
}

// 스와이퍼
var swiper = new Swiper(".panel-swiper", {
  slidesPerView: 1,
  watchOverflow: true,
  loop: jQuery(".panel-swiper .swiper-slide").length != 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    // 768px 이하일 때
    768: {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});
// 스와이퍼 초기화 함수
function initSwiper() {
  // 기존 스와이퍼 파괴
  if (swiper) {
    swiper.destroy(true, true);
    swiper = null;
  }

  swiper = new Swiper(".panel-swiper", {
    slidesPerView: 1,
    watchOverflow: true,
    loop: jQuery(".panel-swiper .swiper-slide").length != 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      // 768px 이하일 때
      768: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });
  if (jQuery(".panel-swiper .swiper-slide").length > 1) {
    $(".p-search .panel-sub .panel-swiper").css("pointer-events", "auto");
  } else {
    $(".p-search .panel-sub .panel-swiper").css("pointer-events", "none");
  }
}

function historyBack() {
  history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    resizeMobile();
    if (SearchPanel.hasClass("ismo-open-depth2") && SearchPanel.hasClass("is-sub-open")) {
      SearchPanel.removeClass("is-sub-open");
    } else if (SearchPanel.hasClass("ismo-open-depth2") && !SearchPanel.hasClass("is-sub-open")) {
      SearchPanel.removeClass("ismo-open-depth2");
    } else if (!SearchPanel.hasClass("ismo-open-depth2") && SearchPanel.hasClass("is-sub-open")) {
      SearchPanel.removeClass("is-sub-open");
    } else {
      history.back();
    }
  };
}

// 패널 타이틀 active 함수
function panelTitleActive(type) {
  $("[data-panel-title]").removeClass("is-active");
  $('.main-title [data-panel-title="' + type + '"]').addClass("is-active");
}

$(function(){
  // 파라미터값으로 라운지 서브패널 오픈기능 함수
  urlParamActive();
});

// 파라미터값으로 라운지 서브패널 오픈기능 함수
function urlParamActive() {
  var data = spData.panelListLounge;
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
  var currentHash = window.location.hash;

  // URL에서 현재 해시 값을 가져옵니다.
  if (currentHash === "#lounge") {
    // 해당 탭을 활성화합니다.
    panelTitleActive("lounge");
    setTimeout(function () {
      // dataInit(data);
      mapInit(data);
    }, 300);
    $(".current-location-button").css("box-shadow", "0.2rem 0.2rem 0.6rem 0 rgba(0,0,0,.06)");

    $(".btn-panel-toggle").on("click", function (event) {
      togglePanel($(SearchPanel), windowHeight);
    });
  }

  // 라운지 패널 오픈 url로 이동 파라미터 구분
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function paramActivePc() {
    var windowWidth = $(window).width();
    var mapWidth = windowWidth - $(".panel-main").width() - $(".panel-sub").width();
    $(".custom-zoom-controls, .panel-sub .button-wrap").addClass("is-sub-open");
    map.setSize(new naver.maps.Size(mapWidth, windowHeight));
    $(".current-location-button").css("box-shadow", "0.2rem 0.2rem 0.6rem 0 rgba(0,0,0,.06)");
    $(".btn-panel-toggle").on("click", function (event) {
      togglePanel($(SearchPanel), windowHeight);
    });
  }

  function paramActiveMo() {
    $(".sec-panel, .p-search, .p-search .panel-sub .button-wrap").addClass("is-sub-open");
    $(".current-location-button").css("box-shadow", "0.2rem 0.2rem 0.6rem 0 rgba(0,0,0,.06)");
    resizeMobile();
  }

  var paramValue = getParameterByName("placeid");

  if (paramValue) {
    mapBtn();
    dataInit(data);
    panelTitleActive("lounge");
    setTimeout(function () {
      $("[data-placeid='" + paramValue + "']").trigger("click");
      $(".sec-panel").addClass("is-sub-open");
      if (!isMobile) {
        paramActivePc();
        console.log('paramActivePc 호출');
      } else {
        paramActiveMo();
        console.log('paramActiveMO 호출');
      }
    }, 300);
    mapInit(data);

  } else {
    console.log("URL에서 매개변수를 찾을 수 없습니다.");
  }
}

// 서브패널 닫기 버튼 클릭 시
$(document).on("click", ".panel-sub .btn-close", function () {
  subPanelClose();

  var windowWidth = $(window).width();

  if (windowWidth <= 768) {
    resizeMap(false, true);
    resizeMobile();
  } else {
    resizeMap(false, false);
  }

});
