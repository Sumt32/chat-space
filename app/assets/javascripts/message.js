    $(function() {
      function buildHTML(message) {
        var html = `<div class="main-container--name">${message.name}</div>
                    <div class="main-container--date">${message.time}</div>
                    <div class="main-container--message">
                      <p class="main-container--message__content">${message.body}</p>
                    </div>`
        return html;
      }
      $('.new_message').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData($(this).get(0));
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
            $('.main-container').append(html);
            $('.form__message').val('');
            $('.form__submit').prop('disabled', false);
            $("html,body").animate({ scrollTop: $('.main-container--message__content').offset().top });
          })
          .fail(function(data) {
            alert('error!');
          });
      });
      return false;
    });