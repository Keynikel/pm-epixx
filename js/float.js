$(window).scroll(function() {
  var top = $(document).scrollTop();
  var bottom = $(window).scrollTop() + $(window).height();
  if (top > 500 && top < 2200) {
    $("#page-aside").css('justify-content', 'flex-end');
    $('.formalization').addClass('fixed');
  }
  else {
    if (top > 2200) $("#page-aside").css('justify-content', 'flex-end');
    else $("#page-aside").css('justify-content', 'space-between');
    $('.formalization').removeClass('fixed');
  }
 });
