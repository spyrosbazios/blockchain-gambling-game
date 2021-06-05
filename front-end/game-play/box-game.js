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


/* GETTING PIN */

var pin1 = "";
var pin2 = "";
var pin3 = "";
function getBtnId(btnId){

  if(btnId.charAt(0) == "1" && (pin1.length < 4)){
    switch (btnId){
      case "11":
        pin1+= "1";
        console.log(pin1);
        break;
      case "12": 
        pin1 += "2";
        console.log(pin1);
        break;
      case "13": 
        pin1+= "3";
        break;
      case "14":
        pin1+= "4";
        console.log(pin1);
        break;
      case "15": 
        pin1+= "5";
        break;
      case "16": 
        pin1+= "6";
        break;
      case "17": 
        pin1+= "7";
        break;
      case "18": 
        pin1+= "8";
        break;
      case "19": 
        pin1+= "9";
        break;
    }
  }
  else if(btnId.charAt(0) == "2" && (pin2.length < 4)){
    switch (btnId){
      case "21": 
        pin2+= "1";
        break;
      case "22": 
        pin2+= "2";
        break;
      case "23": 
        pin2+= "3";
        break;
      case "24": 
        pin2+= "4";
        break;
      case "25": 
        pin2+= "5";
        break;
      case "26": 
        pin2+= "6";
        break;
      case "27": 
        pin2+= "7";
        break;
      case "28": 
        pin2+= "8";
        break;
      case "29": 
        pin2+= "9";
        break;
    }
  }
  else if(btnId.charAt(0) == "3" && (pin3.length < 4)){
    switch (btnId){
      case "31": 
        pin3+= "1";
        break;
      case "32": 
        pin3+= "2";
        break;
      case "33": 
        pin3+= "3";
        break;
      case "34": 
        pin3+= "4";
        break;
      case "35": 
        pin3+= "5";
        break;
      case "36": 
        pin3+= "6";
        break;
      case "37": 
        pin3+= "7";
        break;
      case "38": 
        pin3+= "8";
        break;
      case "39": 
        pin3+= "9";
        break;
    }

  }
}
