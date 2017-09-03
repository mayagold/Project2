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
})
