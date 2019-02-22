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
});
