$(document).ready(function() {
  const colors = ['red', 'black', 'blue', 'green', 'yellow', 'pink'];

  $('#colorButton').click(function() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    $('body').css('background-color', colors[randomIndex]);
  });
});