$(document).ready(function() {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 100
            },
            400,
            function() {}
          );
        }
      }
    });

  $(window).scroll(function() {
    updateToolbar();
  });
  updateToolbar();
});

function updateToolbar() {
  updateToolbarColor();
  updateSelectedToolbarItem();
}

function updateToolbarColor() {
  var scroll = $(document).scrollTop();

  if (scroll > 400) {
    $("#toolbar").addClass("solid");
  } else {
    $("#toolbar").removeClass("solid");
  }
}

function updateSelectedToolbarItem() {
  var scroll = $(document).scrollTop();

  var experienceTop = $("#experience").offset().top;
  var studiesTop = $("#studies").offset().top;
  var moreTop = $("#more").offset().top;

  $('a[href*="#"]').removeClass("selected");

  if (scroll < experienceTop - 200) {
    $('a[href*="#home"]').addClass("selected");
  } else if (scroll < studiesTop - 200) {
    $('a[href*="#experience"]').addClass("selected");
  } else if (scroll < moreTop - 400) {
    $('a[href*="#studies"]').addClass("selected");
  } else {
    $('a[href*="#more"]').addClass("selected");
  }
}
