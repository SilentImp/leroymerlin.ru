$(document).ready(function() {
  return $('.bestseller__wrapper').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false
  });
});

var Item;

Item = (function() {
  function Item() {
    $('.item__list').isotope({
      itemSelector: '.grid-item',
      masonry: {
        columnWidth: 295
      }
    });
  }

  return Item;

})();

$(document).ready(function() {
  return new Item;
});
