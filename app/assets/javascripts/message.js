$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="messages">
          <div class="messages__detail">
            <div class="messages__detail--name">
              ${message.user_name}
            </div>
            <div class="messages__detail--create">
              ${message.created_at}
            </div>
          </div>
          <div class="messages_-message">
            <p class="messages__message__content">
              ${message.content}
            </p>
          </div>
          <img class="messages__message__image" src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="messages">
          <div class="messages__detail">
            <div class="messages__detail--name">
              ${message.user_name}
            </div>
            <div class="messages__detail--create">
              ${message.created_at}
            </div>
          </div>
          <div class="messages_-message">
            <p class="messages__message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.new_message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});