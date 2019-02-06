$(function() {
  function buildHTML(message) {
    var new_message = $('<div class="msg">' +
      '<p class="main-container--name">' + message.name + '</p>' +
      '<p class="main-container--date">' + message.time + '<p>' +
      '<p class ="main-container--message__content">' + message.body + '</p>' +
      '</div>');
    return new_message;
  }
  $('.form').on('submit', function(e) {
    e.preventDefault();

    var formdata = new FormData($(this).get(0));
    var url = window.location.pathname;
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.msg').append(html);
        $('.form__message').val('');
        $('.form__submit').prop('disabled', false);
      })
  })
})