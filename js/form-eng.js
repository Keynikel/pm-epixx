var visa_type;

// открывашка вопросов faq
$(".visa--question").click(function() {
  var id  = $(this).attr("id");
  $("#"+id+"--ans").toggle();
  $("#"+id+"--but").toggleClass("button-arrow__down");
});

//обработка формы задать вопрос
$('#superior').submit(function(e) {
  var $form = $(this);
  $.ajax({
    type: "POST",
    url: "source/ask.php",
    data: $form.serialize(),
    success: function(data){
      $(".superior").hide();
	  $(".spetial--header").text("Thanks for your message.");
    }
  });
  e.preventDefault();
});

$(".visa--close").click(function(){
    $(".page-header").addClass("page-header__sticky");
    $(".modal-visa").removeClass("show-modal");
	$("body").css("overflow", "auto");
})

//обработчики кнопок с типом визы
$(".tourist-visa").click(function() {
  $('input[name=visa-type--radio]')[0].checked = true;
  $(".option-business").css("display", "none");
  $(".only-busines").hide();
  $("#only-business-div").hide();
  $(".progressbar li").removeClass("small");
  visa_type = "tourist--visa";
  $(".visa--form").show().css('display', 'flex');
  $(".modal-visa").animate({ scrollTop: 0 }, 0);
})
$(".business-visa").click(function() {
  $('input[name=visa-type--radio]')[1].checked = true;
  $(".option-business").css("display", "block");
  $(".only-busines").show();
  $(".progressbar li").addClass("small");
  visa_type = "business--visa";
  $(".visa--form").show().css('display', 'flex');
  $(".modal-visa").animate({ scrollTop: 0 }, 0);
  $("#changed").html("Personal Data");
})


// переход к следующему разделу большой формы
$(".next").click(function(){
  current_fs = $(this).parent().parent();
  next_fs = $(this).parent().parent().next();
  if ( validateFields(current_fs.attr('id')) ) {
    showGuests();
    if ( next_fs.attr('id') == "only-business-div" && visa_type == "tourist--visa")  {
      next_fs = next_fs.next();
    }
    $(".progressbar li").eq($(".support--fs").index(next_fs)).addClass("active");
    next_fs.show().css('display', 'flex');
	$(".modal-visa").animate({ scrollTop: 0 }, 0);
    if (current_fs.attr("id") == "step1") $("#step1").hide();
    else current_fs.hide();
  }
  else {
    alert("Make sure that all fields are filled correctly!");
  }
});

// переход к предыдущемы разделу большой формы
$(".previous--button").click(function(){
	current_fs = $(this).parent().parent();
	previous_fs = $(this).parent().parent().prev();

  if ( previous_fs.attr('id') == "only-business-div" && visa_type == "tourist--visa")  {
      previous_fs = previous_fs.prev();
  }

	//show the previous fieldset
	previous_fs.show().css('display', 'flex');
	$(".modal-visa").animate({ scrollTop: 0 }, 0);
  if(current_fs.attr("id") !== "step1") {
    $("#progressbar li").eq($(".support--fs").index(current_fs)).removeClass("active");
    current_fs.hide();
  }
});

// меняем тип визы по клику на радио-баттон
$("input:radio[name=visa-type--radio]").change(function(){
  if ( $(this).attr('value') == 'tourist--visa') {
    $(".only-busines").hide();
    $(".progressbar li").removeClass("small");
    $("#changed").html("List of Cities");

  }
  else {
  $(".only-busines").show();
  $(".option-business").css("display", "block");
  $(".progressbar li").addClass("small");
  visa_type = "business--visa";
  $("#changed").html("Personal data");
  }

  visa = $(this).attr('value');
});

$(".callback--button").click(function() {
  $("#callback--comment").removeClass("visually-hidden");
  $(this).hide();
});

//редактирование раздела формы
$(".change--button").click(function(){
  var id = $(this).attr('id');
  $("#step5").hide();
  $("#step"+id).show();

  var bar = $("#progressbar").children();
  bar.each(function(index) {
    if (index >= id ) $(this).removeClass("active");
  })
})

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var visa;

function showGuests() {
  var id = $("#visa--gests").val();
    if (id == 1) {
    $("#guest-2").hide();
    $("#guest-3").hide();
    $("#guest-4").hide();
    $("#personal-2").hide();
    $("#personal-3").hide();
    $("#personal-4").hide();

    $("#guest2-info").hide();
    $("#guest3-info").hide();
    $("#guest4-info").hide();
    $("#personal2-info").hide();
    $("#personal3-info").hide();
    $("#personal4-info").hide();
  }
    if (id == 2) {
    $("#guest-2").show();
    $("#guest-3").hide();
    $("#guest-4").hide();
    $("#personal-2").show();
    $("#personal-3").hide();
    $("#personal-4").hide();

    $("#guest2-info").show();
    $("#guest3-info").hide();
    $("#guest4-info").hide();
    $("#personal2-info").show();
    $("#personal3-info").hide();
    $("#personal4-info").hide();
  }
    if (id == 3) {
    $("#guest-2").show();
    $("#guest-3").show();
    $("#guest-4").hide();
    $("#personal-2").show();
    $("#personal-3").show();
    $("#personal-4").hide();

    $("#guest2-info").show();
    $("#guest3-info").show();
    $("#guest4-info").hide();
    $("#personal2-info").show();
    $("#personal3-info").show();
    $("#personal4-info").hide();
  }
    if (id == 4) {
    $("#guest-2").show();
    $("#guest-3").show();
    $("#guest-4").show();
    $("#personal-2").show();
    $("#personal-3").show();
    $("#personal-4").show();

    $("#guest2-info").show();
    $("#guest3-info").show();
    $("#guest4-info").show();
    $("#personal2-info").show();
    $("#personal3-info").show();
    $("#personal4-info").show();
  }
}

$("#visa-support-form").change(function() {

})

function validateFields(id) {
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
  var count = $("#visa--gests option:selected").val();
    for ( var i=1; i<=count; i++ ) {
      $("#"+id+" #guest-"+i).find(':input').each(function() {
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
    }
    break;
    case '3': // данные для бизнес-визы
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
    case '4': // города посещений
      var val = $("#visa--cities").val();
      if (val == '') {
        $("#visa--cities").addClass("error");
        flag = false;
      }
      else {
        if ( $("#visa--cities").hasClass("error") ) {
          $("#visa--cities").removeClass("error");
          flag = true;
        }

      }
    break;
}
  return flag;
}


var cityzen;
var visa_type;
var visa_long;
var come_in;
var come_out;
var gests_count;
var name1; var name2; var name3; var name4;
var surname1; var surname2; var surname3; var surname4;
var sex1; var sex2; var sex3; var sex4;
var birth1; var birth2; var birth3; var birth4;
var pass1; var pass2; var pass3; var pass4;
var pass_date1; var pass_date2; var pass_date3; var pass_date4;
var birth_place1; var birth_place2; var birth_place3; var birth_place4;
var live_place1; var live_place2; var live_place3; var live_place4;
var work1; var work2; var work3; var work4;
var work_lng1; var work_lng2; var work_lng3; var work_lng4;
var sities;



// отслеживание формы заказа визы
$("#visa-support-form").change(function() {
  cityzen = $("#cityzen").val();
  $(".cityzen").text(cityzen);
  visa_type = $("input:radio[name=visa-type--radio]:checked").val();
  if ( visa_type == "tourist--visa") {
    $(".option-business").hide();
    $(".visa_type").text("Tourist trip");
  }
  else {
    $(".option-business").show();
    $(".visa_type").text("Business trip");
  }

  visa_long = $("#visa--type option:selected").text();
  $(".visa_long").text(visa_long);
  come_in = $("#come-in--date").val();
  $(".come_in").text(come_in);
  come_out = $("#come-out--date").val();
  $(".come_out").text(come_out);
  gests_count = $("#visa--gests option:selected").val();
  $(".guest_count").text($("#visa--gests option:selected").text());
  // закончили первое окно формы


  // второе окно - данные гостей
  name1 = $(".visa--name").val();
  $("#guest1-info .guest-name").text(name1);
  surname1 = $(".visa--surname").val();
  $("#guest1-info .guest-surname").text(surname1);
  sex1 = $("#visa--sex option:selected").val();
  $("#guest1-info .guest-sex").text(sex1);
  birth1 = $(".visa--birth").val();
  $("#guest1-info .guest-birth").text(birth1);
  pass1 = $(".visa--passport").val();
  $("#guest1-info .guest-passport").text(pass1);
  pass_date1 = $(".visa--passport-date").val();
  $("#guest1-info .guest-pass-date").text(pass_date1);


  name2 = $("#guest-2 .visa--name").val();
    $("#guest2-info .guest-name").text(name2);
  surname2 = $("#guest-2 .visa--surname").val();
    $("#guest2-info .guest-surname").text(surname2);
  sex2 = $("#guest-2 #visa--sex option:selected").val();
    $("#guest2-info .guest-sex").text(sex2);
  birth2 = $("#guest-2 .visa--birth").val();
    $("#guest2-info .guest-birth").text(birth2);
  pass2 = $("#guest-2 .visa--passport").val();
    $("#guest2-info .guest-passport").text(pass2);
  pass_date2 = $("#guest-2 .visa--passport-date").val();
    $("#guest2-info .guest-pass-date").text(pass_date2);

  name3 = $("#guest-3 .visa--name").val();
    $("#guest3-info .guest-name").text(name3);
  surname3 = $("#guest-3 .visa--surname").val();
    $("#guest3-info .guest-surname").text(surname3);
  sex3 = $("#guest-3 #visa--sex option:selected").val();
    $("#guest3-info .guest-sex").text(sex3);
  birth3 = $("#guest-3 .visa--birth").val();
    $("#guest3-info .guest-birth").text(birth3);
  pass3 = $("#guest-3 .visa--passport").val();
    $("#guest3-info .guest-passport").text(pass3);
  pass_date3 = $("#guest-3 .visa--passport-date").val();
    $("#guest3-info .guest-pass-date").text(pass_date3);

  name4 = $("#guest-4 .visa--name").val();
    $("#guest4-info .guest-name").text(name4);
  surname4 = $("#guest-4 .visa--surname").val();
    $("#guest4-info .guest-surname").text(surname4);
  sex4 = $("#guest-4 #visa--sex option:selected").val();
    $("#guest4-info .guest-sex").text(sex4);
  birth4 = $("#guest-4 .visa--birth").val();
    $("#guest4-info .guest-birth").text(birth4);
  pass4 = $("#guest-4 .visa--passport").val();
    $("#guest4-info .guest-passport").text(pass4);
  pass_date4 = $("#guest-4 .visa--passport-date").val();
    $("#guest4-info .guest-pass-date").text(pass_date4);


  // шаг 3 - только бизнес
  birth_place1 = $("#personal-1 .visa--birth-place").val();
    $("#personal1-info .birth-place").text(birth_place1);
  live_place1 = $("#personal-1 .visa--live-place").val();
    $("#personal1-info .live-place").text(live_place1);
  work1 = $("#personal-1 .visa--work").val();
    $("#personal1-info .work").text(work1);
  work_lng1 = $("#personal-1 .visa--work-lng").val();
    $("#personal1-info .work-lng").text(work_lng1);

  birth_place2 = $("#personal-2 .visa--birth-place").val();
    $("#personal2-info .birth-place").text(birth_place2);
  live_place2 = $("#personal-2 .visa--live-place").val();
    $("#personal2-info .live-place").text(live_place2);
  work2 = $("#personal-2 .visa--work").val();
    $("#personal2-info .work").text(work2);
  work_lng2 = $("#personal-2 .visa--work-lng").val();
    $("#personal2-info .work-lng").text(work_lng2);

  birth_place3 = $("#personal-3 .visa--birth-place").val();
    $("#personal3-info .birth-place").text(birth_place3);
  live_place3 = $("#personal-3 .visa--live-place").val();
    $("#personal3-info .live-place").text(live_place3);
  work3 = $("#personal-3 .visa--work").val();
    $("#personal3-info .work").text(work3);
  work_lng3 = $("#personal-3 .visa--work-lng").val();
    $("#personal3-info .work-lng").text(work_lng3);

  birth_place4 = $("#personal-4 .visa--birth-place").val();
    $("#personal4-info .birth-place").text(birth_place4);
  live_place4 = $("#personal-4 .visa--live-place").val();
    $("#personal4-info .live-place").text(live_place4);
  work4 = $("#personal-4 .visa--work").val();
    $("#personal4-info .work").text(work4);
  work_lng4 = $("#personal-4 .visa--work-lng").val();
    $("#personal4-info .work-lng").text(work_lng4);


  //step4
  sities = $(".visa--cities").val();
  $(".city_tour").text(sities);
})

$(".visa--close").click(function(){
    $(".page-header").addClass("page-header__sticky");
    $(".modal-visa").removeClass("show-modal");
})