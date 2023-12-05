$(function(){
  vimeo();
    // rem 비율 조절(메인만)
  // maxWidth1440('p-main');
  maxWidthCustom('p-main', 1920, '0.520833vw');
  // maxWidth1920('p-main');

  var headerHas = $("#sp-wrap").hasClass("p-main");
  
  if(headerHas){
    $(".header").css('border-bottom','1px solid #e0e0df');
    if($(window).width() > 768){
      $(".header__inner").css("padding","0 8rem");
    }else{
      $(".header__inner").css("padding","");
    }
  }

  if ($(window).width() <= 768){
    $(document).on('click','.header__gnb .js-menu-toggle',function(){
      var gnbOpenHas = $(this).hasClass("is-opened");
      if(gnbOpenHas){
        $(".header").css('border-bottom','none');
      }else{
        $(".header").css('border-bottom','1px solid #e0e0df');
      }
    });
  }
  
  var officeLink = $(".video-box-wrap");
  if ($(window).width() >= 768){
    officeLink.attr("href","javascript:;");
  }else{
    officeLink.attr("href","./office/");
  }

  const sliderDetail = new Swiper('.slider-detail', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    disableOnInteraction: false,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

});