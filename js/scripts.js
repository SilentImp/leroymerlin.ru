var CardHeader,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CardHeader = (function() {
  function CardHeader() {
    this.paralaxCards = bind(this.paralaxCards, this);
    this.recountValues = bind(this.recountValues, this);
    this.widget = $('.card-header');
    this.card_front = this.widget.find('.card-header__card-front');
    this.card_back = this.widget.find('.card-header__card-back');
    this.recountValues();
    $(window).on('scroll', this.paralaxCards);
    $(window).on('resize', this.recountValues);
  }

  CardHeader.prototype.recountValues = function() {
    this.widget_height = this.widget.height();
    this.widget_top = this.widget.offset().top;
    return this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  };

  CardHeader.prototype.paralaxCards = function() {
    var percents, top;
    top = window.pageYOffset || document.documentElement.scrollTop;
    percents = Math.min(top * 100 / ((this.widget_height + this.widget_top) * .75), 100);
    this.card_front.css({
      top: (40 - (20 * percents / 100)) + 'px'
    });
    return this.card_back.css({
      top: (20 + (20 * percents / 100)) + 'px'
    });
  };

  return CardHeader;

})();

$(document).ready(function() {
  return new CardHeader;
});
