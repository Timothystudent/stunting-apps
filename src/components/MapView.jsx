import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Animated } from "react-native";
import { WebView } from "react-native-webview";
import geoData from "../data/geoData.json";

const MapView = ({ navigation }) => {
  const webViewRef = useRef(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

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
            console.log("GeoJSON received:", geojsonData);
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

  // ❌ Tidak perlu dipanggil di useEffect
  // useEffect(() => {
  //   sendGeoJsonToWebView();
  // }, []);

  const handleMessage = (event) => {
    try {
      console.log("Data dari WebView:", event.nativeEvent.data);
      const data = JSON.parse(event.nativeEvent.data);
      setSelectedInfo(data);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (e) {
      Alert.alert("Error", "Gagal membaca informasi wilayah.");
    }
  };

  const closeInfoPanel = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedInfo(null);
    });
  };

  const goToDetailPage = () => {
    closeInfoPanel();
    navigation.navigate('DetailWilayah', { info: selectedInfo });
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

      {selectedInfo && (
        <Animated.View style={[styles.infoPanel, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.infoTitle}>{selectedInfo.name}</Text>
          <Text style={styles.infoText}>{selectedInfo.keterangan}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={goToDetailPage} style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Lihat Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeInfoPanel}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  infoPanel: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#444', marginBottom: 12 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailButtonText: { color: '#fff', fontWeight: 'bold' },
  closeText: { color: '#007bff', fontWeight: 'bold' },
});

export default MapView;
