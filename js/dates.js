//минимальная дата отъезда - сегодня
$('#come-in--date').prop('min', function(){
	return new Date().toJSON().split('T')[0];
});

$('#come-in--questionary').prop('min', function(){
	return new Date().toJSON().split('T')[0];
});

//минимальное значение возвращения - значение отъезда
$('#come-in--date').on("change", function() {
	$('#come-out--date').prop('min', $('#come-in--date').val());
})
	
$('#come-in--questionary').on("change", function() {
	$('#come-out--questionary').prop('min', $('#come-in--questionary').val());
})
    

//максимальная дата рождения - сегодня
  $('.visa--birth').prop('max', function(){
      return new Date().toJSON().split('T')[0];
  });
  
   $('.questionary--birth').prop('max', function(){
      return new Date().toJSON().split('T')[0];
  });

//минимальная дата паспорта - сегодня
$('.visa--passport-date').prop('min', function(){
    return new Date().toJSON().split('T')[0];
});

$('.questionary--passport-date').prop('min', function(){
    return new Date().toJSON().split('T')[0];
});

$("input[name='visa--name']").on("keypress", function(e) {
  var char = /["a-zA-Z]/;
  var val = String.fromCharCode(e.which);
  var test = char.test(val);

  if(!test) return false
})

$("input[name='visa--surname']").on("keypress", function(e) {
  var char = /["a-zA-Z]/;
  var val = String.fromCharCode(e.which);
  var test = char.test(val);

  if(!test) return false
})


$("input[name='questionary--name']").on("keypress", function(e) {
  var char = /["a-zA-Z]/;
  var val = String.fromCharCode(e.which);
  var test = char.test(val);

  if(!test) {
	  $(".hint--lang").show();
	  return false;
  }
  else $(".hint--lang").hide();
})

$("input[name='questionary--surname']").on("keypress", function(e) {
  var char = /["a-zA-Z]/;
  var val = String.fromCharCode(e.which);
  var test = char.test(val);

  if(!test) {
	  $(".hint--lang").show();
	  return false;
  }
  else $(".hint--lang").hide();
})

$("input[name='questionary--work']").on("keypress", function(e) {
  var char = /["а-яА-Я]/;
  var val = String.fromCharCode(e.which);
  var test = char.test(val);

  if(!test) {
	  $(".hint--lang").show();
	  return false;
  }
  else $(".hint--lang").hide();
})