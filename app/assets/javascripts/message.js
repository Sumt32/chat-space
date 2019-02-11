    $(function() {
      function buildSendMessageHTML(message) {
        var addImage = '';
        if (message.image.url) {
          addImage = `<img src="${message.image.url}" class="lower-message__image">`;
        }
        var html = `<div class="main-container--name">${message.name}</div>
                    <div class="main-container--date">${message.time}</div>
                    <div class="main-container--message">
                      <p class="main-container--message__content">${message.body}</p>
                      ${addImage}
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
          .done(function(messageData) {
            var html = buildSendMessageHTML(messageData);
            $('.main-container').append(html);
            $('#new_message')[0].reset();
            $('.form__submit').prop('disabled', false);
            $("html,body").animate({ scrollTop: $('.main-container--message__content').offset().top });
          })
          .fail(function(messageData) {
            alert('error!');
          });
        return false;
      });

      $(function() {
        $(function() {
          if (location.pathname.match(/\/groups\/\d+\/messages/)) {
            setInterval(updateNewMessage, 5000);
          }
        });

        function updateNewMessage() {
          if ($('.main-container--wrapper')[0]) {
            var message_id = $('.main-container--wrapper').last().data('id');
          }
          $.ajax({
              url: location.href,
              type: 'GET',
              data: { id: message_id },
              dataType: 'json'
            })
            .done(function(messageData) {
              if (messageData.length) {
                $.each(messageData, function(i, messageData) {
                  var html = buildSendMessageHTML(messageData);
                  $('.main-container').append(html);
                });
              }
            })
            .fail(function() {
              alert('自動更新に失敗しました')
            })
        }
      })
    });

