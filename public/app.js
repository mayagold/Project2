console.log('linked');


// jquery window onload

$( ()=>{
  console.log('jquery is working');
  const modalToggles = {
    showLoginModal(){
      console.log('clicked login');
      $('#login-button').on('click', ()=>{
        $('.modal-register').hide();
        $('.modal-login').show();
      })
    },
    showRegisterModal(){
      console.log('clicked register');
      $('#register-button').on('click', ()=>{
        $('.modal-login').hide();
        $('.modal-register').show();
      })
    }
  }
  modalToggles.showLoginModal();
  modalToggles.showRegisterModal();
  var $navbar = $(".banner-nav"),
      y_pos = $navbar.offset().top,
      height = $navbar.height();
  $(document).scroll(function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > y_pos + height) {
      $navbar.fadeIn();
      $navbar.addClass("navbar-fixed").animate({
        top: 0
      });
    } else if (scrollTop <= y_pos) {
      $navbar.removeClass("navbar-fixed").clearQueue().animate({
        top: "-48px"
      }, 0);
    }
  });
})
