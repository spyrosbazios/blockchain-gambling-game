var passwordGame_contract = null;
var accounts = null;
var price;
var reward;
console.log(screen.width)
console.log(window.outerWidth)
async function passwordGame_App() {
  const web3 = await getWeb3();
  accounts = await web3.eth.getAccounts();
  passwordGame_contract = await getContract(web3);

}
passwordGame_App();

var boxColor = localStorage.getItem('boxColor');
console.log(boxColor);
if (boxColor == 0) {
  document.getElementById("swipe-end").src = "../assets/box-blue.png";
  document.getElementById("bet").innerHTML = "0.01 ETH"; 
  price = 0.01;
  document.getElementById("prize").innerHTML = "0.1 ETH"; 
  reward = 0.1;
}
else if (boxColor == 1) {
  document.getElementById("swipe-end").src = "../assets/box-purple.png";
  document.getElementById("bet").innerHTML = "0.027 ETH"; 
  price = 0.027;
  document.getElementById("prize").innerHTML = "0.27 ETH";
  reward = 0.27;
}
else {
  document.getElementById("swipe-end").src = "../assets/box-yellow.png";
  document.getElementById("bet").innerHTML = "0.068 ETH";
  price = 0.068;
  document.getElementById("prize").innerHTML = "0.68 ETH";
  reward = 0.68;
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
  var tl = new TimelineMax({repeat: -3});
  tl.staggerFrom("#dotted-line circle", 0.8, { scale: 1.2, x: 2, y: 0.5, opacity: 1, delay:0.09, ease: Power2.easeInOut, repeat: 1, yoyo: true}, 0.15);
  if(window.outerWidth > 800){
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
        if (endX < 498) TweenLite.to('#swipe-btn', .5, { x: 0 }); 
        if (endX>499) play();
        endX = 0;
      }
    }); 
  }
  else{
    $btn.on('click touchend', function(e){
    e.preventDefault();
  }).on('touchstart mousedown', function(e) {
    e.preventDefault();
    swiperDragged = true;
    startY = typeof e.pageY != 'undefined' ? e.pageY : e.originalEvent.touches[0].pageY;
    endY = 0;
  })

  $(document).on('touchmove mousemove', function(e){
    if (swiperDragged) {
      actualY = typeof e.pageY != 'undefined' ? e.pageY : e.originalEvent.touches[0].pageY;
      endY = Math.max(0, Math.min(432, actualY - startY));
      TweenLite.to('#swipe-btn', 0, { y: endY});
    }
  }).on('touchend mouseup', function(e) {
    if (swiperDragged) {
      swiperDragged = false;
      if (endY < 432) TweenLite.to('#swipe-btn', .5, { y: 0 }); 
      if (endY>431) play();
      endY = 0;
    }
  }); }
    
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
  else document.getElementById("forge-keys-container").style.opacity = "0.5";
       }, 200);

function getBtnId(btnId){

  if(btnId.charAt(0) == "1" && (pin1.length < 4)){
    switch (btnId){
      case "11":
        pin1+= "1";
        document.getElementById("pinCode1").innerHTML += "1";
        break;
      case "12": 
        pin1 += "2";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "2";
        break;
      case "13": 
        pin1+= "3";
        document.getElementById("pinCode1").innerHTML += "3";
        console.log(pin1);
        break;
      case "14":
        pin1+= "4";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "4";
        break;
      case "15": 
        pin1+= "5";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "5";
        break;
      case "16": 
        pin1+= "6";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "6";
        break;
      case "17": 
        pin1+= "7";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "7";
        break;
      case "18": 
        pin1+= "8";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "8";
        break;
      case "19": 
        pin1+= "9";
        console.log(pin1);
        document.getElementById("pinCode1").innerHTML += "9";
        break;
    }
  }
  else if(btnId.charAt(0) == "2" && (pin2.length < 4) && (pin1.length == 4)){
    console.log(pin2.length)
    switch (btnId){
      case "21": 
        pin2+= "1";
        document.getElementById("pinCode2").innerHTML += "1";
        console.log(pin1);
        break;
      case "22": 
        pin2+= "2";
        document.getElementById("pinCode2").innerHTML += "2";
        break;
      case "23": 
        pin2+= "3";
        document.getElementById("pinCode2").innerHTML += "3";
        break;
      case "24": 
        pin2+= "4";
        document.getElementById("pinCode2").innerHTML += "4";
        break;
      case "25": 
        pin2+= "5";
        document.getElementById("pinCode2").innerHTML += "5";
        break;
      case "26": 
        pin2+= "6";
        document.getElementById("pinCode2").innerHTML += "6";
        break;
      case "27": 
        pin2+= "7";
        document.getElementById("pinCode2").innerHTML += "7";
        break;
      case "28": 
        pin2+= "8";
        document.getElementById("pinCode2").innerHTML += "8";
        break;
      case "29": 
        pin2+= "9";
        document.getElementById("pinCode2").innerHTML += "9";
        break;
    }
  }
  else if(btnId.charAt(0) == "3" && (pin3.length < 4)  && (pin2.length == 4)){
    switch (btnId){
      case "31": 
        pin3+= "1";
        document.getElementById("pinCode3").innerHTML += "1";
        break;
      case "32": 
        pin3+= "2";
        document.getElementById("pinCode3").innerHTML += "2";
        break;
      case "33": 
        pin3+= "3";
        document.getElementById("pinCode3").innerHTML += "3";
        break;
      case "34": 
        pin3+= "4";
        document.getElementById("pinCode3").innerHTML += "4";
        break;
      case "35": 
        pin3+= "5";
        document.getElementById("pinCode3").innerHTML += "5";
        break;
      case "36": 
        pin3+= "6";
        document.getElementById("pinCode3").innerHTML += "6";
        break;
      case "37": 
        pin3+= "7";
        document.getElementById("pinCode3").innerHTML += "7";
        break;
      case "38": 
        pin3+= "8";
        document.getElementById("pinCode3").innerHTML += "8";
        break;
      case "39": 
        pin3+= "9";
        document.getElementById("pinCode3").innerHTML += "9";
        break;
    }

  }
}

function cancel(codeId){
  if(finish) return;
  switch (codeId){
    case "cross1":
      console.log(pin1.length);
      pin1="";
      document.getElementById("pinCode1").innerHTML = "";
      if( document.getElementById("pin-box3").style.opacity == '0.5') {document.getElementById("pin-box2").style.opacity = "0.5"};
      break;
    case "cross2":
      pin2="";
      document.getElementById("pinCode2").innerHTML = "";
      if(pin3.length == 0) {document.getElementById("pin-box3").style.opacity = "0.5";} 
      else {break;} 
      break;
    case "cross3":
      pin3="";
      document.getElementById("pinCode3").innerHTML = "";
      break;
    default: 
      pin1="";
      pin2="";
      pin3="";
      break;
  }

}

async function play() {

  var uint8 = new Uint8Array(13); 
  var pins = [pin1, pin2, pin3];
  for (let i = 0; i < pins.length; i++) {
    for (let j = 0; j < pins[i].length; j++) {
      uint8[1 + i * pins[i].length + j] = parseInt(pins[i].charAt(j));
    }
  }
  uint8[0] = parseInt(boxColor, 10) + 1;
  
  await passwordGame_contract.methods
  .createBet(uint8[0], [uint8[1], uint8[2], uint8[3], uint8[4], uint8[5], uint8[6], uint8[7], uint8[8], uint8[9], uint8[10], uint8[11], uint8[12]]) 
  .send({from: accounts[0], gas: 4712388, gasPrice: 100000000000, value: 1000000000000000000 * price});

  passwordGame_contract.events.Verified({
    filter: {addr: accounts[0]}
  }, function(error, event) {
    console.log(event.returnValues.codes);
    let x = event.returnValues.result;
    var popup = document.getElementById("popup");
    if (!x) popup.src = "gameplay-assets/popup_lost.png";
    popup.style.visibility= "visible";
    document.querySelectorAll("body :not(#popup)").forEach(element => element.style.filter = "blur(6px)");
    document.addEventListener('mouseup', function(e) {
      if (!popup.contains(e.target)) {
          popup.style.visibility = 'hidden';
          document.querySelectorAll("body :not(#popup)").forEach(element => element.style.filter = "none");

      }
  });
  });

  passwordGame_contract.events.Code(function(error, event) {
    console.log("code: " + event.returnValues.code);
  });

  await passwordGame_contract.methods
  .verifyBet()
  .send({from: accounts[0], gas: 4712388, gasPrice: 100000000000});
}
