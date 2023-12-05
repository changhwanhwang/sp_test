$(function () {
  // var checkHas = true;
  // var checkName = RegExp(/^[가-힣]|[A-Z]|[a-z]|[0-9]$/);
  var checkPhone = RegExp(/^[0-9]*$/);
  var checkEmail1 = RegExp(/^[0-9a-zA-Z]|([-_\.]?[0-9a-zA-Z])$/);
  var checkEmail2 = RegExp(/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/);
  var pattern = /^[가-힣a-zA-Z0-9\s]+$/;
  var pattern2 = /^[가-힣]+$/;
  var checkpattern = /^[a-zA-Z0-9]+$/;

  // form 태그 내 셀렉트 박스
  $(".btn-select").click(function () {
    var $this = $(this);
    $this.parent().toggleClass("js-active");
  });

  $(".select-item a").click(function () {
    var $this = $(this);
    var value = $this.attr("value");
    var emailInput = $this.parents(".select-wrap").siblings('input[name="user-email-last"]');
    var emailInputFirst = $this.parents(".select-wrap").siblings('input[name="user-email-first"]');
    // console.log($this.attr('class'));

    // 셀렉트 선택값을 input value에 넣기
    emailInput.val(value);

    $this.parents(".select-wrap").removeClass("js-active");
    if (value == "") {
      emailInput.attr("disabled", false);
      $this.parents(".item-wrap").addClass("is-error");
      $this.parents(".form-item").addClass("is-error");
      emailInput.focus();
    } else {
      emailInput.attr("disabled", false);
    }
    if (emailInput.val == "naver.com" || emailInput.val == "gmail.com" || emailInput.val == "daum.net" || emailInput.val == "hanmail.net" || emailInput.val == "nate.com" || (!emailInputFirst.val() == "" && checkEmail1.test(emailInputFirst.val()))) {
      $this.parents(".item-wrap").removeClass("is-error");
      $this.parents(".form-item").removeClass("is-error");
    }
  });

  $(".form-box").on("focus", "input", function () {
    $(this).parents(".item-wrap").addClass("is-focus");
  });
  $(".form-box").on("focusout", "input", function () {
    $(".form-box .item-wrap").removeClass("is-focus");
  });
  $(".form-box").on("keyup", "input", function () {
    var $this = $(this);
    var $inputName = $this.attr("name");
  
    // 사용자 이름 검증
    if ($inputName === "user-name") {
      var twomore = $this.val();
      if ($this.val() === "" || !pattern.test($this.val())) {
        showError($this, "한글, 영문, 숫자만 입력해 주세요");
      } else if (twomore.length < 2) {
        showError($this, "한글, 영문, 숫자만 입력해 주세요 (2글자 이상)");
      } else {
        clearError($this);
      }
    }
  
    // 휴대폰 번호 검증
    if ($inputName === "user-phone") {
      var phoneValue = $this.val();
      $this.on("input", function () {
        var phoneValue = $this.val();
        var cleanValue = phoneValue.replace(/[^\d]/g, "");
        $this.val(cleanValue);
      });
      if ($this.val() === "" || !checkPhone.test($this.val())) {
        showError($this, "숫자만 입력해 주세요");
      } else if (phoneValue.length < 8 || phoneValue.length > 11) {
        showError($this, "올바른 연락처를 입력해 주세요 (8-11자리 숫자)");
      } else {
        clearError($this);
      }
    }
  
    // 이메일 검증
    if ($inputName === "user-email-first") {
      var $emailLast = $this.siblings('input[name="user-email-last"]');
      if ($this.val() === "" || $emailLast.val() === "" || !checkEmail1.test($this.val()) || !checkEmail2.test($emailLast.val())) {
        showError($this, "올바른 이메일 주소를 입력해 주세요");
      } else {
        clearError($this);
      }
    }
  
    if ($inputName === "user-email-last") {
      var $emailFirst = $this.siblings('input[name="user-email-first"]');
      if ($this.val() === "" || $emailFirst.val() === "" || !checkEmail2.test($this.val()) || !checkEmail1.test($emailFirst.val())) {
        showError($this, "올바른 이메일 주소를 입력해 주세요");
      } else {
        clearError($this);
      }
    }
  
    // 개인 정보 수집 동의 검증
    if ($inputName === "user-personnel") {
      if ($this.val() === "" || !checkPhone.test($this.val())) {
        showError($this, "숫자만 입력해 주세요");
      } else {
        clearError($this);
      }
    }
  
    // 지역 검증
    if ($inputName === "user-area") {
      var twomore = $this.val();
      if ($this.val() === "" || !pattern.test($this.val())) {
        showError($this, "올바른 지역을 입력해 주세요 (2글자 이상)");
      } else if (twomore.length < 2) {
        showError($this, "지역은 최소 2글자 이상이어야 합니다");
      } else {
        clearError($this);
      }
    }
  });
  
  // showError 함수
  function showError($element, errorMessage) {
    $element.parents(".item-wrap").addClass("is-error");
    $element.parents(".form-item").addClass("is-error");
    $element.parents(".form-item").find(".form-error").text(errorMessage);
    $element.focus();
    checkHas = false;
  }
  
  // clearError 함수
  function clearError($element) {
    $element.parents(".item-wrap").removeClass("is-error");
    $element.parents(".form-item").removeClass("is-error");
  }

  // 버튼 활성화 여부 체크
  function inputChecks(wrapName) {
    $(wrapName + " .js-read-text").on("input", function () {
      var $name = $(wrapName + ' input[name="user-name"]');
      var $phone = $(wrapName + ' input[name="user-phone"]');
      var $email1 = $(wrapName + ' input[name="user-email-first"]');
      var $email2 = $(wrapName + ' input[name="user-email-last"]');
      var $personnel = $(wrapName + ' input[name="user-personnel"]');
      var $agree = $(wrapName + ' input[name="agree"]');

      var namePattern = /^[가-힣a-zA-Z0-9\s]+$/;
      var phonePattern = /^[0-9]*$/;
      var email1Pattern = /^[0-9a-zA-Z]|([-_\.]?[0-9a-zA-Z])$/;
      var email2Pattern = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;

      var phoneValue = $phone.val();
  
      // 모든 필드의 유효성 검사
      var isAllFieldsValid =
        $name.val() !== "" &&
        $name.val().match(namePattern) &&
        $name.val().length >= 2 &&
        $phone.val() !== "" &&
        phoneValue.match(phonePattern) &&
        phoneValue.length >= 8 &&
        phoneValue.length <= 11 &&
        $email1.val() !== "" &&
        $email2.val() !== "" &&
        email1Pattern.test($email1.val()) &&
        email2Pattern.test($email2.val()) &&
        $personnel.val() !== "" &&
        $personnel.val().match(phonePattern) &&
        $agree.is(":checked");
  
      // 버튼 활성화/비활성화 설정
      if (isAllFieldsValid) {
        $(wrapName + " .btn-submit").prop("disabled", false);
        $(wrapName + " .btn-submit").removeClass("disabled");
      } else {
        $(wrapName + " .btn-submit").prop("disabled", true);
        $(wrapName + " .btn-submit").addClass("disabled");
      }
    });
  }

  // 버튼 활성화 체크 함수
  inputChecks(".popup-content");
  inputChecks(".main-form");
  

  if ($(window).width() <= 768) {
    $('.popup-box .form-wrap input[name="user-personnel"]').attr("placeholder", "99");
    // $('.popup-box .form-wrap input[name="user-area"]').attr("placeholder", "강남역 근처");
  } else {
    $('.popup-box .form-wrap input[name="user-personnel"]').attr("placeholder", "사용할 인원을 알려주세요 (예:99)");
    // $('.popup-box .form-wrap input[name="user-area"]').attr("placeholder", "궁금한 지역을 알려주세요 (예:강남역 근처) ");
  }

});


var previousState;

// 바디 고정
var scrollPosition = 0;
function bodyFixed() {
  scrollPosition = $(window).scrollTop();
  $("body").css({ overflow: "hidden" });
}
// 바디 고정 해제
function bodyDef() {
  $("body").removeAttr("style");
  $(window).scrollTop(scrollPosition);
}

// 이전 상태 저장
var previousState = history.state;
// 팝업 오픈
function popupOpen(str, e) {
  history.pushState(null, null, location.href);

  var $this = $(e);
  var memSingle = $this.hasClass("btn-mem-single");
  var memAll = $this.hasClass("btn-mem-all");

  window.onpopstate = function (event) {
    bodyDef();
    // 멤버십 팝업 별도 구분
    if (str == "membership") {
      $(".list-button a").removeClass("js-active");
      $(".shop-wrap").removeClass("js-active");
      if (memSingle) {
        $(".list-button a:nth-child(1)").removeClass("js-active");
        $(".shop-wrap:nth-child(1)").removeClass("js-active");
      } else if (memAll) {
        $(".list-button a:nth-child(2)").removeClass("js-active");
        $(".shop-wrap:nth-child(2)").removeClass("js-active");
      }
    }

    $(".header").css("z-index", "999");
    $(".module-popup-wrap").hide();
    $(".popup-box").hide();
    $(".dim").remove();
    $(".dim").remove();
    $('.popup-box[data-popup-box="' + str + '"]').hide();

    if ($(window).width() <= 768) {
      $(".js-toggle").css("display", "none");
      $(".js-toggle").removeClass("is-opened");
      $(".js-menu-toggle").removeClass("is-opened");
    }
  };

  bodyFixed();

  if ($(window).width() <= 768) {
    $(".js-toggle").css("display", "none");
    $(".js-toggle").removeClass("is-opened");
    $(".js-menu-toggle").removeClass("is-opened");
  }
  $(".header").css("z-index", "99");
  $(".module-popup-wrap").after('<div class="dim"></div>');
  $(".module-popup-wrap").show();
  $(".popup-box").hide();
  $(".dim").remove();
  $(".module-popup-wrap").after('<div class="dim"></div>');
  $('.popup-box[data-popup-box="' + str + '"]').show();

  // 멤버십 팝업 별도 구분
  if (str == "membership") {
    $(".list-button a").removeClass("js-active");
    $(".shop-wrap").removeClass("js-active");
    var soldOut = $(".shop-payment").hasClass("sold-out");
    if(soldOut === true){
      $(".shop-payment.sold-out").html("품절");
    }
    if (memSingle) {
      $(".list-button a:nth-child(1)").addClass("js-active");
      $(".shop-wrap:nth-child(1)").addClass("js-active");
    } else if (memAll) {
      $(".list-button a:nth-child(2)").addClass("js-active");
      $(".shop-wrap:nth-child(2)").addClass("js-active");
    }
  }
}

let popupCloseFunc = false;
// 닫기 클릭 시 어느팝업으로 돌아갈지
function popupCloseSub(close, open) {
  popupCloseFunc = true;
  history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    $('.popup-box[data-popup-box="' + close + '"]').show();
    $('.popup-box[data-popup-box="' + open + '"]').hide();
    setTimeout(() => popupOpen("form"), 100);
  };
  $('.popup-box[data-popup-box="' + close + '"]').hide();
  $('.popup-box[data-popup-box="' + open + '"]').show();

  // URL에서 #first를 제거
  history.replaceState({}, document.title, location.pathname);

  // 이전 URL 상태로 복원
  if (previousState && previousState.page === "first") {
    history.replaceState({}, document.title, location.pathname);
  }

  // return popupCloseFunc = false;
}
// 팝업 닫기
function popupClose() {
  popupCloseFunc = true;
  bodyDef();
  $(".header").css("z-index", "");
  $(".dim").remove();
  $(".module-popup-wrap").hide();
  $(".module-popup-wrap").children().hide();
  $(".form-box input").val("");
  $('.form-box input[type="checkbox"]').prop("checked", false);
  $(".form-box .btn-submit").attr("disabled", true);
  $(".form-box .btn-submit").addClass("disabled");

  // URL에서 #first를 제거
  history.replaceState({}, document.title, location.pathname);

  // 이전 URL 상태로 복원
  if (previousState && previousState.page === "first") {
    history.replaceState({}, document.title, location.pathname);
  }
}

// 유효성 검사
// class FormValidator {
//   constructor(wrapName) {
//     this.wrapName = wrapName;
//     this.checkHas = true;

//     // 유효성 검사를 위한 정규 표현식
//     this.validationPatterns = {
//       name: /^[가-힣a-zA-Z0-9\s]+$/,
//       phone: /^[0-9]{8,11}$/,
//       email1: /^[0-9a-zA-Z]|([-_\.]?[0-9a-zA-Z])$/,
//       email2: /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/,
//       personnel: /^[0-9]*$/,
//     };

//     // 입력 필드
//     this.fields = {
//       name: "user-name",
//       phone: "user-phone",
//       email1: "user-email-first",
//       email2: "user-email-last",
//       personnel: "user-personnel",
//       agree: "agree",
//     };

//     // 입력 필드에 이벤트 핸들러 추가
//     this.attachInputEventHandlers();
//   }

//   showError($element, errorMessage) {
//     $element.parents(".item-wrap").addClass("is-error");
//     $element.parents(".form-item").addClass("is-error");
//     $element.parents(".form-item").find(".form-error").text(errorMessage);
//     $element.focus();
//     this.checkHas = false;
//   }

//   validateField(fieldName, pattern, errorMessage) {
//     const $field = $(`${this.wrapName} input[name="${this.fields[fieldName]}"]`);
//     const fieldValue = $field.val();

//     if (fieldValue === "" || !pattern.test(fieldValue)) {
//       this.showError($field, errorMessage);
//     } else {
//       $field.parents(".item-wrap").removeClass("is-error");
//       $field.parents(".form-item").removeClass("is-error");
//     }
//   }

//   validateAgreement() {
//     const $agree = $(`${this.wrapName} input[name="${this.fields.agree}"]`);
    
//     if (!$agree.is(":checked")) {
//       this.showError($agree, "개인정보 수집과 이용에 동의해 주세요");
//     }
//   }

//   validateForm() {
//     this.validateField("name", this.validationPatterns.name, "올바른 회사명을 입력해 주세요 (2글자 이상)");
//     this.validateField("phone", this.validationPatterns.phone, "올바른 연락처를 입력해 주세요 (8-11자리 숫자)");
//     this.validateField("email1", this.validationPatterns.email1, "올바른 이메일 주소를 입력해 주세요");
//     this.validateField("email2", this.validationPatterns.email2, "올바른 이메일 주소를 입력해 주세요");
//     this.validateField("personnel", this.validationPatterns.personnel, "숫자만 입력해 주세요");
//     this.validateAgreement();

//     if (this.checkHas) {
//       // if (this.wrapName == ".popup-content") {
//       //   popupCloseSub("form", "form-fin");
//       // } else {
//       //   popupOpen("form-fin");
//       // }
//       // $('.btn-submit').on('click',function(){
//       //   // 폼 초기화
//       // });
//       $(".form-box input").val("");
//       $('.form-box input[type="checkbox"]').prop("checked", false);
//       $(".form-box .btn-submit").attr("disabled", true);
//       $(".form-box .btn-submit").addClass("disabled");

//     }
//   }

//   attachInputEventHandlers() {
//     for (const fieldName in this.fields) {
//       const $field = $(`${this.wrapName} input[name="${this.fields[fieldName]}"]`);
//       $field.on("input", () => {
//         // 입력이 변경될 때마다 유효성 검사 실행
//         this.validateField(
//           fieldName,
//           this.validationPatterns[fieldName],
//           "올바른 값이 아닙니다."
//         );
//       });
//     }
//   }
// }

// // 사용 예시:
// const formValidator = new FormValidator(".form-wrap");
// formValidator.validateForm();


