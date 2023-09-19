$(document).ready(function () {
  // $("#myselection").on("change", function () {
  $(document).on("change", "#myselection", function () {
    var demovalue = $(this).val();
    $("div.pg-app-myDiv").hide();
    $("#show" + demovalue).show();
  });
  // ADD DOC SUBMISSION TAB
  $(function () {
    $(".pg-app-DocSubmit").on("click", function () {
      $(".pg-app-docSubmissionTab").addClass("d-block");
    });
  });

  // ADD ASSESMENT TAB
  $(function () {
    $(".pg-app-AddAssesment").on("click", function () {
      $(".pg-app-assesmentTab").addClass("d-block");
    });
  });

  // ADD OFFER TAB
  $(function () {
    $(".pg-app-addOffer").on("click", function () {
      $(".pg-app-offerTab").addClass("d-block");
    });
  });

  // ADD BG CHECK TAB
  $(function () {
    $(".pg-app-addBgCheck").on("click", function () {
      $(".pg-app-bgChecksTab").addClass("d-block");
    });
  });

  // Submenu Arrow Rotate
  $(function () {
    $(".pg-app-submenu-wrap").on("click", function () {
      $(this).find(".pg-app-chevron-right").toggleClass("pg-app-rotate");
    });
  });

  $(document).on("change", "#questionSelection", function () {
    var demovalue = $(this).val();
    $("div.pg-app-myDiv").hide();
    $("#show" + demovalue).show();
  });

  $(".pg-app-bookmark").on("click", function () {
    $(this).toggleClass("booked");
  });
  //chckboxes
  $(".checkAll").click(function () {
    $("input:checkbox").not(this).prop("checked", this.checked);
    $(".bttn").addClass("d-block");
    $(".bttn").removeClass("d-none");
  });
  $(".pg-app-all-check").click(function () {
    $("#checkAll-unChecked").not(this).prop("checked", false);
    $("#checkAll-unChecked-2").not(this).prop("checked", false);
    $(".bttn").removeClass("d-block");
    $(".bttn").addClass("d-none");
  });
  // transction Dreopdown
  $(window).click(function () {
    $(".pg-app-header-dropdown").fadeOut();
  });
  $(".pg-app-header-dropdown").click(function (event) {
    event.stopPropagation();
  });

  $(".toggle-class-e").click(function (event) {
    event.stopPropagation();
    $(".pg-app-header-dropdown").toggleClass("show");
    $(".pg-app-header-dropdown").fadeIn();
  });
  $(".pg-app-close-transection").on("click", function () {
    $(".pg-app-header-dropdown").fadeOut();
  });
  //   tooltip?
  $(function () {
    $("[rel='tooltip']").tooltip();
  });

  $(function () {
    $(".app-customm").on("click", function () {
      $(".multiselect-container").addClass("show");
    });
  });

  // Show recruitments Filters
  $(function () {
    $(".pg-app-Rp-filtrBtn").on("click", function () {
      $(".pg-app-filtersCol").toggleClass("pg-app-filterShow");
      $(".pg-app-Rp-filtrBtn").toggleClass("pg-app-activeBg");
    });
  });
  $(function () {
    $(".filtersCross").on("click", function () {
      $(".pg-app-filtersCol").removeClass("pg-app-filterShow");
      $(".pg-app-Rp-filtrBtn").removeClass("pg-app-activeBg");
    });
  });

  // See more score card Lis
  $(function () {
    $(".pg-app-seeMoreBtn").on("click", function () {
      $(".pg-app-scoreCardMoreLi").toggleClass("pg-app-filterShow");
      $(this).text($(this).text() == "Show more" ? "Show Less" : "Show more");
    });
  });

  // Resume Review requisition info
  $(function () {
    $(".pg-app-requistionMoreInfoIcon").on("click", function () {
      $(".pg-app-reviewRequisitionInfoWrap").addClass(
        "pg-app-showRequisitionInfo"
      );
      $(".pg-appRightColAllActions").addClass("pg-app-hideItems");
    });
  });
  // Resume Review requisition main content
  $(function () {
    $(".pg-app-requisitionBackBtn").on("click", function () {
      $(".pg-app-reviewRequisitionInfoWrap").removeClass(
        "pg-app-showRequisitionInfo"
      );
      $(".pg-appRightColAllActions").removeClass("pg-app-hideItems");
    });
  });
  // Satr rating details
  $(function () {
    $(".pg-app-ratingDetailBtn").on("click", function () {
      $(".pg-app-ratingDetails").addClass("pg-app-filterShow");
      $(".pg-app-startRatingSummary").addClass("pg-app-hideItems");
    });
  });
  // Star rating summary
  $(function () {
    $(".pg-app-ratingDetailBack").on("click", function () {
      $(".pg-app-ratingDetails").removeClass("pg-app-filterShow");
      $(".pg-app-startRatingSummary").removeClass("pg-app-hideItems");
    });
  });
  // add notes btn
  $(function () {
    $(".pg-app-requitionAddNoteBtn").on("click", function () {
      $(".pg-app-requitionAddNoteContent").addClass(
        "pg-app-showAddNoteContent "
      );
      $(".pg-app-requitionAddNoteBtn").addClass("pg-app-showAddNoteBtn");
    });
  });
  $(function () {
    $(".pg-app-notesCancelBtn, .pg-app-notesSaveBtn").on("click", function () {
      $(".pg-app-requitionAddNoteContent").removeClass(
        "pg-app-showAddNoteContent "
      );
      $(".pg-app-requitionAddNoteBtn").removeClass("pg-app-showAddNoteBtn");
    });
  });
  // Show Hide comments
  $(function () {
    $(".pg-app-seeAllCommentsBtn").on("click", function () {
      $(".pg-app-viewAllComments").toggleClass("pg-app-showRequisitionInfo");
    });
  });
  $(function () {
    $(".pg-app-seeAllCommentsBtn").on("click", function () {
      $(this).text(
        $(this).text().trim() == "See all Comments"
          ? "Hide all Comments"
          : "See all Comments"
      );
    });
  });
  $("#editButton").click(function () {
    $("#pg-app-editAble").focus();
  });
  $("#editButton1").click(function () {
    $("#pg-app-editAble1").focus();
  });

  // Make personal information draggable
  $(".form_bal_personal-information").draggable({
    helper: function () {
      return getPersonalInformationFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      if (ui.helper.hasClass("dropped")) {
        $(this).remove(); // remove the element from the DOM if it was dropped in the specific area
      } else {
        $(this).fadeIn();
      }
    },
  });

  // Make cover-letter draggable
  $(".form_bal_cover-letter").draggable({
    helper: function () {
      return getCoverLetterFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });
  // Make Skills draggable
  $(".form_bal_skills").draggable({
    helper: function () {
      return getSkillsFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });
  // Make Travel Preferences draggable
  $(".form_bal_travel-preferences").draggable({
    helper: function () {
      return getTrvelPreferencesFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });

  // Make Employment Authorization draggable
  $(".form_bal_employment-authorization").draggable({
    helper: function () {
      return getEmployeeAuthorizationFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });
  // Make EEo Information draggable
  $(".form_bal_eeo-Information").draggable({
    helper: function () {
      return getEEoInformationFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });
  // Make Self-identification draggable
  $(".form_bal_Self-identification").draggable({
    helper: function () {
      return getSelfIdentificationFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });
  // Make Self-identification draggable
  $(".form_bal_referral-source").draggable({
    helper: function () {
      return getReferralSourceFieldHTML();
    },
    connectToSortable: ".pg-app-form_builder_area",
    start: function (e, ui) {
      $(this).fadeOut();
    },
    stop: function (e, ui) {
      $(this).fadeIn();
    },
  });

  // create HTML for perosnal information
  function getPersonalInformationFieldHTML(field) {
    var html = ` <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Personal Information
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">First Name*</label>
              <input
                type="text"
                class="form-control"
                placeholder="First Name*"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Middle Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Middle Name"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Last Name*</label>
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Cell Number</label>
              <input
                type="number"
                class="form-control"
                placeholder="Cell Number"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Home Number</label>
              <input
                type="number"
                class="form-control"
                placeholder="Home Number"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Work Number</label>
              <input
                type="number"
                class="form-control"
                placeholder="Work Number"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Address 1 </label>
              <input
                type="text"
                class="form-control"
                placeholder="Address 1"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Address 2</label>
              <input
                type="text"
                class="form-control"
                placeholder="Address 2"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Address 3"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">City </label>
              <input
                type="text"
                class="form-control"
                placeholder="Address 1"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">State</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6">Zip</label>
              <input
                type="number"
                class="form-control"
                placeholder="Zip"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6">
          <div
            class="form-group pg-form d-block pg-app-calander-select px-0"
          >
            <label for="text" class="pg-mb-6"
              >How soon would you be available to work?</label
            >
            <input type="date" class="form-control" />
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }

  // Create HTML for cover letter field
  function getCoverLetterFieldHTML(field) {
    var html = ` <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Cover Letter/ Resume
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"

        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <div class="col-md-6">
          <div class="pg-form d-flex">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="flexCheckChecked"
              >
                Resume Required
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">Catergory</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div id="pollOption"></div>
        <div class="pg-mt-24">
          <button id="addmore" class="pg-app-Rp-addNewDocBtn">
            + Add New
          </button>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for skills field
  function getSkillsFieldHTML(field) {
    var html = `   <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Education, Skills, Certifications and Licenses
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <p class="pg-mb-10 pg-app-headerText">Education</p>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="degree"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="degree"
              >
                2 year degree prereq BA/BS
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="horti"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="horti"
              >
              Horticulture Degree
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="arts"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="arts"
              >
                Bachelor of Arts
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="ged"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="ged"
              >
                High School or GED
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="science"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="science"
              >
                Bachelor of Science
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="tenchincal"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="tenchincal"
              >
                Technical
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="pg-mb-10 pg-app-headerText">Skills</p>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="visual"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="visual"
              >
                Visual Basic Programming Expert
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="hardware"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="hardware"
              >
                Computer Hardware knowledge
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="microSoft"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="microSoft"
              >
                Microsoft Office Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="programming"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="programming"
              >
                Programming Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="netwroking"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="netwroking"
              >
                Computer Networking knowledge
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="computerExp"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="computerExp"
              >
                Computer Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="management"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="management"
              >
                Management and Supervisory
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="DocFill"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="DocFill"
              >
                Document Filing Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="communication"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="communication"
              >
                Communication
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="DB"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="DB"
              >
                Database Administration Exper
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="salesLead"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="salesLead"
              >
                Sales Leads and Closing Exper.
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="AppTesting"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="AppTesting"
              >
                Application Testing Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="QA"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="QA"
              >
                Quality Assurance Management
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="ITExperience"
              />
              <label
                class="pg-app-form-check-label form-check-label d-flex"
                for="ITExperience"
              >
                Information Technology Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="POS"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="POS"
              >
                Point of Sales Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="resturant"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="resturant"
              >
                Restaurat Customer Experience
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="transplant"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="transplant"
              >
                Knowledge of Transplanntation
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="cannabis"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="cannabis"
              >
                Cannabis Plant Knowledge
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="germination"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="germination"
              >
                Knowledge of Germination
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="clonning"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="clonning"
              >
                Knowledge of Cloning
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <p class="pg-mb-10 pg-app-headerText">Certifications and Licenses</p>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="greenBelt"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="greenBelt"
              >
                Six Sigma Green Belt
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="certification"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="certification"
              >
                LP/VN LTC Certification
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="excel"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="excel"
              >
                Microsoft Office Excel
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="tender"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="tender"
              >
                Bud Tender Certification
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="CMA"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="CMA"
              >
                CMA Certification
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="pg-form d-flex pg-mb-12">
            <div class="form-check ps-0">
              <input
                class="pg-app-form-check form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="flexCheckChecked"
              >
                Technical
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for travel preferences field
  function getTrvelPreferencesFieldHTML(field) {
    var html = `    <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Travel Preferences
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Are you willing to travel?</h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="travel"
                id="travelYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="travelYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="travel"
                id="travelNo"
        
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="travelNo"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="mb-0">Are you willing to relocate?</h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="willing"
                id="willingYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="willingYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="willing"
                id="willingNo"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="willingNo"
              >
                No
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 pg-mt-24">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6"
                >Percent of time spend travelling</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter"
              />
              <small class="text-muted"
                >(Hint: enter 50 or 50% of the time)</small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for Employee Autherization field
  function getEmployeeAuthorizationFieldHTML(field) {
    var html = `<div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Employment Authorization
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
            
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <div class="col-lg-6 pg-mt-24">
          <div class="form-group pg-form d-block pg-mb-16">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6"
                >If you are under 18, please enter your age:</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter Age"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">
            Are you legally allowed to work in the United States?
          </h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="workYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="workYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="workNo"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="workNo"
              >
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for EEO Information field
  function getEEoInformationFieldHTML(field) {
    var html = `<div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        EEO Information
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <p class="mb-0 p-0">
          Resume submissions are considered for employment without
          regard to race, race, sex, marital status, sexual orientation,
          veteran status or disability.
        </p>
      </div>
      <div class="row">
        <div class="col-xl-4 col-lg-4">
          <div
            class="form-group pg-form d-block pg-app-calander-select px-0 pg-mt-16"
          >
            <label for="text" class="pg-mb-6">Birth Date</label>
            <input type="date" class="form-control" />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">EEO Gender</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">EEO Ethnicity</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">Military Status</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">Marital Status</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">Primary Language</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6">Secondary Language</label>
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0 pg-mt-16">Do you use tobacco?</h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="tobacco"
                id="tobacoYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="tobacoYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="tobacco"
                id="tobacoNo"
       
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="tobacoNo"
              >
                No
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="tobacco"
                id="tobacoNotSpecified"
 
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="tobacoNotSpecified"
              >
                Not Specified
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="mb-0 pg-mt-16">Are you a student?</h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="student"
                id="studentYes"
   
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="studentYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="student"
                id="studentNo"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="studentNo"
              >
                No
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="student"
                id="studentNotSpecified"
           
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="studentNotSpecified"
              >
                Not Specified
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="mb-0 pg-mt-16">Are you a US Citizen?</h6>
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="citizen"
                id="citizenYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="citizenYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="citizen"
                id="citizenNo"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="citizenNo"
              >
                No
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="citizen"
                id="citizenNotSpecified"
               
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="citizenNotSpecified"
              >
                Not Specified
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for Self Identification field
  function getSelfIdentificationFieldHTML(field) {
    var html = `  <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Voluntary Self-identification of Disability (Optional)
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <p class="p-0">
          To know why you are being asked and to know if you have a
          disability, please download the Voluntary Self-Identification
          of Disability (CC305) document or further clarification. After
          reviewing the document, please check one of the following
          selections:
        </p>
      </div>
      <div class="row">
        <div class="col-xl-12 col-lg-12">
          <div class="d-flex gap-5">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="disbaleYes"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="disbaleYes"
              >
                Yes, I have a disability (or previously had a
                disability)
              </label>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12">
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="disbaleNo"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="disbaleNo"
              >
                No, I don’t have a disability
              </label>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12">
          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="disbaleNoAns"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="disbaleNoAns"
              >
                I don’t wish to answer
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }
  // Create HTML for Referral Source field
  function getReferralSourceFieldHTML(field) {
    var html = `  <div class="personal-info-wrap">
    <div class="pg-app-dragged-fields-header">
      <p class="mb-0 pg-app-headerText">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 6.75C9.24632 6.75 9.75 6.24632 9.75 5.625C9.75 5.00368 9.24632 4.5 8.625 4.5C8.00368 4.5 7.5 5.00368 7.5 5.625C7.5 6.24632 8.00368 6.75 8.625 6.75Z"
            fill="black"
          />
          <path
            d="M15.375 6.75C15.9963 6.75 16.5 6.24632 16.5 5.625C16.5 5.00368 15.9963 4.5 15.375 4.5C14.7537 4.5 14.25 5.00368 14.25 5.625C14.25 6.24632 14.7537 6.75 15.375 6.75Z"
            fill="black"
          />
          <path
            d="M8.625 13.125C9.24632 13.125 9.75 12.6213 9.75 12C9.75 11.3787 9.24632 10.875 8.625 10.875C8.00368 10.875 7.5 11.3787 7.5 12C7.5 12.6213 8.00368 13.125 8.625 13.125Z"
            fill="black"
          />
          <path
            d="M15.375 13.125C15.9963 13.125 16.5 12.6213 16.5 12C16.5 11.3787 15.9963 10.875 15.375 10.875C14.7537 10.875 14.25 11.3787 14.25 12C14.25 12.6213 14.7537 13.125 15.375 13.125Z"
            fill="black"
          />
          <path
            d="M8.625 19.5C9.24632 19.5 9.75 18.9963 9.75 18.375C9.75 17.7537 9.24632 17.25 8.625 17.25C8.00368 17.25 7.5 17.7537 7.5 18.375C7.5 18.9963 8.00368 19.5 8.625 19.5Z"
            fill="black"
          />
          <path
            d="M15.375 19.5C15.9963 19.5 16.5 18.9963 16.5 18.375C16.5 17.7537 15.9963 17.25 15.375 17.25C14.7537 17.25 14.25 17.7537 14.25 18.375C14.25 18.9963 14.7537 19.5 15.375 19.5Z"
            fill="black"
          />
        </svg>
        Referral Source
      </p>
      <span
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pg-mr-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4697 1.71967C11.7626 1.42678 12.2374 1.42678 12.5303 1.71967L16.2803 5.46967C16.5732 5.76256 16.5732 6.23744 16.2803 6.53033L6.53033 16.2803C6.38968 16.421 6.19891 16.5 6 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V12C1.5 11.8011 1.57902 11.6103 1.71967 11.4697L11.4697 1.71967ZM3 12.3107V15H5.68934L14.6893 6L12 3.31066L3 12.3107Z"
            fill="#5F5F5F"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class ="pg-app-remove_bal_field pull-right"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
            fill="#5F5F5F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
            fill="#5F5F5F"
          />
        </svg>
      </span>
    </div>
    <div class="pg-app-dragable-fields-body">
      <div class="row">
        <div class="col-xl-12 col-lg-12">
          <h6 class="mb-0">Are you a current employee here?</h6>

          <div class="d-flex gap-5 pg-mt-16">
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="employeeYes"
                checked
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="employeeYes"
              >
                Yes
              </label>
            </div>
            <div>
              <input
                class="pg-app-form-check form-check-input me-0"
                type="radio"
                name="expenseItem"
                id="employeeNo"
              />
              <label
                class="pg-app-form-check-label form-check-label"
                for="employeeNo"
              >
                NO
              </label>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group pg-form d-block pg-mt-16">
            <label for="text" class="pg-mb-6"
              >How did you hear about us?</label
            >
            <select
              class="form-select pg-app-form-select"
              aria-label="Default select example"
            >
              <option selected="">Select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group pg-form d-block pg-mt-16 mb-0">
            <div class="form-group pg-form d-block mb-0">
              <label for="text" class="pg-mb-6"
                >If you were referred by, please specify
                their name:</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return $("<div>")
      .addClass("li_" + field + " form_builder_field")
      .html(html);
  }

  $(document).on("click", ".pg-app-remove_bal_field", function (e) {
    e.preventDefault();
    var field = $(this).attr("data-field");
    $(this)
      .closest(".li_" + field)
      .hide("400", function () {
        $(this).remove();
      });
  });

  // Make form builder area sortable
  $(".pg-app-form_builder_area").sortable({
    cursor: "move",
    placeholder: "placeholder",
    start: function (e, ui) {
      ui.placeholder.height(ui.helper.outerHeight());
    },
  });
  $(".pg-app-form_builder_area").disableSelection();

  // ADD NEW TABS Customize application
  var tabID = 2;
  $(document).on("click", "#AddTabsBtn", function () {
    tabID++;
    console.log(tabID);
    $(".pg-app-customizeApplicationTabs").append(
      $(
        `<li class="nav-item" role="presentation">
          <button
            class="nav-link progress_holder deleteAble"
            id="pills-tab-` +
          tabID +
          `"
            data-bs-toggle="pill"
            data-bs-target="#pills-` +
          tabID +
          `"
            type="button"
            role="tab"
            aria-controls="pills-` +
          tabID +
          `"
            aria-selected="true"
          >
          <span class="sortAbleTabNum">` +
          tabID +
          `.</span>
            <span ondblclick = 'getTest(this)' class="pg-app-editAble">Blank </span>
          </button>
        </li>`
      )
    );
    $("#pills-tabContent").append(
      $(
        `
<div class="tab-pane fade deleteAbleTabContent" id="pills-${tabID}" role="tabpanel" aria-labelledby="pills-tab-${tabID}">
<h3 class="pg-app-DragFieldsText">Drag to add fields </h3>
<div class="pg-app-form_builder_area ui-sortable"><h3 class="pg-app-DragFieldsText">
Drag to add fields
</h3></div>
</div>`
      )
    );
    $(".pg-app-form_builder_area").sortable({
      cursor: "move",
      placeholder: "placeholder",
      start: function (e, ui) {
        ui.placeholder.height(ui.helper.outerHeight());
      },
    });
  });
  $(document).on("click", "#removeTabs", function () {
    let removedLi = $(
      ".pg-app-customizeApplicationTabs .progress_holder.deleteAble.active"
    );
    if (removedLi.hasClass("deleteAble")) {
      tabID--;
      let TabContent = $(
        "#pills-tabContent .tab-pane.deleteAbleTabContent.active"
      );
      removedLi.parent().prev().children("button").addClass("active");
      TabContent.prev().addClass("active show");
      removedLi.parent("li").remove();
      TabContent.remove();
      let Num = 3;
      $(".sortAbleTabNum").each(function (i, obj) {
        $(this).html(Num + ".");
        Num = Num + 1;
      });
    }
  });
});
const getTest = (e) => {
  let thise = e;
  var val = thise.innerHTML;
  var input = document.createElement("input");
  input.value = val;
  input.onblur = function (val) {
    thise.innerHTML = val?.target?.value;
  };
  thise.innerHTML = "";
  thise.appendChild(input);
  input.focus();
};

// REMOVE TABS customize application

document.querySelectorAll(".pg-app-editAble").forEach(function (node) {
  node.ondblclick = function () {
    var val = this.innerHTML;
    var input = document.createElement("input");
    input.value = val;
    input.onblur = function () {
      var val = this.value;
      this.parentNode.innerHTML = val;
    };
    this.innerHTML = "";
    this.appendChild(input);
    input.focus();
  };
});

// image custom dropdown?
var imgdropText = document.querySelector(".pg-app-my-employee-dropdown-text");
var imgdropDownArea = document.querySelector(".pg-app-my-employee-dropdown");
var imgdropDownBtn = document.querySelector(".my-employee-select");
var imgdropDown = document.querySelector(".pg-app-my-header-dropdown");
var imgdropdownElement = document.querySelector(".my-dropdown-element");
imgdropdownElement &&
  imgdropdownElement.addEventListener("click", function (e) {
    var something = e.target.closest("li");
    imgdropDownBtn.innerHTML = something.innerHTML;
    imgdropDown.classList.remove("show");
  });
imgdropDownBtn &&
  imgdropDownBtn.addEventListener("click", function (e) {
    imgdropDown.classList.toggle("show");
  });
imgdropDownArea &&
  document.addEventListener("click", function (e) {
    var isClickedInside = imgdropDownArea.contains(e.target);
    if (!isClickedInside) {
      imgdropDown.classList.remove("show");
    }
  });

// image dropdown for edit
var editDropText = document.querySelector(
  ".pg-app-edit-employee-dropdown-text"
);
var editDropDownArea = document.querySelector(".pg-app-edit-employee-dropdown");
var editDropDownBtn = document.querySelector(".edit-employee-select");
var editDropDown = document.querySelector(".pg-app-edit-header-dropdown");
var editDropdownElement = document.querySelector(".edit-dropdown-element");
editDropdownElement &&
  editDropdownElement.addEventListener("click", function (e) {
    var something = e.target.closest("li");
    editDropDownBtn.innerHTML = something.innerHTML;
    editDropDown.classList.remove("show");
  });
editDropDownBtn &&
  editDropDownBtn.addEventListener("click", function (e) {
    editDropDown.classList.toggle("show");
  });
editDropDownArea &&
  document.addEventListener("click", function (e) {
    var isClickedInside = editDropDownArea.contains(e.target);
    if (!isClickedInside) {
      editDropDown.classList.remove("show");
    }
  });

// upload dropdown?
var uploadDropText = document.querySelector(
  ".pg-app-upload-employee-dropdown-text"
);
var uploadDropDownArea = document.querySelector(
  ".pg-app-upload-employee-dropdown"
);
var uploadDropDownBtn = document.querySelector(".upload-employee-select");
var uploadDropDown = document.querySelector(".pg-app-upload-header-dropdown");
var uploadDropdownElement = document.querySelector(".upload-dropdown-element");
uploadDropdownElement &&
  uploadDropdownElement.addEventListener("click", function (e) {
    var something = e.target.closest("li");
    uploadDropDownBtn.innerHTML = something.innerHTML;
    uploadDropDown.classList.remove("show");
  });
uploadDropDownBtn &&
  uploadDropDownBtn.addEventListener("click", function (e) {
    uploadDropDown.classList.toggle("show");
  });
uploadDropDownArea &&
  document.addEventListener("click", function (e) {
    var isClickedInside = uploadDropDownArea.contains(e.target);
    if (!isClickedInside) {
      uploadDropDown.classList.remove("show");
    }
  });

// ADD AND DELETE ROWS IN TABLE(phase4)

function addNewRow() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(3);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = ` <td class="pg-app-requistion-td">
  <div class="d-flex align-items-center">
    <input
      class="pg-app-form-check form-check-input me-0"
      type="radio"
      name="multipleChoiceRadio"
      id="multipleChoiceRadio"
    />
    <label
      class="pg-app-form-check-label form-check-label pg-app-multipleChoiceRadioLabel"
      for="flexRadioDefault1"
    >
      No
    </label>
  </div>
</td>`;
  cell2.innerHTML = ` <td>
  <div class="form-group pg-form d-block mb-0">
    <input
      type="text"
      class="form-control"
      placeholder="Select"
      style="height: 32px"
    />
  </div>
</td>`;
  cell3.innerHTML = ` <td>
  <div
    class="d-flex slign-items-center gap-3 pg-app-scoreCardTopActionWrap"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onclick="deleteRow()"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
        fill="#5F5F5F"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 2.25C7.30109 2.25 7.11032 2.32902 6.96967 2.46967C6.82902 2.61032 6.75 2.80109 6.75 3V3.75H11.25V3C11.25 2.80109 11.171 2.61032 11.0303 2.46967C10.8897 2.32902 10.6989 2.25 10.5 2.25H7.5ZM12.75 3.75V3C12.75 2.40326 12.5129 1.83097 12.091 1.40901C11.669 0.987053 11.0967 0.75 10.5 0.75H7.5C6.90326 0.75 6.33097 0.987053 5.90901 1.40901C5.48705 1.83097 5.25 2.40326 5.25 3V3.75H3.75C3.33579 3.75 3 4.08579 3 4.5V15C3 15.5967 3.23705 16.169 3.65901 16.591C4.08097 17.0129 4.65326 17.25 5.25 17.25H12.75C13.3467 17.25 13.919 17.0129 14.341 16.591C14.7629 16.169 15 15.5967 15 15V4.5C15 4.08579 14.6642 3.75 14.25 3.75H12.75ZM4.5 5.25V15C4.5 15.1989 4.57902 15.3897 4.71967 15.5303C4.86032 15.671 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1397 15.671 13.2803 15.5303C13.421 15.3897 13.5 15.1989 13.5 15V5.25H4.5Z"
        fill="#5F5F5F"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
        fill="#5F5F5F"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
        fill="#5F5F5F"
      ></path>
    </svg>
  </div>
</td>`;
}

function deleteRow() {
  document.getElementById("myTable").deleteRow(3);
}

// append column to the HTML table

// create DIV element and append to the table cell
function createCell(cell, text, style) {
  var div = document.createElement("div"), // create DIV element
    txt = document.createTextNode(text); // create text node
  div.appendChild(txt); // append text node to the DIV
  div.setAttribute("class", style); // set DIV class attribute
  div.setAttribute("className", style); // set DIV class attribute for IE (?!)
  cell.appendChild(div); // append DIV to the table cell
}
function appendColumn1() {
  var tbl = document.getElementById("pg-app-dynamicColumnTable1"), // table reference
    i;
  // open loop for each row and append cell
  for (i = 0; i < tbl.rows.length; i++) {
    createCell(
      tbl.rows[i].insertCell(tbl.rows[i].cells.length),
      "new Column",
      "col"
    );
  }
}

// append row to the HTML table
function appendRow1() {
  var tbl = document.getElementById("pg-app-dynamicColumnTable1"), // table reference
    row = tbl.insertRow(tbl.rows.length), // append table row
    i;
  // insert table cells to the new row
  for (i = 0; i < tbl.rows[0].cells.length; i++) {
    createCell(row.insertCell(i), i, "row");
  }
}

function appendColumn2() {
  var tbl = document.getElementById("pg-app-dynamicColumnTable2"), // table reference
    i;
  // open loop for each row and append cell
  for (i = 0; i < tbl.rows.length; i++) {
    createCell(
      tbl.rows[i].insertCell(tbl.rows[i].cells.length),
      "new Column",
      "col"
    );
  }
}

// append row to the HTML table
function appendRow2() {
  var tbl = document.getElementById("pg-app-dynamicColumnTable2"), // table reference
    row = tbl.insertRow(tbl.rows.length), // append table row
    i;
  // insert table cells to the new row
  for (i = 0; i < tbl.rows[0].cells.length; i++) {
    createCell(row.insertCell(i), i, "row");
  }
}
