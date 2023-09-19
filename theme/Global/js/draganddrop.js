
$(".dropup.profile-description").hover(function () {
  $(".dropdown-toggle", this).trigger("click");
});
$(init);

function init() {
  $(".droppable-area1, .droppable-area2")
    .sortable({
      connectWith: ".connected-sortable",
      stack: ".connected-sortable ul",
    })
    .disableSelection();
}