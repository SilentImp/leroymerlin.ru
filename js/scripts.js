var CardHeader,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardHeader = (function() {
  function CardHeader() {
    this.paralaxCards = bind(this.paralaxCards, this);
    this.backToStart = bind(this.backToStart, this);
    this.recountValues = bind(this.recountValues, this);
    this.widget = $('.card-header');
    this.card_front = this.widget.find('.card-header__card-front');
    this.card_back = this.widget.find('.card-header__card-back');
    this.recountValues();
    this.widget.on('mousemove', this.paralaxCards);
    this.widget.on('mouseleave', this.backToStart);
    $(window).on('resize', this.recountValues);
  }

  CardHeader.prototype.recountValues = function() {
    this.widget_height = this.widget.height();
    this.widget_top = this.widget.offset().top;
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };

  CardHeader.prototype.backToStart = function() {
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

  CardHeader.prototype.paralaxCards = function(event) {
    var offset, options, percents, pointer, props_back, props_front, side, vertcal;
    offset = this.widget.offset();
    pointer = {
      left: event.pageX - offset.left - this.vw / 2 + 100,
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
      'rotateX': (-7 + vertcal * 14) + 'deg',
      'rotateY': (-10 * percents) + 'deg',
      'translateZ': (-60 * percents) + 'px',
      'translateX': (-80 * percents) + 'px',
      'translateY': '0'
    };
    props_back = {
      'rotateX': (-7 + vertcal * 14) + 'deg',
      'rotateY': (-10 * percents) + 'deg',
      'translateZ': (60 * percents) + 'px',
      'translateX': (-80 * percents) + 'px',
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

  return CardHeader;

})();

$(document).ready(function() {
  return new CardHeader;
});
