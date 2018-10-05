(function($){
  $.fn.shuffle = function() {
    var allElems = this.get(),
    getRandom = function(max) {
      return Math.floor(Math.random() * max);
    },
    shuffled = $.map(allElems, function(){
      var random = getRandom(allElems.length),
        randEl = $(allElems[random]).clone(true)[0];
      allElems.splice(random, 1);
      return randEl;
    });
    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });
    return $(shuffled);
  };
})(jQuery);

var _modal = $('#modal');
var _modal2 = $('#modal2');
var _q = $('#q');

$.ajax({
  url:'__session.php',
  cache:false
}).done(function(data){
  data = JSON.parse(data);
  if(data.session){
    $.ajax({
      url:'q/q1.html',
      dataType:'html'
    }).done(function(da){
      _q.html(da);
      $(window).on('beforeunload', function(){return '';});
      _q.find('li').shuffle();
      choose();
    });
    // gtag('set', {'user_id': data.user});
  }else{
    document.location.href="./";
  }
});


$(document).on('click','#try',function(){
  modal_fade(false);
});



function modal_fade(boo,mo){
  boo =  boo || false;
  mo = mo || _modal;
  if(boo){
    mo.fadeIn(350).find('.modal-dialog').addClass('showsweet');
  }else{
    mo.fadeOut(350).find('.modal-dialog').removeClass('showsweet');
  }
}

function choose(){
  $(document).on('click','[data-season]',function(){
    var season = $(this).attr('data-season');
    if(season=='fuyu'){
      var number = parseInt(_q.find('[data-number]').attr('data-number'));
      _q.hide();
      if(number == 10){
        // quiz finish trigger
        _q.hide();
        _modal.find('.sa-error').hide();
        _modal.find('#try').remove();
        _modal.find('.sa-success').removeClass('d-none');
        modal_fade(true);
        $(window).off('beforeunload');
      }else{
        $.ajax({
          url:'q/q'+(number+1)+'.html',
          dataType:'html'
        }).done(function(da){
          modal_fade(true,_modal2);
          $(this).delay(1200).queue(function() {
            modal_fade(false,_modal2);
            _q.html(da);
            if(number == 2){
              _q.find('li').shuffle();
            }
            _q.fadeIn(350);
            $(this).dequeue();
          });
        }).always(function(){
          // gtag('config', '', {
          //   'page_title' : '',
          //   'page_path': 'quiz/q'+(number+1)
          // });
        });
      }
    }else{
      modal_fade(true);
    }
  })
}