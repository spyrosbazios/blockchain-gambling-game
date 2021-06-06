var boxColor = localStorage.getItem('boxColor');
console.log(boxColor);
if(boxColor == 0){
  document.getElementById("swipe-end").src = "../assets/box-blue.png";
}
else if(boxColor == 2){
  document.getElementById("swipe-end").src = "../assets/box-purple.png";
}
else{
  document.getElementById("swipe-end").src = "../assets/box-yellow.png";
}

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

  TweenLite.to('#swipe-end', 0, { x: 15, y: 65});
  
  var tl = new TimelineMax({repeat: -1});
  tl.staggerFrom("#dotted-line circle", 0.7, { scale: 1.1, x: -2, y: .8, opacity: 1, delay:0.1, ease: Power2.easeInOut, repeat: 1, yoyo: true}, 0.15);

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
      endX = Math.max(0, Math.min(500, actualX - startX));
      TweenLite.to('#swipe-btn', 0, { x: endX});
    }
  }).on('touchend mouseup', function(e) {
    if (swiperDragged) {
      swiperDragged = false;
      if (endX < 501) {
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

/* GETTING PIN */

var pin1 = "";
var pin2 = "";
var pin3 = "";

/* Changes keyboards opacity when previous pin is set */
setInterval(function(){
  if(pin1.length == 4) {
  document.getElementById("pin-box2").style.opacity = "1";}

  if(pin2.length == 4 && ( document.getElementById("pin-box2").style.opacity == "1") ) {
  document.getElementById("pin-box3").style.opacity = "1";} 

  if((pin1.length == 4) && (pin2.length == 4) && (pin3.length == 4)) {
    document.getElementById("forge-keys-container").style.opacity = "1";
    swipe();}
  else document.getElementById("forge-keys-container").style.opacity = "0.5";}, 200);

function getBtnId(btnId){

  if(btnId.charAt(0) == "1" && (pin1.length < 4)){
    switch (btnId){
      case "11":
        pin1+= "1";
        document.getElementById("code1").innerHTML += "1";
        break;
      case "12": 
        pin1 += "2";
        console.log(pin1);
        break;
      case "13": 
        pin1+= "3";
        console.log(pin1);
        break;
      case "14":
        pin1+= "4";
        console.log(pin1);
        break;
      case "15": 
        pin1+= "5";
        console.log(pin1);
        break;
      case "16": 
        pin1+= "6";
        console.log(pin1);
        console.log(pin1.length);
        break;
      case "17": 
        pin1+= "7";
        console.log(pin1);
        break;
      case "18": 
        pin1+= "8";
        console.log(pin1);
        break;
      case "19": 
        pin1+= "9";
        console.log(pin1);
        break;
    }
  }
  else if(btnId.charAt(0) == "2" && (pin2.length < 4)){
    console.log(pin2.length)
    switch (btnId){
      case "21": 
        pin2+= "1";
        console.log(pin1);
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

function cancel(codeId){
  switch (codeId){
    case "cross1":
      console.log(pin1.length);
      pin1="";
      if( document.getElementById("pin-box3").style.opacity == '0.5') {document.getElementById("pin-box2").style.opacity = "0.5"};
      document.getElementById("code1").innerHTML = "PIN";
      break;
    case "cross2":
      pin2="";
      if(pin3.length == 0) {document.getElementById("pin-box3").style.opacity = "0.5";} 
      else {break;} 
      break;
    case "cross3":
      pin3="";
      break;
    default: 
      pin1="";
      pin2="";
      pin3="";
      break;
  }

}
