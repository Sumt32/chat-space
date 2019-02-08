$(function() {
  var user_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
               </div>`
    user_list.append(html);
  }

  function appendNoUser(user) {
    var html = ``
    user_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $(".chat-group-user").empty();
        if (users.length !== 0) {
          users.forEach(function(users) {
            appendUser(users);
          });
        } else {
          return false;
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    $(document).on("click", ".user-search-add", function() {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      console.log(id);
      console.log(name);
      console.log(this);
      $(this).parent().remove();
    });
  });
})