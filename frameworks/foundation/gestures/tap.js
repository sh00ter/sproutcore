SC.TapGesture = SC.Gesture.extend({
  name: "tap",
  
  maxDistance: 10,
  maxTime: 250,
  
  unassignedTouchDidStart: function(touch) {
    var status = this.statusForTouch(touch);
    status.start = Date.now();
  },
  
  unassignedTouchDidEnd: function(touch) {
    // be polite to other gestures: if they say they used it, don't handle it.
    if (touch.isTaken) return;
    
    // calculate the deltas
    var timeDifference = (Date.now() - this.statusForTouch(touch).start),
        xDelta = Math.abs(touch.pageX - touch.startX),
        yDelta = Math.abs(touch.pageY - touch.startY),
        delta = Math.pow(Math.pow(xDelta, 2) + Math.pow(yDelta, 2), 0.5);
    
    if (timeDifference < this.get("maxTime") && delta < this.get("maxDistance")) {
      this.trigger(touch);
      this.discardTouch(touch);
    }
  },
  
  touchEnd: function(touchEntry, evt) {
    if (!SC.none(evt)) {
      sc_super();
    } else {
      return;
    }
  }
});