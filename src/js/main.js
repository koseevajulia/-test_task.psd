$(document).ready(function() {
  
  $('input[type="radio"]').on('change', function() {
    const selectedColor = $(this).val();
    $('.colors__item-color').css('background-color', selectedColor);
  });
});
