var CardHeader2D,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardHeader2D = (function() {
  function CardHeader2D() {
    this.paralaxCards = bind(this.paralaxCards, this);
    this.backToStart = bind(this.backToStart, this);
    this.recountValues = bind(this.recountValues, this);
    if ($('html').hasClass('csstransforms3d')) {
      return;
    }
    this.widget = $('.card-header');
    this.card_front = this.widget.find('.card-header__card-front');
    this.card_back = this.widget.find('.card-header__card-back');
    this.recountValues();
    this.widget.on('mousemove', this.paralaxCards);
    this.widget.on('mouseleave', this.backToStart);
    $(window).on('resize', this.recountValues);
  }

  CardHeader2D.prototype.recountValues = function() {
    this.widget_height = this.widget.height();
    this.widget_top = this.widget.offset().top;
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };

  CardHeader2D.prototype.backToStart = function() {
    var options, props_back, props_front;
    props_front = {
      'margin-top': 0,
      'margin-left': -610
    };
    props_back = {
      'margin-top': 0,
      'margin-left': -230
    };
    options = {
      'easing': 'spring',
      'duration': 1000
    };
    this.card_front.velocity("stop").velocity(props_front, options);
    return this.card_back.velocity("stop").velocity(props_back, options);
  };

  CardHeader2D.prototype.paralaxCards = function(event) {
    var offset, options, percents, pointer, props_back, props_front, side, vertcal;
    offset = this.widget.offset();
    pointer = {
      left: event.pageX - offset.left - this.vw / 2 + 200,
      top: event.pageY - offset.top
    };
    vertcal = Math.min(pointer.top, this.widget_height) / this.widget_height;
    if (pointer.left < -400) {
      pointer.left = -400;
    }
    if (pointer.left > 400) {
      pointer.left = 400;
    }
    percents = pointer.left / 400;
    if (percents < 0) {
      side = -1;
    }
    if (percents >= 0) {
      side = 1;
    }
    props_front = {
      'margin-top': -15 * (percents + 1),
      'margin-left': -610 + 20 * vertcal
    };
    props_back = {
      'margin-top': 15 * (percents + 1),
      'margin-left': -230 - 20 * vertcal
    };
    options = {
      'easing': 'linear',
      'duration': 0
    };
    this.card_front.velocity("stop").velocity(props_front, options);
    return this.card_back.velocity("stop").velocity(props_back, options);
  };

  return CardHeader2D;

})();

$(document).ready(function() {
  return new CardHeader2D;
});

var CardHeader3D,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardHeader3D = (function() {
  function CardHeader3D() {
    this.paralaxCards = bind(this.paralaxCards, this);
    this.backToStart = bind(this.backToStart, this);
    this.recountValues = bind(this.recountValues, this);
    if ($('html').hasClass('no-csstransforms3d')) {
      return;
    }
    this.widget = $('.card-header');
    this.card_front = this.widget.find('.card-header__card-front');
    this.card_back = this.widget.find('.card-header__card-back');
    this.recountValues();
    this.widget.on('mousemove', this.paralaxCards);
    this.widget.on('mouseleave', this.backToStart);
    $(window).on('resize', this.recountValues);
  }

  CardHeader3D.prototype.recountValues = function() {
    this.widget_height = this.widget.height();
    this.widget_top = this.widget.offset().top;
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };

  CardHeader3D.prototype.backToStart = function() {
    var options, props_back, props_front;
    props_front = {
      'rotateX': 0,
      'rotateY': 0,
      'translateZ': '2px',
      'translateX': '20px',
      'translateY': '10px'
    };
    props_back = {
      'rotateX': 0,
      'rotateY': 0,
      'translateZ': '-2px',
      'translateX': '-20px',
      'translateY': '-10px'
    };
    options = {
      'easing': 'spring',
      'duration': 1000
    };
    this.card_front.css({
      'z-index': 2
    });
    this.card_back.css({
      'z-index': -2
    });
    this.card_front.velocity("stop").velocity(props_front, options);
    return this.card_back.velocity("stop").velocity(props_back, options);
  };

  CardHeader3D.prototype.paralaxCards = function(event) {
    var offset, options, percents, pointer, props_back, props_front, side, vertcal;
    offset = this.widget.offset();
    pointer = {
      left: event.pageX - offset.left - this.vw / 2 + 200,
      top: event.pageY - offset.top
    };
    vertcal = Math.min(pointer.top, this.widget_height) / this.widget_height;
    if (pointer.left < -400) {
      pointer.left = -400;
    }
    if (pointer.left > 400) {
      pointer.left = 400;
    }
    percents = pointer.left / 400;
    if (percents < 0) {
      side = -1;
    }
    if (percents >= 0) {
      side = 1;
    }
    props_front = {
      'rotateX': Math.round(-7 + vertcal * 14) + 'deg',
      'rotateY': Math.round(-10 * percents) + 'deg',
      'translateZ': Math.round(-60 * percents) + 'px',
      'translateX': Math.round(-100 * percents) + 'px',
      'translateY': '0'
    };
    props_back = {
      'rotateX': Math.round(-7 + vertcal * 14) + 'deg',
      'rotateY': Math.round(-10 * percents) + 'deg',
      'translateZ': Math.round(60 * percents) + 'px',
      'translateX': Math.round(-100 * percents) + 'px',
      'translateY': '0'
    };
    this.card_front.css({
      'z-index': 1 - side
    });
    this.card_back.css({
      'z-index': side - 1
    });
    options = {
      'easing': 'linear',
      'duration': 50
    };
    this.card_front.velocity("stop").velocity(props_front, options);
    return this.card_back.velocity("stop").velocity(props_back, options);
  };

  return CardHeader3D;

})();

$(document).ready(function() {
  return new CardHeader3D;
});
