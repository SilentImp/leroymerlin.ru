var Layout,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Layout = (function() {
  function Layout() {
    this.recountBasketPosition = bind(this.recountBasketPosition, this);
    this.basket = $('#small-basket .e-commerce');
    this.footer = $('#footer-place');
    $(window).on('scroll resize', this.recountBasketPosition);
    this.recountBasketPosition();
  }

  Layout.prototype.recountBasketPosition = function() {
    var footer_top, top, vh;
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    top = window.pageYOffset || document.documentElement.scrollTop;
    footer_top = this.footer.offset().top;
    if (top + vh > footer_top) {
      return this.basket.css({
        bottom: (top + vh - footer_top) + 'px'
      });
    } else {
      return this.basket.css({
        bottom: 0
      });
    }
  };

  return Layout;

})();

$(document).ready(function() {
  return new Layout;
});
