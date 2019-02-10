$(function() {
  var user_to_search_result = $("#user-search-result");
  var member_to_search_result = $("#member-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    user_to_search_result.append(html);
  }

  function appendNoUser(user) {
    var html = ``;
    user_to_search_result.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
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
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    $(document).on("click", ".user-search-add", function() {
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      $(this).parent().remove();
      var memberHtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                          <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                          <p class='chat-group-user__name'>${user_name}</p>
                          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                        </div>`;
      member_to_search_result.append(memberHtml);
    });
  });
  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function() {
    $(this).parent().remove();
  });
})