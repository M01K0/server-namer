function rest(method, data) {
  method = method || "GET";
  data = data || {};
  var id = data['id'],
      url = "/store/" + ((id) ? id : '');

  $.ajax({
    url: url,
    contentType: "application/json",
    type: method,
    data: JSON.stringify(data),
    dataType: "json"
  }).done(function(data) {
    console.log('success', data);
  }).fail(function(xhr, textStatus, error) {
    console.log("ERROR", xhr.responseText);
  });
}

$(document).ready(function() {

  console.log("document ready");

});
