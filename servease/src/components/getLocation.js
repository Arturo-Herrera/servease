import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

const LocationPermission = ({ onLocationObtained }) => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Estado del permiso:", status);

      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        console.log("Ubicación obtenida:", location);

        if (location && location.coords) {
          onLocationObtained(location);
        } else {
          setErrorMsg("No se pudo obtener la ubicación");
        }
      } catch (error) {
        console.error("Error obteniendo ubicación:", error);
        setErrorMsg("Error al obtener la ubicación");
      }

      setLoading(false); // 🔹 Detiene el indicador de carga
    })();
  }, []);

  return (
    <View>
      {loading && <ActivityIndicator size="large" color="#597EAA" />}
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
    </View>
  );
};

export default LocationPermission;
