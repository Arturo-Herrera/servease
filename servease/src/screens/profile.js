import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleLogout = async () => {
    navigation.navigate("Login");
  };

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      themes: {
        colors: {
          background: "#222831",
          text: "#ffffff",
          primary: "#597EAA",
        },
      },
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfilePhoto({ uri: result.assets[0].uri });
      console.log("Selected image:", result.assets[0].uri);
    } else {
      console.log("Canceled selection");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={openImagePicker}>
          <Image source={profilePhoto} style={styles.profilePhoto} />
        </TouchableOpacity>
        <View style={styles.personInfo}>
          <Text style={styles.name}>Jesus</Text>
          <Text style={styles.lastname}>Leyva</Text>
        </View>
      </View>
      <View style={styles.downPart}>
        <Text style={styles.services}>Services</Text>
        <Text style={styles.categorie}>• Categorie</Text>
        <Text style={styles.categorie}>• Categorie</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating</Text>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    paddingLeft: 30,
    paddingRight: 30,
  },
  inner: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  profilePhoto: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  personInfo: {
    gap: 7,
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontSize: 28,
    color: "#fff",
    fontWeight: 500,
  },
  lastname: {
    fontSize: 28,
    color: "#fff",
    fontWeight: 500,
  },
  services: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
  downPart: {
    marginBottom: 50,
  },
  categorie: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 300,
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  ratingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
  logoutContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutButton: {
    backgroundColor: "rgba(145,174,200, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 150,
    borderRadius: 20,
  },
  logoutText: {
    color: "red",
    fontSize: 18,
  },
});

export default Profile;
