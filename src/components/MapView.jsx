import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import geoData from "../data/geoData.json";

const MapView = ({ navigation }) => {
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
        html, body { margin: 0; padding: 0; height: 100%; width: 100%; }
        #map { height: 100%; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([-6.1754, 106.8201], 10);

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZhD5en5bTNPf7VzQe9L9', {
          attribution: '&copy; MapTiler & OpenStreetMap',
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map);

        var geoJsonLayer;

        function onEachFeature(feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.on('click', function () {
              const detail = {
                id: feature.properties.id,
                name: feature.properties.name,
                keterangan: feature.properties.keterangan
              };
              window.ReactNativeWebView.postMessage(JSON.stringify(detail));
            });
          }
        }

        window.addEventListener("message", function(event) {
          try {
            var geojsonData = JSON.parse(event.data);
            if (geoJsonLayer) {
              map.removeLayer(geoJsonLayer);
            }

            geoJsonLayer = L.geoJSON(geojsonData, {
              onEachFeature: onEachFeature,
              style: {
                color: "#3388ff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.4
              }
            }).addTo(map);

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

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      navigation.navigate('DetailWilayah', {
        id: data.id,
        name: data.name,
        keterangan: data.keterangan,
      });
    } catch (e) {
      Alert.alert("Error", "Gagal membaca informasi wilayah.");
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        originWhitelist={["*"]}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={sendGeoJsonToWebView}
        onMessage={handleMessage}
      />
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#000000aa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 999,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapView;
