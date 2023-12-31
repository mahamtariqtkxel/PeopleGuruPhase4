/*!
 * zoom.js 0.3
 * http://lab.hakim.se/zoom-js
 * MIT licensed
 *
 * Copyright (C) 2011-2014 Hakim El Hattab, http://hakim.se
 */
var zoom = (function () {
  var TRANSITION_DURATION = 800;

  // The current zoom level (scale)
  var level = 1;

  // The current mouse position, used for panning
  var mouseX = 0,
    mouseY = 0;

  // Timeout before pan is activated
  var panEngageTimeout = -1,
    panUpdateInterval = -1;

  // Timeout for callback function
  var callbackTimeout = -1;

  // Check for transform support so that we can fallback otherwise
  var supportsTransforms =
    "WebkitTransform" in
      document.querySelector(".pg-app-genealogy-tree").style ||
    "MozTransform" in document.querySelector(".pg-app-genealogy-tree").style ||
    "msTransform" in document.querySelector(".pg-app-genealogy-tree").style ||
    "OTransform" in document.querySelector(".pg-app-genealogy-tree").style ||
    "transform" in document.querySelector(".pg-app-genealogy-tree").style;

  const body = document
    .querySelector(".genealogy-body")
    .getBoundingClientRect();

  if (supportsTransforms) {
    // The easing that will be applied when we zoom in/out
    document.querySelector(".pg-app-genealogy-tree").style.transition =
      "transform " + TRANSITION_DURATION + "ms ease";
    document.querySelector(".pg-app-genealogy-tree").style.OTransition =
      "-o-transform " + TRANSITION_DURATION + "ms ease";
    document.querySelector(".pg-app-genealogy-tree").style.msTransition =
      "-ms-transform " + TRANSITION_DURATION + "ms ease";
    document.querySelector(".pg-app-genealogy-tree").style.MozTransition =
      "-moz-transform " + TRANSITION_DURATION + "ms ease";
    document.querySelector(".pg-app-genealogy-tree").style.WebkitTransition =
      "-webkit-transform " + TRANSITION_DURATION + "ms ease";
  }

  // Zoom out if the user hits escape
  document.addEventListener("keyup", function (event) {
    if (level !== 1 && event.keyCode === 27) {
      zoom.out();
    }
  });

  // Monitor mouse movement for panning
  document.addEventListener("mousemove", function (event) {
    if (level !== 1) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  });

  /**
   * Applies the CSS required to zoom in, prefers the use of CSS3
   * transforms but falls back on zoom for IE.
   *
   * @param {Object} rect
   * @param {Number} scale
   */
  function magnify(rect, scale) {
    var scrollOffset = getScrollOffset();
    console.log(scrollOffset, "Scrolloffset");

    // Ensure a width/height is set
    rect.width = rect.width || 1;
    rect.height = rect.height || 1;

    // Center the rect within the zoomed viewport
    console.log(body.width, "x");
    console.log(body.height, "y");
    rect.x -= (body.width - rect.width * scale) / 2;
    rect.y -= (body.height - rect.height * scale) / 2;
    // console.log(rect.x, "innerWidth");
    console.log(body, "body");
    if (supportsTransforms) {
      // Reset
      if (scale === 1) {
        document.querySelector(".pg-app-genealogy-tree").style.transform = "";
        document.querySelector(".pg-app-genealogy-tree").style.OTransform = "";
        document.querySelector(".pg-app-genealogy-tree").style.msTransform = "";
        document.querySelector(".pg-app-genealogy-tree").style.MozTransform =
          "";
        document.querySelector(".pg-app-genealogy-tree").style.WebkitTransform =
          "";
      }
      // Scale
      else {
        var origin = scrollOffset.x + "px " + scrollOffset.y + "px",
          transform =
            "translate(" +
            (-rect.x + 150) +
            "px," +
            -rect.y +
            "px) scale(" +
            scale +
            ")";

        document.querySelector(".pg-app-genealogy-tree").style.transformOrigin =
          origin;
        document.querySelector(
          ".pg-app-genealogy-tree"
        ).style.OTransformOrigin = origin;
        document.querySelector(
          ".pg-app-genealogy-tree"
        ).style.msTransformOrigin = origin;
        document.querySelector(
          ".pg-app-genealogy-tree"
        ).style.MozTransformOrigin = origin;
        document.querySelector(
          ".pg-app-genealogy-tree"
        ).style.WebkitTransformOrigin = origin;

        document.querySelector(".pg-app-genealogy-tree").style.transform =
          transform;
        document.querySelector(".pg-app-genealogy-tree").style.OTransform =
          transform;
        document.querySelector(".pg-app-genealogy-tree").style.msTransform =
          transform;
        document.querySelector(".pg-app-genealogy-tree").style.MozTransform =
          transform;
        document.querySelector(".pg-app-genealogy-tree").style.WebkitTransform =
          transform;
      }
    } else {
      // Reset
      if (scale === 1) {
        document.querySelector(".pg-app-genealogy-tree").style.position = "";
        document.querySelector(".pg-app-genealogy-tree").style.left = "";
        document.querySelector(".pg-app-genealogy-tree").style.top = "";
        document.querySelector(".pg-app-genealogy-tree").style.width = "";
        document.querySelector(".pg-app-genealogy-tree").style.height = "";
        document.querySelector(".pg-app-genealogy-tree").style.zoom = "";
      }
      // Scale
      else {
        document.querySelector(".pg-app-genealogy-tree").style.position =
          "relative";
        document.querySelector(".pg-app-genealogy-tree").style.left =
          -(scrollOffset.x + rect.x) / scale + "px";
        document.querySelector(".pg-app-genealogy-tree").style.top =
          -(scrollOffset.y + rect.y) / scale + "px";
        document.querySelector(".pg-app-genealogy-tree").style.width =
          scale * 100 + "%";
        document.querySelector(".pg-app-genealogy-tree").style.height =
          scale * 100 + "%";
        document.querySelector(".pg-app-genealogy-tree").style.zoom = scale;
      }
    }

    level = scale;
  }

  /**
   * Pan the document when the mouse cursor approaches the edges
   * of the window.
   */
  function pan() {
    var range = 0.12,
      rangeX = window.innerWidth * range,
      rangeY = window.innerHeight * range,
      scrollOffset = getScrollOffset();

    // Up
    if (mouseY < rangeY) {
      window.scroll(
        scrollOffset.x,
        scrollOffset.y - (1 - mouseY / rangeY) * (14 / level)
      );
    }
    // Down
    else if (mouseY > window.innerHeight - rangeY) {
      window.scroll(
        scrollOffset.x,
        scrollOffset.y +
          (1 - (window.innerHeight - mouseY) / rangeY) * (14 / level)
      );
    }

    // Left
    if (mouseX < rangeX) {
      window.scroll(
        scrollOffset.x - (1 - mouseX / rangeX) * (14 / level),
        scrollOffset.y
      );
    }
    // Right
    else if (mouseX > window.innerWidth - rangeX) {
      window.scroll(
        scrollOffset.x +
          (1 - (window.innerWidth - mouseX) / rangeX) * (14 / level),
        scrollOffset.y
      );
    }
  }

  function getScrollOffset() {
    return {
      x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
      y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset,
    };
  }

  return {
    /**
     * Zooms in on either a rectangle or HTML element.
     *
     * @param {Object} options
     *
     *   (required)
     *   - element: HTML element to zoom in on
     *   OR
     *   - x/y: coordinates in non-transformed space to zoom in on
     *   - width/height: the portion of the screen to zoom in on
     *   - scale: can be used instead of width/height to explicitly set scale
     *
     *   (optional)
     *   - callback: call back when zooming in ends
     *   - padding: spacing around the zoomed in element
     */
    to: function (options) {
      // Due to an implementation limitation we can't zoom in
      // to another element without zooming out first
      if (level !== 1) {
        zoom.out();
      } else {
        options.x = options.x || 0;
        options.y = options.y || 0;

        // If an element is set, that takes precedence
        if (!!options.element) {
          // Space around the zoomed in element to leave on screen
          var padding =
            typeof options.padding === "number" ? options.padding : 20;
          var bounds = options.element.getBoundingClientRect();
          options.x = bounds.left - padding;
          options.y = bounds.top - padding;
          options.width = bounds.width + padding * 2;
          options.height = bounds.height + padding * 2;
        }

        // If width/height values are set, calculate scale from those values
        if (options.width !== undefined && options.height !== undefined) {
          options.scale = Math.max(
            Math.min(
              window.innerWidth / options.width,
              window.innerHeight / options.height
            ),
            1
          );
        }
        console.log(options.scale);

        if (options.scale > 1) {
          options.x *= options.scale;
          options.y *= options.scale;

          options.x = Math.max(options.x, 0);
          options.y = Math.max(options.y, 0);

          magnify(options, options.scale);

          if (options.pan !== false) {
            // Wait with engaging panning as it may conflict with the
            // zoom transition
            panEngageTimeout = setTimeout(function () {
              panUpdateInterval = setInterval(pan, 1000 / 60);
            }, TRANSITION_DURATION);
          }

          if (typeof options.callback === "function") {
            callbackTimeout = setTimeout(options.callback, TRANSITION_DURATION);
          }
        }
      }
    },

    /**
     * Resets the document zoom state to its default.
     *
     * @param {Object} options
     *   - callback: call back when zooming out ends
     */
    out: function (options) {
      console.log("Called");
      clearTimeout(panEngageTimeout);
      clearInterval(panUpdateInterval);
      clearTimeout(callbackTimeout);

      magnify({ x: 0, y: 0 }, 1);

      if (options && typeof options.callback === "function") {
        setTimeout(options.callback, TRANSITION_DURATION);
      }

      level = 1;
    },

    // Alias
    magnify: function (options) {
      this.to(options);
    },
    reset: function () {
      this.out();
    },

    zoomLevel: function () {
      return level;
    },
  };
})();
