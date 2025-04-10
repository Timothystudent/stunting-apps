 const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        #map { height: 100vh; margin: 0; padding: 0; }
      </style>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([-1.5, 124.5], 9);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY', {
          attribution: '&copy; MapTiler & OpenStreetMap contributors'
        }).addTo(map);

        document.addEventListener("message", function(event) {
          const geojson = JSON.parse(event.data);
          const data = JSON.parse(geojson);

          function getColor(percent) {
            if (percent === 0) return '#4CAF50';
            if (percent > 0 && percent <= 30) return '#FFEB3B';
            if (percent > 30 && percent <= 50) return '#FF9800';
            if (percent > 50) return '#F44336';
            return '#9E9E9E';
          }

          L.geoJSON(data, {
            style: feature => ({
              fillColor: getColor(feature.properties.persentase),
              weight: 1,
              color: '#333',
              fillOpacity: 0.6
            }),
            onEachFeature: (feature, layer) => {
              layer.on('click', () => {
                const info = {
                  name: feature.properties.name || 'Tidak diketahui',
                  keterangan: "Persentase keluarga berisiko: " + feature.properties.persentase + "%"
                };
                window.ReactNativeWebView.postMessage(JSON.stringify(info));
              });
            }
          }).addTo(map);
        });
      </script>
    </body>
    </html>
  `;
