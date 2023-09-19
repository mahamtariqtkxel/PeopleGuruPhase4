//Dashboard Multiselects for New hire per location form
$(document).ready(function () {
  var newVals = [];
  var eArray = [];
  var dArray = [];
  $(".dstatus, .estatus").on("change", function () {
    const selectedVals = $(this).val();
    if (this.className == "estatus") {
      eArray = selectedVals;
      console.log(eArray);
    } else {
      dArray = selectedVals;
      console.log(dArray);
    }
    newVals = [...eArray, ...dArray];
    updatePills(newVals);
    console.log(newVals);
  });
  function updatePills(currentElem) {
    $(".pill-chip").html("");

    currentElem.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <img  src="../assets/img/pillcross.svg"/></li>`;
      $(".pill-chip").append(pill);
    });
  }
  $(".pill-chip").on("click", ".chip-item", function () {
    $(".dstatus, .estatus").multiselect("deselect", $(this).text().trim());
    const index = $(this).text().trim();
    dArray = dArray.filter((e) => e !== index);
    eArray = eArray.filter((e) => e !== index);
    console.log(newVals);
    $(this).remove();
  });
  $(".dstatus").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect multiselec-btn dropdown-toggle" data-toggle="dropdown">Chart Column</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
  $(".estatus").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect multiselec-btn dropdown-toggle" data-toggle="dropdown">Aggregation</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
});
$(document).ready(function () {
  $(".fstatus").on("change", function () {
    updatePills(this);
  });
  function updatePills(currentElem) {
    $(".pill-chip-single").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <img  src="../assets/img/pillcross.svg"/></li>`;
      $(".pill-chip-single").append(pill);
    });
  }
  $(".pill-chip-single").on("click", ".chip-item", function () {
    $(".fstatus").multiselect("deselect", $(this).text().trim());

    $(this).remove();
  });
  $(".fstatus").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect multiselec-btn dropdown-toggle" data-toggle="dropdown">status</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
});
//PAF Multiselects
$(document).ready(function () {
  $("#demo").on("change", function () {
    updatePills(this);
  });
  function updatePills(currentElem) {
    $(".pills-wrapper").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="pill-item">${element} <img  src="../assets/img/cross.svg"/></li>`;
      $(".pills-wrapper").append(pill);
    });
  }
  $(".pills-wrapper").on("click", ".pill-item", function () {
    $("#demo").multiselect("deselect", $(this).text().trim());

    $(this).remove();
  });

  $("#demo").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect multiselec-btn dropdown-toggle" data-toggle="dropdown">All PAFs (440)</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
});
$(document).ready(function () {
  $(".allFilters").on("change", function () {
    updatePills(this);
    $(".filter-results").addClass("filter-results-show");
    if ($(this).val().length === 0) {
      $(".filter-results").removeClass("filter-results-show");
    }
  });
  function updatePills(currentElem) {
    $(".pill-chip").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <img  src="../assets/img/pillcross.svg"/></li>`;
      $(".pill-chip").append(pill);
    });
  }
  $(".pill-chip").on("click", ".chip-item", function () {
    $(".allFilters").multiselect("deselect", $(this).text().trim());

    $(this).remove();
    if ($(".allFilters").val().length === 0) {
      $(".filter-results").removeClass("filter-results-show");
    }
  });
  $(".allFilters").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect  dropdown-toggle" data-toggle="dropdown">Status</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
  $(document).mouseup(function (e) {
    var container = $(".multiselect-container");
    if (container.is(":visible")) {
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.toggleClass("show");
      }
    }
  });
});
//post dropdown
$(function () {
  $("#post-group").multiselect({
    nonSelectedText: "Share with Group",
  });
});

// questionaire dropdown(p4)

$(document).ready(function () {
  $(".questionaireeFilters").on("change", function () {
    updatePills(this);
    $(".questionaireFilterResults").addClass("filter-results-show");
    if ($(this).val().length === 0) {
      $(".questionaireFilterResults").removeClass("filter-results-show");
    }
  });
  function updatePills(currentElem) {
    $(".question-pill-chip").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2469 3.25314C11.4177 3.424 11.4177 3.701 11.2469 3.87186L3.37186 11.7469C3.201 11.9177 2.924 11.9177 2.75314 11.7469C2.58229 11.576 2.58229 11.299 2.75314 11.1281L10.6281 3.25314C10.799 3.08229 11.076 3.08229 11.2469 3.25314Z" fill="#5F5F5F"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75314 3.25314C2.924 3.08229 3.201 3.08229 3.37186 3.25314L11.2469 11.1281C11.4177 11.299 11.4177 11.576 11.2469 11.7469C11.076 11.9177 10.799 11.9177 10.6281 11.7469L2.75314 3.87186C2.58229 3.701 2.58229 3.424 2.75314 3.25314Z" fill="#5F5F5F"/>
      </svg>
      </li>`;
      $(".question-pill-chip").append(pill);
    });
  }
  $(".question-pill-chip").on("click", ".chip-item", function () {
    $(".questionaireeFilters").multiselect("deselect", $(this).text().trim());

    $(this).remove();
    if ($(".questionaireeFilters").val().length === 0) {
      $(".questionaireFilterResults").removeClass("filter-results-show");
    }
  });
  $(".questionaireeFilters").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect  dropdown-toggle" data-toggle="dropdown">Choose Questionnaire</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
  $(document).mouseup(function (e) {
    var container = $(".multiselect-container");
    if (container.is(":visible")) {
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.toggleClass("show");
      }
    }
  });
});

// ManagerRatingFilters(p4)
$(document).ready(function () {
  $(".ManagerRatingFilters").on("change", function () {
    updatePills(this);
    $(".ManagerRatingFilterResults").addClass("filter-results-show");
    if ($(this).val().length === 0) {
      $(".ManagerRatingFilterResults").removeClass("filter-results-show");
    }
  });
  function updatePills(currentElem) {
    $(".managerRating-pill-chip").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2469 3.25314C11.4177 3.424 11.4177 3.701 11.2469 3.87186L3.37186 11.7469C3.201 11.9177 2.924 11.9177 2.75314 11.7469C2.58229 11.576 2.58229 11.299 2.75314 11.1281L10.6281 3.25314C10.799 3.08229 11.076 3.08229 11.2469 3.25314Z" fill="#5F5F5F"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75314 3.25314C2.924 3.08229 3.201 3.08229 3.37186 3.25314L11.2469 11.1281C11.4177 11.299 11.4177 11.576 11.2469 11.7469C11.076 11.9177 10.799 11.9177 10.6281 11.7469L2.75314 3.87186C2.58229 3.701 2.58229 3.424 2.75314 3.25314Z" fill="#5F5F5F"/>
      </svg>
      </li>`;
      $(".managerRating-pill-chip").append(pill);
    });
  }
  $(".managerRating-pill-chip").on("click", ".chip-item", function () {
    $(".ManagerRatingFilters").multiselect("deselect", $(this).text().trim());

    $(this).remove();
    if ($(".ManagerRatingFilters").val().length === 0) {
      $(".ManagerRatingFilterResults").removeClass("filter-results-show");
    }
  });
  $(".ManagerRatingFilters").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect  dropdown-toggle" data-toggle="dropdown">Choose Manager Rating Questionnaires</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
  $(document).mouseup(function (e) {
    var container = $(".managerRating-container");
    if (container.is(":visible")) {
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.toggleClass("show");
      }
    }
  });
});

// chooseTemplateFilters(p4)
$(document).ready(function () {
  $(".chooseTemplateFilters").on("change", function () {
    updatePills(this);
    $(".chooseTemplateResults").addClass("filter-results-show");
    if ($(this).val().length === 0) {
      $(".chooseTemplateResults").removeClass("filter-results-show");
    }
  });
  function updatePills(currentElem) {
    $(".chooseTemplate-pill-chip").html("");
    const selectedVals = $(currentElem).val();
    selectedVals.forEach((element) => {
      const pill = `<li class="status chip chip-item">${element} <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2469 3.25314C11.4177 3.424 11.4177 3.701 11.2469 3.87186L3.37186 11.7469C3.201 11.9177 2.924 11.9177 2.75314 11.7469C2.58229 11.576 2.58229 11.299 2.75314 11.1281L10.6281 3.25314C10.799 3.08229 11.076 3.08229 11.2469 3.25314Z" fill="#5F5F5F"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75314 3.25314C2.924 3.08229 3.201 3.08229 3.37186 3.25314L11.2469 11.1281C11.4177 11.299 11.4177 11.576 11.2469 11.7469C11.076 11.9177 10.799 11.9177 10.6281 11.7469L2.75314 3.87186C2.58229 3.701 2.58229 3.424 2.75314 3.25314Z" fill="#5F5F5F"/>
      </svg>
      </li>`;
      $(".chooseTemplate-pill-chip").append(pill);
    });
  }
  $(".chooseTemplate-pill-chip").on("click", ".chip-item", function () {
    $(".chooseTemplateFilters").multiselect("deselect", $(this).text().trim());

    $(this).remove();
    if ($(".chooseTemplateFilters").val().length === 0) {
      $(".chooseTemplateResults").removeClass("filter-results-show");
    }
  });
  $(".chooseTemplateFilters").multiselect({
    templates: {
      button:
        '<button type="button" class="multiselect  dropdown-toggle" data-toggle="dropdown">Choose Template</button>',
    },
    onSelect: function (options) {
      console.log(options.length);
    },
  });
  $(document).mouseup(function (e) {
    var container = $(".managerRating-container");
    if (container.is(":visible")) {
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.toggleClass("show");
      }
    }
  });
});
