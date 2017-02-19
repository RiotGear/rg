riot.tag2("rg-map", '<div ref="{opts.id}" class="rg-map" style="width: 100%; min-height: 10vh; height: 85vh;"></div>', 'rg-map .rg-map,[riot-tag="rg-map"] .rg-map,[data-is="rg-map"] .rg-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img,[riot-tag="rg-map"] .rg-map img,[data-is="rg-map"] .rg-map img{ max-width: inherit; }', "", function(opts) {
    var _this = this;
    var _script_id = "rg_map_script_unqiue" ; // Unique reference, to ensure Google APIs pulled in only once.

    window.rg = window.rg || {};
    window.rg.gmap = riot.observable({
        initialize: function initialize() {
            window.rg.gmap.trigger("initialize")
        }
    });


    this.on("before-mount", function () {
      if (!opts.map) opts.map = {
          center: {
              lat: (opts.lat ? Number(opts.lat) : -34.397),
              lng: (opts.lng ? Number(opts.lng) : 50.644)
          },
          zoom: 7
      }

      if (!opts.id)
         opts.id = "rg_map_id_" + Date.now() ;

      if (opts.apikey && !opts.map.apikey)
         opts.map.apikey = opts.apikey ;

      if (opts.lat && opts.map && opts.map.center.lat)
         opts.map.center.lat = (opts.lat ? Number(opts.lat) : opts.map.center.lat) ;

         if (opts.lng && opts.map && opts.map.center.lng)
            opts.map.center.lng = (opts.lng ? Number(opts.lng) : opts.map.center.lng) ;

         if (opts.zoom && opts.map)
            opts.map.zoom = (opts.zoom ? Number(opts.zoom) : (opts.map.zoom ? opts.map.zoom : 8)) ;

         if (opts.type && opts.map)
            opts.map.mapTypeId = (opts.type ? opts.type : (opts.map.mapTypeId ? opts.map.mapTypeId : "roadmap")) ;

         if (opts.tilt && opts.map)
            opts.map.tilt = (opts.tilt ? Number(opts.tilt) : (opts.map.tilt ? opts.map.tilt : 45)) ;

         if (opts.heading && opts.map)
            opts.map.heading = (opts.heading ? Number(opts.heading) : (opts.map.heading ? opts.map.heading : 90) ) ;

    }) ;   // on before-mount



    this.on("mount", function() {

        rg.gmap.on("initialize", function() {
            e1 = _this.root.querySelector(".rg-map") ;
            e2 = _this.refs[0] ;
            opts.map.mapObj = new google.maps.Map(e1, opts.map);
            _this.trigger("loaded", opts.map.mapObj)
        });


        if (!document.getElementById(_script_id)) {
            var script = document.createElement("script");
            script.setAttribute("id", _script_id);
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?key="+opts.apikey+"&callback=window.rg.gmap.initialize";
            document.body.appendChild(script)
        }
    })    // on mount

});
