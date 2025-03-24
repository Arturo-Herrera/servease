import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "../components/navigation";
import MapView from "react-native-maps";

const ClientPostView = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const overlayHeight = useRef(new Animated.Value(110)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy < 0) {
        overlayHeight.setValue(110 - gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < -50) {
        setIsExpanded(true);
        Animated.spring(overlayHeight, {
          toValue: 700,
          useNativeDriver: false,
        }).start();
      } else {
        setIsExpanded(false);
        Animated.spring(overlayHeight, {
          toValue: 110,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.overlay, { height: overlayHeight }]}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.title}>Title</Text>
          <Image
            style={styles.profilePhoto}
            source={require("../../assets/Servease-Logo.jpg")}
          />
        </View>
        <View style={styles.moreInfo}>
          <Text style={styles.price}>
            I need someone who can make me a wooden and marble sink cabinet.
          </Text>
          <Text style={styles.price}>$7,000</Text>

          <TouchableOpacity 
          onPress={() => Navigation.naviga}
          style={styles.offerButton}>
            <Text style={styles.offerButtonText}>View Offers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.servicePhotoContainer}>
          <Image
            style={styles.servicePhoto}
            source={require("../../assets/Servease-Logo.jpg")}
          />
        </View>

        {isExpanded && (
          <View style={styles.details}>
            <Text style={styles.detailText}>Colonia</Text>
            <Text style={styles.detailText}>Calle</Text>
            <Text style={styles.detailText}>Numero Interior</Text>
            <Text style={styles.detailText}>Numero exterior</Text>
          </View>
        )}
      </Animated.View>

      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#222831",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerOverlay: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreInfo: {
    marginTop: 30,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    color: "#fff",
  },
  price: {
    fontSize: 15,
    fontWeight: "regular",
    color: "#fff",
    marginBottom: 20,
  },
  offerButton: {
    backgroundColor: "#597EAA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  offerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  servicePhoto: {
    width: 289,
    height: 289,
    borderRadius: 10,
  },
  servicePhotoContainer: {
    alignItems: "center",
  },
});

export default ClientPostView;
