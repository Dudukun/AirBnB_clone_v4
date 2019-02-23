$(document).ready(function () {
  $(".amenities UL LI INPUT").css("margin-right", "10px");
  let id_dict = {}
  $('input[type="checkbox"]').click(function () {

    if ($(this).is(":checked")) {
      id_dict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(":not(:checked)")) {
      delete id_dict[$(this).attr('data-id')];
    }
    let alist = [];
    for (let k in id_dict) {
      alist.push(id_dict[k]);
    }
    $('.amenities h4').text(alist.join(", "));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass("available");
    } else {
      $('DIV#api_status').toggleClass("available");
    }
  });
});
