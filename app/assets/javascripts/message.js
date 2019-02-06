$(function() {
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
  })
})