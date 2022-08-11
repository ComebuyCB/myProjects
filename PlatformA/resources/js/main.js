$(document).ready(function() {
  //Scroll to Top
  var btnTopHide = '.btn-top';

  $(document).on('click', btnTopHide, function(evt) {
    evt.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, 500)
  });

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 200) {
      $(btnTopHide).fadeIn();
    } else {
      $(btnTopHide).fadeOut();
    }
  });

  $('.artCard .navbar-tool .icon').on('click', function (e) {
    e.preventDefault();
  })
});
