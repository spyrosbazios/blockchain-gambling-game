/* 
 * 
 * SLIDE TO UNCLOCK FUNCTIONALITY 
 * 
 */

var swiperDragged = false,
startX,
endX = 0;

function swipe(){
var $swipe = $('.swiper'),
  $btn = $('.swipe-btn', $swipe);

TweenLite.to('#swipe-arrow', 0, { x: 16, y: 11});
TweenLite.to('#swipe-end', 0, { x: 235, y: 12});

var tl = new TimelineMax({ repeat: -1 });
tl.staggerFrom("#dotted-line circle", 0.7, { scale: 0.7, x: -2, y: .5, opacity: 0.7, delay:0.1, ease: Power2.easeInOut, repeat: 1, yoyo: true}, 0.15);

$btn.on('click touchend', function(e){
e.preventDefault();
}).on('touchstart mousedown', function(e) {
e.preventDefault();
swiperDragged = true;
startX = typeof e.pageX != 'undefined' ? e.pageX : e.originalEvent.touches[0].pageX;
endX = 0;
})

$(document).on('touchmove mousemove', function(e){
if (swiperDragged) {
  actualX = typeof e.pageX != 'undefined' ? e.pageX : e.originalEvent.touches[0].pageX;
  endX = Math.max(0, Math.min(215, actualX - startX));
  TweenLite.to('#swipe-btn', 0, { x: endX});
}
}).on('touchend mouseup', function(e) {
if (swiperDragged) {
  swiperDragged = false;
  if (endX < 200) {
    TweenLite.to('#swipe-btn', .5, { x: 0 });
  } else {
    console.log($btn.attr('xlink:href'));
    TweenLite.to('#swipe-btn', .1, { x: 215});
    $('.unlock').addClass('unlocked');
    setTimeout(function(){
      TweenLite.to('#swipe-btn', .5, { x: 0 });
      $('.unlock').removeClass('unlocked');
    }, 1400);
  }
  endX = 0;
}
});
}

swipe();
