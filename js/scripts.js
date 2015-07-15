var Advantages,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Advantages = (function() {
  function Advantages() {
    this.checkState = bind(this.checkState, this);
    this.widget = $('.advantages');
    if (this.widget.length === 0) {
      return;
    }
    this.advs = $('.advantages__advantage');
    this.counter = 0;
    this.checkState();
    $(window).on('scroll', this.checkState);
  }

  Advantages.prototype.checkState = function() {
    var adv, i, len, ref, scroll, vh;
    scroll = $(window).scrollTop();
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    ref = this.advs;
    for (i = 0, len = ref.length; i < len; i++) {
      adv = ref[i];
      adv = $(adv);
      if ((adv.offset().top + adv.outerHeight(true) < scroll + vh) && (!adv.hasClass('advantages__advantage_start'))) {
        adv.addClass('advantages__advantage_start');
        this.counter++;
      }
    }
    if (this.counter === this.advs.length) {
      return $(window).off('scroll', this.checkState);
    }
  };

  return Advantages;

})();

$(document).ready(function() {
  return new Advantages;
});

var Details,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Details = (function() {
  function Details() {
    this.checkState = bind(this.checkState, this);
    this.widget = $('.card-details');
    if (this.widget.length === 0) {
      return;
    }
    this.steps = $('.card-details__address-flag');
    this.counter = 0;
    this.checkState();
    $(window).on('scroll', this.checkState);
  }

  Details.prototype.checkState = function() {
    var i, len, ref, scroll, step, vh;
    scroll = $(window).scrollTop();
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    ref = this.steps;
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      step = $(step);
      if ((step.offset().top + step.outerHeight(true) + 40 < scroll + vh) && (!step.hasClass('card-details__address-flag_start'))) {
        step.addClass('card-details__address-flag_start');
        this.counter++;
      }
    }
    if (this.counter === this.steps.length) {
      return $(window).off('scroll', this.checkState);
    }
  };

  return Details;

})();

$(document).ready(function() {
  return new Details;
});

var GetCard,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GetCard = (function() {
  function GetCard() {
    this.checkState = bind(this.checkState, this);
    this.widget = $('.card-get');
    if (this.widget.length === 0) {
      return;
    }
    this.steps = $('.card-get__step');
    this.counter = 0;
    this.checkState();
    $(window).on('scroll', this.checkState);
  }

  GetCard.prototype.checkState = function() {
    var i, len, ref, scroll, step, vh;
    scroll = $(window).scrollTop();
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    ref = this.steps;
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      step = $(step);
      if ((step.offset().top + step.outerHeight(true) < scroll + vh) && (!step.hasClass('card-get__step_start'))) {
        step.addClass('card-get__step_start');
        this.counter++;
      }
    }
    if (this.counter === this.steps.length) {
      return $(window).off('scroll', this.checkState);
    }
  };

  return GetCard;

})();

$(document).ready(function() {
  return new GetCard;
});

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

var CardNavigation,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardNavigation = (function() {
  function CardNavigation() {
    this.scrollToChapter = bind(this.scrollToChapter, this);
    this.checkCurrent = bind(this.checkCurrent, this);
    this.checkFixed = bind(this.checkFixed, this);
    this.widget = $('.card-navigation');
    this.chapters = $('.chapter');
    this.links = $('.card-navigation__link');
    this.checkFixed();
    $(window).on('scroll', this.checkFixed);
    this.links.on('click', this.scrollToChapter);
  }

  CardNavigation.prototype.checkFixed = function() {
    if ($(window).scrollTop() >= this.widget.offset().top) {
      this.widget.toggleClass('card-navigation_fixed', true);
    } else {
      this.widget.toggleClass('card-navigation_fixed', false);
    }
    return this.checkCurrent();
  };

  CardNavigation.prototype.checkCurrent = function() {
    var chapter, current, i, len, ref, results;
    ref = this.chapters;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      chapter = ref[i];
      chapter = $(chapter);
      if (chapter.offset().top + chapter.outerHeight() / 2 > $(window).scrollTop()) {
        current = chapter.attr('id');
        if (this.current) {
          this.current.removeClass('card-navigation__link_current');
        }
        this.current = this.widget.find('[data-target="' + current + '"]');
        this.current.toggleClass('card-navigation__link_current', true);
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  CardNavigation.prototype.scrollToChapter = function(event) {
    var link;
    event.preventDefault();
    link = $(event.currentTarget);
    return $('#' + link.attr('data-target')).velocity("scroll", {
      duration: 500,
      offset: -100,
      begin: (function(_this) {
        return function() {
          return document.body.style.willChange = 'scroll-position';
        };
      })(this),
      complete: (function(_this) {
        return function() {
          return document.body.style.willChange = 'auto';
        };
      })(this)
    });
  };

  return CardNavigation;

})();

$(document).ready(function() {
  return new CardNavigation;
});
