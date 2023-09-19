

//IS 11/12/2014 Mobile/ipad swipe gesture shortcuts

var beginTouch,endTouch,bX,bY,eX,eY;

$(document.body).bind("touchstart", function (event) {
    beginTouch = new Date().getTime();
    bX = event.originalEvent.pageX;
    bY = event.originalEvent.pageY;
   
});


$(document.body).bind("touchend", function (event) {
    endTouch = new Date().getTime();
    eX = event.originalEvent.pageX;
    eY = event.originalEvent.pageY;

    var durration = endTouch - beginTouch;

    var m = (bY - eY) / (bX - eX);

    var slopeAngle = Math.atan(m) * (180.0/Math.PI);

    var swipeLength = Math.sqrt((bY - eY) * (bY - eY) + (bX - eX) * (bX - eX));

    var swipeEvent = { durration: durration, slopeAngle: slopeAngle, beginX: bX, endX: eX, beginY: bY, endY: eY, swipeLength: swipeLength };

    $(".swipegestureListener").trigger("swipegesture", swipeEvent);
});
