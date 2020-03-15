$(function(){
  var buildHTML = function (message){
    if (message.content && message.image) {
      var html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__detail">
          <div class="messages__detail--name">
            ${message.user_name}
          </div>
          <div class="messages__detail--create">
          ${message.created_at}
          </div>
        </div>
        <div class="messages__message">
          <p class="messages__message__content">
            ${message.content}
          </p>
          <img class="messages__message__image" src=${message.image} >
        </div>
      </div>`
    } else if (message.content) {
      var html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__detail">
          <div class="messages__detail--name">
            ${message.user_name}
          </div>
          <div class="messages__detail--create">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__message">
          <p class="messages__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = 
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__detail">
          <div class="messages__detail--name">
            ${message.user_name}
          </div>
          <div class="messages__detail--create">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__message">
          <img class="messages__message__image" src=${message.image} >
        </div>
      </div>`
    };
    return html;
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
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.new_message__submit-btn').prop('disabled', false);
    })
  });
  var reloadMessages = function(){
    var last_message_id = $('.messages:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight})
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});