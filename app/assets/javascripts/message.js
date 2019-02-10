    $(function() {
      function messageHTML(message) {
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
          .done(function(messageData) {
            var html = messageHTML(messageData);
            $('.main-container').append(html);
            $('#new_message')[0].reset();
            $('.form__submit').prop('disabled', false);
            $("html,body").animate({ scrollTop: $('.main-container--message__content').offset().top });
          })
          .fail(function(messageData) {
            alert('error!');
          });
      });

      $(function() {
        $(function() {
          if (location.pathname.match(/\/groups\/\d+\/messages/)) {
            setInterval(reload, 5000);
          }
        });

        function reload() {
          if ($('.main-container--wrapper')[0]) {
            var message_id = $('.main-container--wrapper').last().data('id');
          } else {
            return false
          }
          $.ajax({
              url: location.href,
              type: 'GET',
              data: { id: message_id },
              dataType: 'json'
            })
            .done(function(data) {
              if (data.length) {
                console.log('...reload');
                $.each(data, function(i, data) {
                  var html = messageHTML(data);
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