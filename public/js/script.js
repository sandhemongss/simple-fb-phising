$(document).ready(function() {
  $('#submit').submit(function(e) {
    e.preventDefault();
    
    $('#password').val('');
    });
});