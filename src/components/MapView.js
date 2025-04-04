import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import geoData from "../data/geoData.json";

const MapView = () => {
  const webViewRef = useRef(null);

  const mapHtml = `
    <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
    #map {
      height: 100%;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([-6.1754, 106.8201], 10);

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZhD5en5bTNPf7VzQe9L9', {
      attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 0,
      maxZoom: 20,
    }).addTo(map);

    var geoJsonLayer;

    window.addEventListener("message", function(event) {
      try {
        var geojsonData = JSON.parse(event.data);

        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }

        geoJsonLayer = L.geoJSON(geojsonData).addTo(map);
        map.fitBounds(geoJsonLayer.getBounds());
      } catch (e) {
        console.error("GeoJSON error:", e);
      }
    });
  </script>
</body>
</html>

  `;

  const sendGeoJsonToWebView = () => {
    if (webViewRef.current) {
      const script = `
        try {
          window.postMessage(${JSON.stringify(JSON.stringify(geoData))}, '*');
        } catch(e) {
          console.error('Error sending GeoJSON:', e);
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  useEffect(() => {
    sendGeoJsonToWebView();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        originWhitelist={["*"]}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={sendGeoJsonToWebView}
        onError={(syntheticEvent) => {
          console.error('WebView error:', syntheticEvent.nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MapView;
