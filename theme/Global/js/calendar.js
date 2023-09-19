// month, week , day dropdown Tabs//
//hide all tabs first
$(".pg-app-tabs-content-dropdown").hide();
//show the first tab content
$("#pg-app-tab-1").show();

$("#pg-app-select-box").change(function () {
  dropdown = $("#pg-app-select-box").val();
  //first hide all tabs again when a new option is selected
  $(".pg-app-tabs-content-dropdown").hide();
  //then show the tab content of whatever option value was selected
  $("#" + "pg-app-tab-" + dropdown).show();
});

//select all checkboxes
$("#pg-app-checkall").click(function () {
  $(".form-check-input").prop("checked", $(this).prop("checked"));
});
// view conflicts click event//
window.onload = function () {
  document
    .getElementById("pg-app-calwrap")
    .addEventListener("click", function () {
      //Get div1's style
      var div1 = document.getElementById("div1").className;
      if (div1 == "col-12") {
        document.getElementById("div1").className = "col-12";
        document.getElementById("pg-app-div2").className = "col-12 pg-app-hide";
      } else {
        document.getElementById("div1").className = "col-6";
        document.getElementById("pg-app-div2").className = "col-6 pg-app-show";
        document.getElementById("div3").className = "pg-app-wide-width";
        document.getElementById("div4").className = "pg-app-hide";
      }
    });
};

// ck-editor-pg-app-calendar-modal//

ClassicEditor.create(document.querySelector("#editor")).catch((error) => {
  console.error(error);
});
ClassicEditor.create(document.querySelector("#editors")).catch((error) => {
  console.error(error);
});
