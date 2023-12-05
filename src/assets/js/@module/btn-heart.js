$(function(){
    // 하트 버튼 카운팅
  
    $(document).on("click", ".btn-heart", function () {
      var $this = $(this);
      console.log($this);
      var hasHeart = $this.hasClass("js-active");
      var countData = $this.children(".heart-count").text();
      var countNumber = parseInt(countData);
      var countAdd = countNumber + 1;
      var countRemove = countNumber - 1;
      // if (hasHeart) {
      //   $this.removeClass("js-active");
      //   $this.children(".heart-count").html(countRemove);
      // } else {
        $this.children(".heart-count").html(countAdd);
        $this.addClass("js-active");
      // }
    });
});