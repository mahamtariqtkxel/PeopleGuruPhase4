// start //

$(".progress_holder:nth-child(1)").addClass("activated_step");
$(".nextStep").click(function () {
  current_fs = $(this).parents("fieldset");
  next_fs = $(this).parents("fieldset").next();
  var empty = current_fs.find("input.required-field").filter(function () {
    return this.value === "";
  });
  if (empty.length) {
    alert("Please fill in all fields.");
  } else {
    next_fs.fadeIn(150, "linear").addClass("current");
    current_fs.fadeOut(0, "linear").removeClass("current");
    if ($(".pg-app-multistep-form.current").attr("id") == "step2") {
      $(".progress_holder:nth-child(2)").addClass("activated_step");
      $(".progress_holder:nth-child(1)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step3") {
      $(".progress_holder:nth-child(3)").addClass("activated_step");
      $(".progress_holder:nth-child(2)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step4") {
      $(".progress_holder:nth-child(4)").addClass("activated_step");
      $(".progress_holder:nth-child(3)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step5") {
      $(".progress_holder:nth-child(5)").addClass("activated_step");
      $(".progress_holder:nth-child(4)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step6") {
      $(".progress_holder:nth-child(6)").addClass("activated_step");
      $(".progress_holder:nth-child(5)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step7") {
      $(".progress_holder:nth-child(7)").addClass("activated_step");
      $(".progress_holder:nth-child(6)").removeClass("activated_step");
    }
    if ($(".pg-app-multistep-form.current").attr("id") == "step8") {
      $(".progress_holder:nth-child(8)").addClass("activated_step");
      $(".progress_holder:nth-child(7)").removeClass("activated_step");
    }
  }
});

// $(".progress_holder").click(function (e) {
//   $(".progress_holder:nth-child(1)").removeClass("activated_step");
// });

$(".prevStep").click(function (e) {
  e.preventDefault();
  current_fs = $(this).parents("fieldset");
  previous_fs = $(this).parents("fieldset").prev();
  //show the previous fieldset
  previous_fs.fadeIn(150, "linear");
  //hide the current fieldset with style
  current_fs.fadeOut(0, "linear");
  if ($(previous_fs).attr("id") == "step1") {
    $(".progress_holder:nth-child(2)").removeClass("activated_step");
    $(".progress_holder:nth-child(1)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step2") {
    $(".progress_holder:nth-child(3)").removeClass("activated_step");
    $(".progress_holder:nth-child(2)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step3") {
    $(".progress_holder:nth-child(4)").removeClass("activated_step");
    $(".progress_holder:nth-child(3)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step4") {
    $(".progress_holder:nth-child(5)").removeClass("activated_step");
    $(".progress_holder:nth-child(4)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step5") {
    $(".progress_holder:nth-child(6)").removeClass("activated_step");
    $(".progress_holder:nth-child(5)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step6") {
    $(".progress_holder:nth-child(7)").removeClass("activated_step");
    $(".progress_holder:nth-child(6)").addClass("activated_step");
  }
  if ($(previous_fs).attr("id") == "step7") {
    $(".progress_holder:nth-child(8)").removeClass("activated_step");
    $(".progress_holder:nth-child(7)").addClass("activated_step");
  }
});

// sidetabs
const closeEnrollTabs = document.querySelector(".pg-app-close-enroll-tabs");
const openEnrollTabs = document.querySelector(".pg-app-open-enroll-tabs");
const sideSection = document.querySelector(".side-section");
const closeAside = () => {
  sideSection.classList.add("pg-app-side-bar-collapse-enrollment");
};
const openAside = () => {
  sideSection.classList.remove("pg-app-side-bar-collapse-enrollment");
};
closeEnrollTabs.onclick = closeAside;
openEnrollTabs.onclick = openAside;

// enrollment
$(document).ready(function () {
  $(".btn-enroll").on("click", function (e) {
    $(".pg-plan-card").toggleClass("enrolled");
    e.preventDefault();
    if ($(".pg-plan-card").hasClass("enrolled")) {
      $(this).text(function (i, text) {
        return text === " Enroll" ? "Remove  Enrollment" : " Enroll";
      });
    }
  });
});

//compare plans
$(document).ready(function () {
  $("#compare-plans").on("click", function (e) {
    $(".pg-plan-card").toggleClass("pg-app-compare-plan-selected");
    e.preventDefault();
  });
});

// $(window).load(function(){
//   $('.loader').fadeOut(3000);
// });
