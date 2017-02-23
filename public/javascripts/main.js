
$( document ).ready(function() {
    "use strict";
    /*toggle actions*/
    $('.actions').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('#switch-style').animate({'right':'0'});
        }else{
            $(this).addClass('open');
            $('#switch-style').animate({'right':'-290'});
        }
    });
    /*Like*/
    $(document).on("click", ".like", function(e) {
      e.preventDefault();
      if($(this).hasClass('liked')){
        $(this).removeClass('liked');
      }else{
        $(this).addClass('liked');
      }
    });
});