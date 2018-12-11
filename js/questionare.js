var visType;

function SetTouristVisaType() {
	$('input[name=visa-type--questionary]')[0].checked = true;
	visType = 'tourist';
	$(".option-business").css("display", "none");
	$("#business-li").hide();
	$("#only-business-questionary--check").hide();
	$("#progressbar--questionary li").addClass("xsmall");
	$("#changed--questionary").html("Города посещений");
}

function SetBusinessVisaType() {
	$('input[name=visa-type--questionary]')[1].checked = true;
	visType = 'business';
	$(".option-business").css("display", "block");
	$("#business-li").show();
	$("#only-business-questionary--check").show();
	$("#progressbar--questionary li").removeClass("xsmall");
	$("#changed--questionary").html("Персональные данные");
}

function validateQuestionaryFields(id) {
  var flag = true;
  var last = id.toString().slice(-1);

  switch(last) {
  case '1':  //основные данные
    $("#"+id).find(':input').each(function() {
      var val = $(this).val();
      if (val == '') {
        $(this).addClass("error");
        flag = false;
      }
      else {
        if ( $(this).hasClass("error") ) {
          $(this).removeClass("error");
          flag = true;
        }

      }
    })
    break;

  case '2': // данные гостей
     $("#guest--questionary").find(':input').each(function() {
        var val = $(this).val();
        if (val == '') {
          $(this).addClass("error");
          flag = false;
        }
        else {
          if ( $(this).hasClass("error") ) {
            $(this).removeClass("error");
            flag = true;
          }

        }
      })
    break;
    case '3': // данные для бизнес-визы
    $("#personal--questionary").find(':input').each(function() {
      var val = $(this).val();
      if (val == '') {
        $(this).addClass("error");
        flag = false;
      }
      else {
        if ( $(this).hasClass("error") ) {
          $(this).removeClass("error");
          flag = true;
        }

      }
    })
    break;
    case '4': // города посещений
      var val = $("#questionary--cities").val();
      if (val == '') {
        $("#questionary--cities").addClass("error");
        flag = false;
      }
      else {
        if ( $("#questionary--cities").hasClass("error") ) {
          $("#questionary--cities").removeClass("error");
          flag = true;
        }

      }
    break;
}
  return flag;
}

// меняем тип визы по клику на радио-баттон
$("input:radio[name=visa-type--questionary]").change(function(){
  if ( $(this).attr('value') == 'tourist--visa')
    SetTouristVisaType();
  else 
	  SetBusinessVisaType()

});

$("#questionare").click(function(){
	ClearForm();
	$(".page-header").removeClass("page-header__sticky");
	SetTouristVisaType();
	$(".modal-questionairy").addClass("show-modal");
	$(".questionary--form").show().css('display', 'flex');
});

$(".questionary--close").click(function(){
	$(".page-header").addClass("page-header__sticky");
    $(".modal-questionairy").removeClass("show-modal");
	$("body").css("overflow", "auto");
})

$(".next--questionare").click(function(){
	current_fs = $(this).parent().parent();
	next_fs = $(this).parent().parent().next();
	if ( validateQuestionaryFields(current_fs.attr('id')) ) {
		if ( next_fs.attr('id') == "only-business--questionary" && visType == "tourist")  {
			next_fs = next_fs.next();
		}
		$("#progressbar--questionary li").eq($(".support--questionary").index(next_fs)).addClass("active");
		next_fs.show().css('display', 'flex');
		$(".modal-questionairy").animate({ scrollTop: 0 }, 0);
		if (current_fs.attr("id") == "questionary--step1") $("#questionary--step1").hide();
		else current_fs.hide();
	}
	else {
		alert("Убедитесь, что все поля заполнены верно!");
	}
});

$(".previous--questionare").click(function(){
	current_fs = $(this).parent().parent();
	previous_fs = $(this).parent().parent().prev();

  if ( previous_fs.attr('id') == "only-business--questionary" && visType == "tourist")  {
	  previous_fs.hide();
      previous_fs = previous_fs.prev();
  }

	//show the previous fieldset
	$(".modal-questionairy").animate({ scrollTop: 0 }, 0);
	previous_fs.show().css('display', 'flex');
  if(current_fs.attr("id") !== "questionary--step1") {
    $("#progressbar--questionary li").eq($(".support--questionary").index(current_fs)).removeClass("active");
    current_fs.hide();
  }
});

//редактирование раздела формы
$(".change--button").click(function(){
  var id = $(this).attr('id');
  $("#questionary--step5").hide();
  $("#questionary--step"+id).show();

  var bar = $("#progressbar--questionary").children();
  bar.each(function(index) {
    if (index >= id ) $(this).removeClass("active");
  })
})

function SetChecksFieldsPlace() {
	$(".questionary-cityzen--value").text($("#cityzen--questionary").val());
	var visa_type = $("input:radio[name=visa-type--questionary]:checked").val();
	if ( visa_type == "tourist--visa") {
	$(".questionary-visa_type--value").text("Туристическая поездка");
	}
	else {
	$(".questionary-visa_type--value").text("Деловая поездка");
	}
	$(".questionary-visa_long--value").text($("#visa-long--questionary option:selected").text());
	$(".questionary-come_in--value").text($("#come-in--questionary").val());
	$(".questionary-come_out--value").text($("#come-out--questionary").val());
  // закончили первое окно формы


  // второе окно - данные гостей
	$(".questionary-name--value").text($(".questionary--name").val());
	$(".questionary-surname--value").text($(".questionary--surname").val());
	$(".questionary-sex--value").text($("#questionary--sex option:selected").val());
	$(".questionary-birth--value").text($(".questionary--birth").val());
	$(".questionary-passport--value").text($(".questionary--passport").val());
	$(".questionary-pass-date--value").text($(".questionary--passport-date").val());



  // шаг 3 - только бизнес
	$(".questionary-birth-place--value").text($(".questionary--birth-place").val());
	$(".questionary-live-place--value").text($(".questionary--live-place").val());
	$(".questionary-work--value").text($(".questionary--work").val());
	$(".questionary-work-lng--value").text($(".questionary--work-lng").val());

  //step4
  $(".questionary-city_tour--value").text($("#questionary--cities").val());
}

// отслеживание введенных значений
$("#questionary-form").change(function() {
	SetChecksFieldsPlace();
})

var users_questionaries = [];

function ClearForm() {
	$('form[name=questionary-form]').trigger('reset');
	$("#questionary--step5").hide();
	$("#questionary--step1").show();	
	var bar = $("#progressbar--questionary").children();
	bar.each(function(index) {
		if (index >= 1 ) $(this).removeClass("active");
	});
	$("#delete-quest").addClass("check--no-link");
	$(".questionary--send").prop("id", '');
}

function AddNamedButton (name, surname, length) {
	var button_id = "user__" + length;
	 $(".service--tourist").append("<button class='button button__colored button__named' id=" + button_id +">" + name+ " " + surname + "</button>");
	 if ($("#visa__checkbox").hasClass("checked") == false) $("#visa__checkbox").addClass("checked");
}

function ChangeNamedButton(name, surname, id) {
	var button_id = "user__" + id;
	console.log($('.service--tourist').find('#'+button_id));
	 $('.service--tourist').find('#'+button_id).html(name + ' ' + surname);
	 console.log($('.service--tourist').find('#'+button_id).html(name + ' ' + surname));
}

// собираем массив со значениями формы
$(".questionary--send").click(function() {
	var questionary = [$("#cityzen--questionary").val(), $("input:radio[name=visa-type--questionary]:checked").val(), $("#visa-long--questionary option:selected").text(), $("#come-in--questionary").val(), $("#come-out--questionary").val(), $(".questionary--name").val(), $(".questionary--surname").val(), $("#questionary--sex option:selected").val(), $(".questionary--birth").val(), $(".questionary--passport").val(), $(".questionary--passport-date").val(), $(".questionary--birth-place").val(), $(".questionary--live-place").val(), $(".questionary--work").val(), $(".questionary--work-lng").val(), $("#questionary--cities").val()];
	if ($(this).attr("id") == undefined || $(this).attr("id") == '') {
		users_questionaries.push(questionary);
		var length = users_questionaries.length-1;
		AddNamedButton($(".questionary--name").val(), $(".questionary--surname").val(), length);	
	}	
	else {
		var id = $(this).attr("id").substr(10);
		users_questionaries[id] = questionary;
		ChangeNamedButton($(".questionary--name").val(), $(".questionary--surname").val(), id);
	}
	ClearForm();
	$(".page-header").addClass("page-header__sticky");
    $(".modal-questionairy").removeClass("show-modal");
	$("body").css("overflow", "auto");
})

// вывзваем редактирование анкеты. Простой click() не работает на сгенерированном элементе
$("body").on("click", ".button__named", function() {
	var id = $(this).attr("id").substr(6);
	var questionary = users_questionaries[id];
		if (questionary[1] == "tourist--visa") {
		SetTouristVisaType();
	}
	else {
		SetBusinessVisaType();
	}
	$("#cityzen--questionary").val(questionary[0]);
	if (questionary[1] == "tourist--visa") {$('input[name=visa-type--questionary]')[0].checked = true;}
	else { $('input[name=visa-type--questionary]')[1].checked = true;}
	$('#visa-long--questionary option[value="' + questionary[2] + '"]').prop('selected', true);
	$("#come-in--questionary").val(questionary[3]);
	$("#come-out--questionary").val(questionary[4]);
	$(".questionary--name").val(questionary[5]);
	$(".questionary--surname").val(questionary[6]);
	$('#questionary--sex option[value="' + questionary[7] + '"]').prop('selected', true);
	$(".questionary--birth").val(questionary[8]);
	$(".questionary--passport").val(questionary[9]);
	$(".questionary--passport-date").val(questionary[10]);
	$(".questionary--birth-place").val(questionary[11]);
	$(".questionary--live-place").val(questionary[12]);
	$(".questionary--work").val(questionary[13]);
	$(".questionary--work-lng").val(questionary[14]);
	$("#questionary--cities").val(questionary[15])
	SetChecksFieldsPlace();
	$("#questionary--step5").show();
	$("#questionary--step1").hide();	
	var bar = $("#progressbar--questionary").children();
	bar.each(function(index) {
		if (index >= 1 ) $(this).addClass("active");
	});
	$(".modal-questionairy").animate({ scrollTop: 0 }, 0);
	$("#delete-quest").removeClass("check--no-link");
	$(".del--button").prop("id", "del-"+$(this).attr("id"));
	$(".questionary--send").prop("id", "chn-"+$(this).attr("id"));
	
	
	$(".modal-questionairy").addClass("show-modal");
	$(".questionary--form").show().css('display', 'flex');
	
})

$(".del--button").click(function() {
	var id = $(this).attr("id").substr(10);
	var user = $(this).attr("id").substr(4);
	delete users_questionaries[id];
	ClearForm();
	$(".page-header").addClass("page-header__sticky");
    $(".modal-questionairy").removeClass("show-modal");
	$("body").css("overflow", "auto");
	$("#"+user).remove();
	if ($(".service--tourist").find("button").length == 0) $("#visa__checkbox").removeClass("checked");
	
})