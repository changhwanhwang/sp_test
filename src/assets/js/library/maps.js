"use strict";

// 데이터
var spData = {
  // 오피스 목록
  panelListOffice: [
    { type: "office", office: "강남1호점", lounge: "", category: "강남", location: "강남", lat: "37.4959854", lng: "127.0664091", address: "서초구 강남대로 327-12", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 111111, isAlli: "" },
    { type: "office", office: "강남2호점", lounge: "", category: "강남", location: "강남", lat: "37.5492077", lng: "127.1464824", address: "서초구 강남대로 327-12", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 111111, isAlli: "" },
    { type: "office", office: "강남3호점", lounge: "", category: "강남", location: "강남", lat: "37.6469954", lng: "127.0147158", address: "서초구 강남대로 327-12", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 111111, isAlli: "" },
    { type: "office", office: "살롱 드 여의도점", lounge: "", category: "강북", location: "광진", lat: "37.5574120", lng: "127.0796211", address: "서초구 강남대로 327", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "o" },
    { type: "office", office: "상호 을지로점", lounge: "", category: "강북", location: "을지로", lat: "37.4600969", lng: "126.9001546", address: "서초구 강남대로 327", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "o" },
    { type: "office", office: "상호 안양점", lounge: "", category: "경기", location: "안양", lat: "37.6658609", lng: "127.0317674", address: "서초구 강남대로 327", url: "#", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "o" },
  ],
  // 라운지 목록
  panelListLounge: [
    { type: "lounge", office: "관악점", lounge: "관악역", category: "관악", location: "강남", lat: "37.6176125", lng: "126.9227004", address: "서초구 강남대로 327", url: "javascript:;", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "" },
    { type: "lounge", office: "관악점", lounge: "관악역", category: "관악", location: "강북", lat: "37.5990998", lng: "126.9861493", address: "서초구 강남대로 327", url: "javascript:;", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "" },
    { type: "lounge", office: "광진점", lounge: "강변역", category: "광진", location: "경기", lat: "37.5506753", lng: "127.0409622", address: "서초구 강남대로 327", url: "javascript:;", img: "http://placehold.it/80x80", alt: "지점 이미지", count: 123456, isAlli: "o" },
  ],
  // 라운지 서브패널 정보
  panelInfoLounge: [
    {
      title: "역삼역",
      shareUrl: "",
      infoSlide: ["./경로/이름1.png", "./경로/이름2.png", "./경로/이름3.png", "./경로/이름4.png", "./경로/이름5.png"],
      subwayLine: ["2", "9"],
      loungeIntro: "지점소개",
      facility: [
        { image: "./경로/이미지.png", title: "모니터 데스크", desc: "예약 후 이용하는 모니터 좌석" },
        { image: "./경로/이미지.png", title: "오픈 테이블", desc: "캐주얼 업무를 위한 오픈형 좌석" },
        { image: "./경로/이미지.png", title: "부스 테이블", desc: "협업/집중을 위한 부스형 좌석" },
        { image: "./경로/이미지.png", title: "소파", desc: "잠깐의 휴식을 위한 소파" },
        { image: "./경로/이미지.png", title: "스마트워크 소파", desc: "휴식과 업무가 가능한 기능성 소파" },
        { image: "./경로/이미지.png", title: "바 테이블", desc: "간단한 업무를 위한 오픈형 좌석" },
        { image: "./경로/이미지.png", title: "미팅룸", desc: "모니터/화상장비 제공" },
        { image: "./경로/이미지.png", title: "OA존", desc: "공용 복합기/사무용품 제공" },
        { image: "./경로/이미지.png", title: "사물함", desc: "개인 물품 보관(선착순 신청)" },
      ],
      service: [
        { icon: "./경로/이미지.svg", title: "무제한 커피" },
        { icon: "./경로/이미지.svg", title: "복합기" },
        { icon: "./경로/이미지.svg", title: "냉난방" },
        { icon: "./경로/이미지.svg", title: "와이파이" },
      ],
      passUrl: "#구매url",
    },
  ],
};

// 지도 노출
function mapInit() {
  var total_data = spData.panelListOffice.concat(spData.panelListLounge);

  // 지도 옵션 설정
  var mapOptions = {
    center: new naver.maps.LatLng(37.552758094502494, 126.98732600494576), //지도 시작 지점
    zoom: 11,
  };
  var map = new naver.maps.Map("map-container", mapOptions);

  let areaArr = new Array(); // 지역을 담는 배열 ( 지역명/위도경도 )

  // 오피스 데이터를 areaArr에 추가
  spData.panelListOffice.forEach(function (officeData) {
    const locationInfo = {
      location: officeData.location,
      lat: officeData.lat,
      lng: officeData.lng,
      category: officeData.type,
      office: "오피스", // 여기에 오피스에 대한 추가 정보를 입력
    };

    // isAlli 값이 "o"인 경우 alliance: "제휴"를 추가
    if (officeData.isAlli === "o") {
      locationInfo.alliance = "제휴";
    }

    areaArr.push(locationInfo);
  });

  // 라운지 데이터를 areaArr에 추가
  spData.panelListLounge.forEach(function (loungeData) {
    const locationInfo = {
      location: loungeData.location,
      lat: loungeData.lat,
      lng: loungeData.lng,
      category: loungeData.type,
      office: "오피스", // 여기에 오피스에 대한 추가 정보를 입력
      lounge: "라운지", // 여기에 라운지에 대한 추가 정보를 입력
    };

    // isAlli 값이 "o"인 경우 alliance: "제휴"를 추가
    if (loungeData.isAlli === "o") {
      locationInfo.alliance = "제휴";
    }

    areaArr.push(locationInfo);
  });

  // 확대 버튼 클릭 이벤트 핸들러
  document.getElementById("custom-zoom-in").addEventListener("click", function () {
    var currentZoom = map.getZoom();
    var targetZoom = currentZoom + 1;

    // 애니메이션 설정
    var zoomAnimationOptions = {
      zoom: targetZoom,
      duration: 500, // 애니메이션 지속 시간 (밀리초)
      easing: "easeInOutExpo", // jQuery UI의 이징 함수 사용 // 이징 함수 설정
    };

    map.setZoom(targetZoom, zoomAnimationOptions);
  });

  // 축소 버튼 클릭 이벤트 핸들러
  document.getElementById("custom-zoom-out").addEventListener("click", function () {
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
      map.setCenter(new naver.maps.LatLng(37.3595953, 127.1053971));
    });

    //Map 객체의 controls 활용하기
    var $locationBtn = $(locationBtnHtml),
      locationBtnEl = $locationBtn[0];

    naver.maps.Event.addDOMListener(locationBtnEl, "click", function () {
      map.setCenter(new naver.maps.LatLng(37.3595953, 127.1553971));
    });
  });

  // 패널 열림여부에 따른 지도크기 리사이징
  $(".btn-panel-toggle").on("click", function () {
    var asideContentIs = $(".sec-panel").hasClass("is-close");
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var mapWidth = windowWidth - 440;
    if (asideContentIs) {
      // 패널을 닫았을때
      map.setSize(new naver.maps.Size(mapWidth, windowHeight));
    } else {
      // 패널을 열었을때
      map.setSize(new naver.maps.Size(windowWidth, windowHeight));
    }
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

  // 마커 및 정보창 표시
  var markers = new Array(); // 마커 정보를 담는 배열
  var infoWindows = new Array(); // 정보창을 담는 배열

  total_data.forEach((res) => {
    // 정보창 생성
    var popupStyle = "min-width: 16rem; width: auto; padding: 1.6rem;";
    var popupType, infoName, iconUrl, iconAlt, infoCont;

    if (res.type === "office") {
      if (res.isAlli !== "o") {
        popupType = "office-type-1";
        iconUrl = "office_maker1";
        infoName = "오피스";
      } else {
        popupType = "office-type-3";
        iconUrl = "partner_maker";
        infoName = "제휴";
      }
      iconAlt = "오피스";
      infoCont = `
      <div class="popup-map ${popupType}" style="${popupStyle}">
        <dl class="popup-list">
          <dt class="popup-type">${infoName}</dt>
          <dd class="popup-title">${res.office}</dd>
        </dl>
      </div>
      `;
    }
    if (res.type === "lounge") {
      popupType = "office-type-2";
      iconUrl = "office_maker2";
      iconAlt = "오피스/라운지";
      infoCont = `
      <div class="popup-map ${popupType}" style="${popupStyle}">
        <dl class="popup-list">
          <dt class="popup-type">오피스</dt>
          <dd class="popup-title"><a href="${res.url}">${res.office}</a></dd>
        </dl>
        <dl class="popup-list popup-lounge">
          <dt class="popup-type">라운지</dt>
          <dd class="popup-title"><a href="javascript:;" onclick="openPanel(this)">${res.lounge}</a></dd>
        </dl>
      </div>
      `;
    }

    // function mouseOverHandler(seq) {
    //   return function (e) {
    //     // 마커를 클릭하는 부분
    //     var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
    //       infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

    //     if (infoWindow.getMap()) {
    //       infoWindow.close();
    //     } else {
    //       infoWindow.open(map, marker); // 표출
    //     }
    //   };
    // }

    // function getClickHandler(seq) {
    //   alert();
    //   return function (e) {
    //     // 마커를 클릭하는 부분
    //     var marker = markers[seq]; // 클릭한 마커의 시퀀스로 찾는다.
    //     var infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

    //     if (infoWindow.getMap()) {
    //       infoWindow.close();
    //     } else {
    //       infoWindow.open(map, marker); // 표출
    //     }
    //   };
    // }

    // 마커 생성
    var marker = new naver.maps.Marker({
      map: map,
      title: res.location, // 지역구 이름
      position: new naver.maps.LatLng(res.lat, res.lng), // 지역구의 위도 경도 넣기
      icon: {
        content: '<div class="custom-marker"><img src="../../assets/img/place/map/' + iconUrl + '.png" alt="' + iconAlt + ' 지점 마커"></div>',
        size: new naver.maps.Size(44, 67), // 마커 이미지의 크기
        anchor: new naver.maps.Point(22, 33.5), // 마커 이미지의 앵커 지점
      },
    });

    // 정보창 생성
    var infoWindow = new naver.maps.InfoWindow({
      content: infoCont, // 해당 카테고리에 대한 팝업 컨텐츠 설정
    }); // 클릭했을 때 띄워줄 정보 HTML 작성

    markers.push(marker);
    infoWindows.push(infoWindow);
  });

  for (var i = 0, makerLength = markers.length; i < makerLength; i++) {
    // IIFE (즉시 호출 함수 표현식)를 사용하여 'i'의 현재 값을 캡처합니다.
    (function (seq) {
      naver.maps.Event.addListener(markers[seq], "click", function () {
        var marker = markers[seq];
        var infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
          $(".popup-map").parent().parent().addClass("popup-map-wrap");
          $(".popup-map").parent().siblings().hide();
        }
      });
    })(i); // 'i'의 현재 값을 IIFE에 전달합니다.
  }
}

// 데이터 바인딩
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

  // 지역선택 클릭 시 노출되는 툴팁 데이터
  $("[data-panel-category]").each(function () {
    var category = $(this).attr("data-panel-category");
    var counter = 0;
    $(this).html("");
    result.forEach((res) => {
      if (res.category === category) {
        counter += res.count;
        $(this).append(`
        <a href="javascript:;" class="button-box">
          <p class="txt">${res.location}</p>
          <p class="number">(<span class="count">${res.count}</span>)</p>
        </a>
        `);
      }
    });
    // 전체 (n)
    $(this).prepend(`
    <a href="javascript:;" class="button-box all">
      <p class="txt">전체</p>
      <p class="number">(<span class="count">${counter}</span>)</p>
    </a>
    `);
  });

  // 메인 패널 리스트 바인딩
  var $panelList = $("[data-panel-list]");
  $panelList.html("");
  data.forEach((res) => {
    $panelList.append(`
    <li class="main-item">
      <div class="item-content">
        <div class="img-box">
          <img src="${res.img}" alt="${res.alt}">
        </div>
        <div class="text-box">
          <a href="${res.url}"><h3 class="title">${res.office}</h3></a>
          <div class="address-box">
            <a href="javascript:;" class="address-text is-tooltip">${res.address}</a>
            <div class="tooltip">
                <span class="tooltip-tag">도로명</span>
                <p class="tooltip-text">${res.address}</p>
                <button class="btn-copy" onclick="moduleCopy();">복사</button>
                <input type="hidden" value="${res.address}">
            </div>
          </div>
        </div>
      </div>
      <a href="javascript:;" class="btn-heart">
        <div class="icon-heart"><span class="sr-only">좋아요</span></div>
        <div class="heart-count">${res.count}</div>
      </a>
    </li>
    `);
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
        <a href="javascript:;" class="button-box">
          <p class="txt">${res.location}</p>
          <p class="number">(<span class="count">${res.count}</span>)</p>
        </a>
        `);
      }
    });
    $(this).prepend(`
    <a href="javascript:;" class="button-box all">
      <p class="txt">전체</p>
      <p class="number">(<span class="count">${counter}</span>)</p>
    </a>
    `);
  });
}

// 최초 1회 실행
mapInit();
dataInit(spData.panelListOffice);

// 오피스/라운지 탭메뉴 클릭 시 데이터 교체
$(document).on("click", "[data-panel-title]", function () {
  var $this = $(this);
  $("[data-panel-title]").removeClass("is-active");
  $this.addClass("is-active");
  var panel_title = $(this).attr("data-panel-title");
  var data;
  if (panel_title === "office") {
    data = spData.panelListOffice;
  }
  if (panel_title === "lounge") {
    data = spData.panelListLounge;
  }
  dataInit(data);
});

// search.js 에서 패널 여는 기능과 동일
function openPanel(el) {
  $(".sec-panel").toggleClass("is-sub-open");
  if ($(window).width() <= 768) {
    $("#sp-wrap").addClass("is-fixed");
  }
}
