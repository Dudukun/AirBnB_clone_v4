$(document).ready(function () {
  $(".amenities UL LI INPUT").css("margin-right", "10px");
  let id_dict = {}
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(":checked")) {
      id_dict[$(this).attr('data-id')] = 1;
    } else if ($(this).is(":not(:checked)")) {
      delete id_dict[$(this).attr('data-id')];
    }
  });
});
