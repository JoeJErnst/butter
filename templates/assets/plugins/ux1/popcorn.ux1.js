// PLUGIN: text

(function ( Popcorn ) {

  /**
   * text Popcorn plug-in
   * Based on popcorn.text.js by @humph
   * @param {Object} options
   *
   * Example:

   **/



  Popcorn.plugin( "ux1", {

    manifest: {
      about: {
        name: "UX1.tv Plugin",
        version: "0.1",
        author: "@JoeJernst"
      },
      options: {
        affiliateProgram: {
          elem: "select",
          options: [ "Commission Junction", "Google Affiliates"],
          values: [ "cj", "googleAffiliates"],
          label: "Affiliate Program",
          "default": "cj"
        },
        searchString: {
          elem: "input",
          label: "Search",
          "default": ""
        },
        start: {
          elem: "input",
          type: "text",
          label: "In",
          group: "advanced",
          "units": "seconds"
        },
        end: {
          elem: "input",
          type: "text",
          label: "Out",
          group: "advanced",
          "units": "seconds"
        },
        zindex: {
          hidden: true
        }
      }
    },

    _setup: function( options ) {
      var target = Popcorn.dom.find( options.target ),
          container = options._container = document.createElement( "div" ),
          innerContainer = document.createElement( "div" ),
          innerSpan = document.createElement( "span" ),
          innerDiv = document.createElement( "div" ),
          context = this;

      if ( !target ) {
        target = this.media.parentNode;
      }

      options._target = target;
      container.style.position = "absolute";
      container.classList.add( "popcorn-ux1" );

      // innerDiv inside innerSpan is to allow zindex from layers to work properly.
      // if you mess with this code, make sure to check for zindex issues.
      innerSpan.appendChild( innerDiv );
      innerContainer.appendChild( innerSpan );
      container.appendChild( innerContainer );
      target.appendChild( container );

      options.toString = function() {
        // use the default option if it doesn't exist
        return options.searchString || options._natives.manifest.options.searchString[ "default" ];
      };
    },

    start: function( event, options ) {
      if ( options._transitionContainer ) {
        options._transitionContainer.classList.add( "on" );
        options._transitionContainer.classList.remove( "off" );
      }
    },

    end: function( event, options ) {
      if ( options._transitionContainer ) {
        options._transitionContainer.classList.add( "off" );
        options._transitionContainer.classList.remove( "on" );
      }
    },

    _teardown: function( options ) {
      if ( options._target ) {
        options._target.removeChild( options._container );
      }

      if ( options._fontSheet ) {
        document.head.removeChild( options._fontSheet );
      }
    }
  });
}( window.Popcorn ));
