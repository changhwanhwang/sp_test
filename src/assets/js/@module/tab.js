// tab
function moduleTab(TabName){
  var tabTitleList = $('[data-module-tab-title="'+ TabName +'"]');
  var tabContentList = $('[data-module-tab-content="'+ TabName +'"]')
  // tabTitleList.children().eq(0).addClass('js-active');
  // tabContentList.children().eq(0).addClass('js-active');
  var tabTitle = tabTitleList.children();
  var tabContent = tabContentList.children();
  tabTitle.on('click',function(){
    var $this = $(this);
    var tabTitleIdx = $this.index();
    tabTitle.removeClass('js-active');
    $this.addClass('js-active');
    tabContent.removeClass('js-active');
    tabContent.eq(tabTitleIdx).addClass('js-active');
  });
}