function getIcon(current){
  var svg = `<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  	 viewBox="0 0 24 29.8" style="enable-background:new 0 0 24 29.8;" xml:space="preserve">
  <style type="text/css">
  	.st0{fill:#FFFFFF;stroke:#000000;stroke-width:0.2134;stroke-miterlimit:10;}
  	.st1{fill:#ED1F24;stroke:#000000;stroke-width:0.2134;stroke-miterlimit:10;}
  	.st2{fill:none;stroke:#FFFFFF;stroke-width:0.213;stroke-miterlimit:10;}
  </style>
  <polygon class="st0" points="4.4,4.4 4.4,28.5 14.1,21.6 14.1,0 "/>
  <polygon class="st1" points="8.9,5.4 8.9,29.4 18.5,22.6 18.5,0.9 "/>
  <polygon class="st1" points="4.4,4.4 8.9,5.4 8.9,29.4 4.4,28.5 "/>
  <polygon class="st2" points="5.7,6.9 7.6,7.3 7.6,18.1 5.7,17.7 "/>
  <ellipse class="st2" cx="6.7" cy="21.7" rx="0.5" ry="1.1"/>
  </svg>`;
  if (current){
    svg = svg.replace('fill="#FFFFFF"', 'fill="#ccbc79"');
  }
  svg = encodeURI("data:image/svg+xml," + svg).replace(/#/g,'%23');
  console.log(svg);

  return L.icon({
    iconUrl: svg,
    iconSize: [30, 37.5] //[40, 50]
  });
}

function Map(mapid, places, path2root){
    var map = L.map(mapid, {
      minZoom: 7,
      maxZoom: 15
    });
    var markers = [];

    L.tileLayer(
      'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
      // 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      ).addTo(map);

    this.clear = function(){
      markers = [];
    };

    this.build = function(){

      this.clear();
      places.forEach(function(p){
        console.log(getIcon(p.current));

        var m = L.marker([p.lat, p.lng], {icon: getIcon(p.current)})
                  .bindPopup('<div class="balloon"><a href="' + p.href + '"><i class="fas fa-industry"></i> ' + p.title + '</a></div>')
                  .openPopup()
                  .addTo(map);
        markers.push(m);
      });

      if (markers.length > 0) {
        var group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds());
        map.setMaxBounds(group.getBounds());
      } else {
        console.log('Nessun luogo trovato!');
      }
    };
  }


( function (){
  if ($('#map').length < 1 ){
    console.log('#map element not found');
    return false;
  }

  var path2root = $('#map').data('path');

  if (!path2root){
    console.log('path data attribute of #map not set');
    return false;
  }

  if(typeof map_data == 'undefined' || map_data.length < 0){
    console.log('map_data not set');
    return false;
  }


  var m = new Map('map', map_data, path2root);
    m.build();





})();
