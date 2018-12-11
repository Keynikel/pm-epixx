$(".ask-question--button").click(function() {
  $(".visa--questions").hide();
  $(".question--ask").show();
});

$(".see-answers--button").click(function() {
  $(".visa--questions").show();
  $(".question--ask").hide();
});

// открывашка вопросов faq
$(".visa--question").click(function() {
  var id  = $(this).attr("id");
  $("#"+id+"--ans").toggle();
  $("#"+id+"--but").toggleClass("button-arrow__down");
});