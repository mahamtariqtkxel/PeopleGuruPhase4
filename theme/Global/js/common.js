//SideBar Toggle
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".menu-collapse");
const sideBar = document.querySelector(".sidebar");
const navList = document.querySelector(".nav-list");
const mainArea = document.querySelector(".main");
const openMenu = () => {
  sideBar.classList.remove("sidebar-collapse");
  sideBar.classList.add("sidebar-open");
  mainArea.classList.remove("main-close");
  mainArea.classList.add("main-open");
  openMenuBtn.classList.remove("open-menu-visible");
};
const closeMenu = () => {
  sideBar.classList.remove("sidebar-open");
  sideBar.classList.add("sidebar-collapse");
  mainArea.classList.remove("main-open");
  mainArea.classList.add("main-close");
  openMenuBtn.classList.add("open-menu-visible");
};
openMenuBtn.onclick = openMenu;
closeMenuBtn.onclick = closeMenu;

//Employee Select
var dropText = document.querySelector(".employee-dropdown-text");
var dropDownArea = document.querySelector(".employee-dropdown");
let searchInput = document.querySelector("#filter-search");
var dropDownBtn = document.querySelector(".employee-select");
var dropDown = document.querySelector(".header-dropdown");
var dropdownElement = document.querySelector(".dropdown-element");
dropdownElement &&
  dropdownElement.addEventListener("click", function (e) {
    var something = e.target.closest("li");
    dropDownBtn.innerHTML = something.innerHTML;
    dropDown.classList.remove("show");
  });

dropDownBtn &&
  dropDownBtn.addEventListener("click", function (e) {
    dropDown.classList.toggle("show");
  });
dropDownArea &&
  document.addEventListener("click", function (e) {
    var isClickedInside = dropDownArea.contains(e.target);
    if (!isClickedInside) {
      dropDown.classList.remove("show");
    }
  });
dropDownArea && searchInput.addEventListener("keyup", search);
let titles = document.querySelectorAll(".element");
let searchTerm = "";
let tit = "";
function search(e) {
  searchTerm = e.target.value.toLowerCase();
  titles.forEach((title) => {
    tit = title.children[1].innerHTML.toLowerCase();
    tit.includes(searchTerm)
      ? (title.style.display = "flex")
      : (title.style.display = "none");
  });
}

//Tabs
var tabBtn = document.querySelector(".tabs");
const actionTab = document.querySelectorAll(".action-tab");
var tabContents = document.querySelectorAll(".pg-app-tabs-content");
const switchTabs = document.querySelector(".switch-tabs");
const peopleTab = document.querySelector(".people-tab");
var switchActionTab = document.querySelectorAll(".switch-tab-item");
var listView = document.querySelector(".list-view");
var gridView = document.querySelector(".grid-view");
var multiSelect = document.querySelector(".dstatus");
var fitlerResults = document.querySelector(".filter-results");
tabBtn &&
  tabBtn.addEventListener("click", function (e) {
    let tabClicked = e.target.closest("li");

    if (tabClicked === peopleTab) {
      switchTabs && switchTabs.classList.add("switch-tabs-show");
    } else {
      switchTabs && switchTabs.classList.remove("switch-tabs-show");
    }
    actionTab.forEach((tab) => tab.classList.remove("active-sub-items"));
    tabClicked.classList.add("active-sub-items");
    let tabContent = document.querySelector(
      `.pg-app-tabs-content-section .tabs-content-${tabClicked.dataset.tab}`
    );
    tabContents.forEach((content) =>
      content.classList.remove("pg-app-tabs-content-active")
    );
    tabContent.classList.add("pg-app-tabs-content-active");
  });
switchTabs &&
  switchTabs.addEventListener("click", function (e) {
    let tabClicked = e.target;
    console.log(tabClicked);
    switchActionTab.forEach((tab) => tab.classList.remove("switch-tab-active"));
    tabClicked.closest("li").classList.add("switch-tab-active");
    if (tabClicked.closest("li").classList.contains("switch-grid-tab")) {
      gridView.classList.add("view-active");
      listView.classList.remove("view-active");
    } else {
      listView.classList.add("view-active");
      gridView.classList.remove("view-active");
    }
  });
const addBtn = document.querySelector(".widget-btn-add");
const addedBtn = document.querySelector(".widget-btn-added");

addBtn &&
  addBtn.addEventListener("click", function (e) {
    addBtn.classList.remove("widget-btn-show");
    addedBtn.classList.add("widget-btn-show");
  });
//Dashboard Dropdown JS
const dText = document.querySelector(".dashboard-text");
const dDropdown = document.querySelector(".dashboard-dropdown-menu");

dDropdown &&
  dDropdown.addEventListener("click", function (e) {
    const clicked = e.target.closest("a");
    console.log(clicked.innerText);
    dText.innerText = clicked.innerText;
  });
// dropdown
document.querySelectorAll(".nav-link").forEach(function (element) {
  element.addEventListener("click", function (e) {
    let nextEl = element.nextElementSibling;
    let parentEl = element.parentElement;
    if (nextEl) {
      e.preventDefault();
      let mycollapse = new bootstrap.Collapse(nextEl);
      if (nextEl.classList.contains("show")) {
        mycollapse.hide();
      } else {
        mycollapse.show();
        var opened_submenu =
          parentEl.parentElement.querySelector(".submenu.show");
        if (opened_submenu) {
          new bootstrap.Collapse(opened_submenu);
        }
      }
    }
  });
});

// add  ande remove poll options

// recruitment phase add more documents
$(document).ready(function () {
  var count = 3;
  $("#addmore").click(function () {
    $("#pollOption").append(
      '<div class="row added-option"> <div class="col-xl-6 col-lg-6"> <div class="pg-app-append-input  pg-form ">' +
        '  <label for="option" class="pg-mb-6 ">Document Type  <span id="clicks"> ' +
        "</span></label>" +
        '<input type="text" class="form-control" placeholder="Type here" />' +
        '<button class="remove-option pg-app-Rp-addNewDocBtn mt-0">Remove Document</button>' +
        '</div></div><div class="col-xl-6 col-lg-6"> <div class="pg-app-append-input  pg-form ">' +
        '  <label for="option" class="pg-mb-6 ">Document Type  <span id="clicks"> ' +
        "</span></label>" +
        '<select class="form-select pg-app-form-select" aria-label="Default select example"> <option selected="">Choose Type</option> + <option value="1">Option 1</option><option value="2">Option 2</option></select>' +
        "</div></div> </div>"
    );

    // Attach a click event listener to the remove button of each added option
    $(".added-option .remove-option").click(function () {
      $(this).closest(".added-option").remove();
    });
  });

  $("body").on("click", ".pg-app-removeInputt", function () {
    $(this).closest("div .pg-form").remove();
  });
});

// recognize item selected modalsssss
$(document).ready(function () {
  $(".pg-app-recognize-card").click(function (event) {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    event.preventDefault();
    $("#aniversiryModal").modal("show");
    $("#recognizeModal").modal("hide");
  });
  // expense moda;
  $(".add-expense").click(function (event) {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    event.preventDefault();
    $("#expenseAdd").modal("show");
    $("#expenseAction").modal("hide");
  });
  $("#open-guest-filters").click(function () {
    $(".pg-app-guestFilters").show();
  });
  $("#close-guest-filters").click(function () {
    $(".pg-app-guestFilters").hide();
  });
  $(".exploder").click(function () {
    $(this).closest(".sub-container").toggleClass("pg-app-active-row");
    $(this).toggleClass("pg-app-open-row");

    $(this).closest("tr").next("tr").toggleClass("hide");

    if ($(this).closest("tr").next("tr").hasClass("hide")) {
      $(this).closest("tr").next("tr").children("td").slideUp();
    } else {
      $(this).closest("tr").next("tr").children("td").slideDown(350);
    }
  });
  $(".pg-app-expandable-title").click(function () {
    $(".pg-app-offered-benefits--table").slideToggle();
    $(this).toggleClass("pg-app-open-table");
  });
});
// Organizational Charts
$(document).ready(function () {
  $(".pg-app-genealogy-tree ul").slideUp("slow");
  $(".pg-app-genealogy-tree>ul").slideDown("slow");
  $(".pg-app-genealogy-tree li").on("click", function (e) {
    $(".top-parent").removeClass("active");
    $(".top-parent").addClass("inactive");
    $(this).closest(".top-parent").addClass("active");
    $(this).closest(".top-parent").removeClass("inactive");

    var children = $(this).find("> ul");
    if (children.is(":visible")) {
      children.hide().removeClass("active");
    } else {
      children.show().addClass("active");
    }
    if ($(this).hasClass("top-parent") && $(this).find("> ul").is(":hidden")) {
      $(this).closest(".top-parent").addClass("inactive");
      $(this).closest(".top-parent").removeClass("active");
      $(".top-parent").removeClass("inactive");
    }
    $(".pg-app-genealogy-tree ul > li.inactive ul").hide();
    // console.log(
    //   $(".pg-app-organizational-charts--container").width() +
    //     " Parent container size"
    // );
    // console.log($(".pg-app-genealogy-tree").width() + " container size");
    // console.log($(this).offset().left + " element position");
    // console.log($(".genealogy-body").scrollLeft() + " scroll position");
    // console.log("<<<<<====>>>>>");
    let parentContainer = $(".pg-app-organizational-charts--container").width();
    let bodyContainer = $(".pg-app-genealogy-tree").width();
    let elementPosition = $(this).offset().left;
    let scrollAmount = $(".genealogy-body").scrollLeft();
    let element_container_differnce = parentContainer - elementPosition;
    if (element_container_differnce < 200 && bodyContainer > parentContainer) {
      $(".genealogy-body").animate({ scrollLeft: scrollAmount + 300 }, 800);
    }
    return false;
    e.stopPropagation();
  });

  $("#genealogy-body").contentZoomSlider({
    toolContainer: ".pg-app-zoom-tool-bar",
  });
});

// poll percetage
$(document).ready(function () {
  $(".poll-list").click(function () {
    $(".poll-item").hide();
    $(".bar").show();
  });
});

$(".fake-parent button").click(function () {
  let parent = $(this).data("fakeparent");
  // alert(parent);
  $("#" + parent).click();
});

//alert tabs
const alertTabs = document.querySelector(".pg-app-alert-tab");
var actiontab = document.querySelectorAll(".pg-app-alert-tab-item");
var listView = document.querySelector(".list-view");
var gridView = document.querySelector(".grid-view");
alertTabs &&
  alertTabs.addEventListener("click", function (e) {
    let tabClicked = e.target;
    actiontab.forEach((tab) => tab.classList.remove("pg-app-alert-tab-active"));
    tabClicked.closest("li").classList.add("pg-app-alert-tab-active");
    if (tabClicked.closest("li").classList.contains("alert-grid-tab")) {
      gridView.classList.add("view-active");
      listView.classList.remove("view-active");
    } else {
      listView.classList.add("view-active");
      gridView.classList.remove("view-active");
    }
  });
// post button hide on alert
var postBtn = document.querySelector(".tabs");
const newsFeed = document.querySelector(".pg-app-newsfeed-tab");
const addPostBtn = document.querySelector(".pg-app-add-post-button");
postBtn &&
  postBtn.addEventListener("click", function (e) {
    let tabClicked = e.target.closest("li");

    if (tabClicked === newsFeed) {
      addPostBtn && addPostBtn.classList.add("pg-app-show-post-button");
    } else {
      addPostBtn && addPostBtn.classList.remove("pg-app-show-post-button");
    }
  });
//tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// switch tabs for employee directory
const empSwitchTabs = document.querySelector(".switch-tab");
var switchActionTab = document.querySelectorAll(".switch-tab-item");
var listView = document.querySelector(".list-view");
var gridView = document.querySelector(".grid-view");
empSwitchTabs &&
  empSwitchTabs.addEventListener("click", function (e) {
    let tabClicked = e.target;
    console.log(tabClicked);
    switchActionTab.forEach((tab) => tab.classList.remove("switch-tab-active"));
    tabClicked.closest("li").classList.add("switch-tab-active");

    if (tabClicked.closest("li").classList.contains("switch-grid-tab")) {
      gridView.classList.add("view-active");
      listView.classList.remove("view-active");
    } else {
      listView.classList.add("view-active");
      gridView.classList.remove("view-active");
    }
  });
//job collapse
const openJobBtn = document.querySelector(".pg-app-open-job");
const closeJobBtn = document.querySelector(".pg-app-job-collapse");
const jobLeftArea = document.querySelector(".pg-app-left-sec");
const jobRightArea = document.querySelector(".pg-app-right-sec");

const openJobMenu = () => {
  jobLeftArea.classList.add("open-collapse");
  jobLeftArea.classList.remove("close-job");
  jobRightArea.classList.add("right-open");
};
const closeJobMenu = () => {
  jobLeftArea.classList.remove("open-collapse");
  jobLeftArea.classList.add("close-job");
  jobRightArea.classList.remove("right-open");
};
openJobBtn.onclick = openJobMenu;
closeJobBtn.onclick = closeJobMenu;

// image uploader
$(document).ready(function () {
  $("#imageUpload").change(function (data) {
    var imageFile = data.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = function (evt) {
      $("#imagePreview").attr("src", evt.target.result);
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
  });
});
