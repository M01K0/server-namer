function rest(method, data) {
  method = method || "GET";
  data = data || {};
  var id = data['id'],
      url = "/store/" + ((id) ? id : '');

  return $.ajax({
    url: url,
    contentType: "application/json",
    type: method,
    data: JSON.stringify(data),
    dataType: "json"
  })
}

$(document).ready(function() {

  var serverNameInput = $('.js-name');
  var serverList = $('.js-server-list');
  var servers = [];

  function _renderServers() {
     serverList.html(`<ul class="server-list">${ servers.map(_renderServer).join('') }</ul>`);
  }

  function _renderServer(server) {
    return `<li class="server"><input class="server-name js-server-name" value="${server.name}" data-id="${server.id}"></li>`;
  }

  rest().done(function (data) {
    servers = data;
    _renderServers();
  });

  $.get({
    url: '/server-name'
  }).done(function(data) {
    $('.js-example').text(data.name);
  });

  _renderServers();

  $('.js-add').on('click', function () {
    rest('POST', { name: serverNameInput.val() }).done(function (server) {
      servers.push(server);
      _renderServers();
    });
  });

  serverList.on('blur', '.js-server-name', function (event) {
    var element = $(this);

    rest('PUT', {
      id: element.data('id'),
      name: element.val()
    });
  })

});
