var image = null;
var rbimg = null;
// var blimg = null;
var wdimg = null;
var rhimg = null;
var canv = null;
finp = document.getElementById("img");

function upload() {
  // var fname = finp.value;   (for alert box)
  // alert("You chose  " + fname);
  canv = document.getElementById("can");
  image = new SimpleImage(finp);
  image.drawTo(canv);
  rbimg = new SimpleImage(finp);
  wdimg = new SimpleImage(finp);
  rhimg = new SimpleImage(finp);
  // blimg = new SimpleImage(finp);
}

function loaded(image) {
  if(image == null || !image.complete()) {
    alert("Image not loaded");
  }
  else {
    return  true;
  }
}


// here every one seventh of the width of picture is given a spc color
// every color from vibgyor has its own values to be applied (we have a table for that saved) 
// using >= so we cover the pixel continuously 
function rbow() {
  var w = rbimg.getWidth();
  for (var pixel of rbimg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    //average found
    //leftmost-one-seventh for colour violet:
    if(x<=w/7 && x>0) {
      if(avg<128) {
        pixel.setRed(avg*1.6);
        pixel.setGreen(0);
        pixel.setBlue(avg*1.6);
      }
      else {
        pixel.setRed(avg*0.4+153);
        pixel.setGreen(avg*2-255);
        pixel.setBlue(avg*0.4+153);
      }
    }
    //second one-seventh for colour indigo:
    if (x<=(2*w)/7 && x>w/7) {
      if(avg<128) {
        pixel.setRed(avg*0.8);
        pixel.setGreen(0);
        pixel.setBlue(avg*2);
      }
      else {
        pixel.setRed(avg*1.2-51);
        pixel.setGreen(avg*2-255);
        pixel.setBlue(255);
      }
    }
    //third one-seventh for colour blue:
    if (x>=(2*w)/7 && x<(3*w)/7) {
      if (avg<128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(avg*2);
      }
      else {
        pixel.setRed(avg*2-255);
        pixel.setGreen(avg*2-255);
        pixel.setBlue(255);
      }
    }
    //fourth one-seventh for colour green:
    if (x>=(3*w)/7 && x<(4*w)/7) {
      if(avg<128) {
        pixel.setRed(0);
        pixel.setGreen(avg*2);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(avg*2-255);
        pixel.setGreen(255);
        pixel.setBlue(avg*2-255);
      }
    }
    //fifth one-seventh for colour yellow:
    if (x>=(4*w)/7 && x<(5*w)/7) {
      if(avg<128) {
        pixel.setRed(avg*2);
        pixel.setGreen(avg*2);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(avg*2-255);
      }
    }
    //sixth one-seventh for colour orange:
    if (x>=(5*w)/7 && x<(6*w)/7) {
      if(avg<128) {
        pixel.setRed(avg*2);
        pixel.setGreen(avg*0.8);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(255);
        pixel.setGreen(avg*1.2-51);
        pixel.setBlue(avg*2-255);
      }
    }
    //last one-seventh for colour red:
    if(x>=(6*w)/7 && x<w) {
      if(avg<128) {
        pixel.setRed(avg*2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(255);
        pixel.setGreen(avg*2-255);
        pixel.setBlue(avg*2-255);
      }
    }
  }
  rbimg.drawTo(can);
}

// function doblur() {
//   for (var pixel of blimg.values()) {
//     var x = pixel.getX();
//     var y = pixel.getY();
//     var ran = Math.random();
//       var newx = Math.floor((Math.random() * 10) + 1);
//       var newy = Math.floor((Math.random() * 10) + 1);
//     if(ran>0.5) {
//       if( (x-newx) < image.getWidth() -1 && (y-newy) <image.getHeight() -1) {
//       var npix = image.getPixel(x-newx,y-newy);
//         blimg.setPixel(npix);
//       }
//     }
//   }

//   blimg.drawTo(can);
// }

function wind() {
  var wd = wdimg.getWidth();
  var ht = wdimg.getHeight();
  var th = 50;
  var th2 = 75;
  var th3 = 7.5;
  for (var pixel of wdimg.values()) {
    var xc = pixel.getX();
    var yc = pixel.getY();
    if(xc<=wd && xc>=wd-th) {
        pixel = setborder(pixel);    //right border
    }
    else if (xc>=0 && xc<=th) {
        pixel = setborder(pixel);     //left border
    }
    else if (yc<=ht && yc>=ht-th) {
        pixel = setborder(pixel);      //bottom border
    }    
    else if (yc>=0 && yc<=th) {
        pixel = setborder(pixel);   //top border
    }
    
    //till here, a basic border of color from setborder is added on all sides
    
    else if(xc>th && xc<=th2) {
      pixel = setborder2(pixel);
    }
    else if(xc>=wd-th2 && xc<wd-th) {
      pixel = setborder2(pixel);
    }
    else if(yc<=th2 && yc>th) {
      pixel = setborder2(pixel);
    }
    else if (yc<ht-th && yc>=ht-th2) {
      pixel = setborder2(pixel);
    }
    
    //till here, the last 4 else ifs are to add another border within the old one
    //the color to this border is as the one setborder2 and the thickness for this border is given as th2
    
    else if (xc>=wd/2-th3 && xc<wd/2+(2*th3)) {
      pixel = setborder2(pixel);
    }
    else if (yc>=ht/2-th3 && yc<ht/2+(2*th3)) {
      pixel = setborder2(pixel);
    }
    
    //in these two cases above, a vertical and horizontal line is drawn right through the middle
    
    else if (xc>=( th2 + (wd/2) )/2 -th3 && xc< (th2 + (wd/2) )/2 + (2*th3)) {
      pixel = setborder2(pixel);
    }
    else if (xc>=( (wd/2) + (wd-th2) )/2 -th3 && xc< (( (wd/2) + (wd-th2) )/2 + (2*th3))) {
      pixel = setborder2(pixel);
    }
    
    //in these 2 till here, we add lines on the parts between mid and the inner border (both sides) 
    
    
  }
  wdimg.drawTo(can);
}

function setborder(pixel) {
  pixel.setRed(0);
  pixel.setGreen(0);
  pixel.setBlue(0);
  return pixel;
}

function setborder2(pixel) {
  pixel.setRed(255);
  pixel.setGreen(228);
  pixel.setBlue(196);
  return pixel;
}

function rhue() {
  for (var pixel of rhimg.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if (avg<128) {
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else {
      pixel.setRed(255);
      pixel.setGreen( (2*avg) - 255);
      pixel.setBlue( (2*avg) - 255);
    }
  }
  rhimg.drawTo(can);
}

function dorainbow() {
  if(loaded(image)) {
    rbow();
  }
  rbimg.drawTo(can);
}

function dowindow() {
  if(loaded(image)) {
    wind();
  }
  wdimg.drawTo(can);
}

function doredhue() {
   if(loaded(image)) {
   rhue(); 
   }
  rhimg.drawTo(can);
}

function reset() {
  if(loaded(image)) {
    rbimg = new SimpleImage(finp);
    wdimg = new SimpleImage(finp);
    rhimg = new SimpleImage(finp);
//     blimg = new SimpleImage(finp);
  }
  image.drawTo(can);
}
