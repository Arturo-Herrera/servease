import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SmallLogo } from "../components/logo";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const MyListings = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState("MyListings");
  const [servicePhoto, setServicePhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

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
      setServicePhoto({ uri: result.assets[0].uri });
      console.log("Selected image:", result.assets[0].uri);
    }else {
      console.log("Canceled selection")
    }
  };

  const postService = () => {};

  const renderScreen = () => {
    switch (selectedScreen) {
      case "Create":
        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.createTitle}>New Service</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={openImagePicker}>
                  <Image
                    source={ servicePhoto }
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  placeholderTextColor="rgba(255, 255, 255, 0.38)"
                  keyboardAppearance="dark"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  placeholderTextColor="rgba(255, 255, 255, 0.38)"
                  keyboardAppearance="dark"
                  value={price}
                  onChangeText={setPrice}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Categorie"
                  placeholderTextColor="rgba(255, 255, 255, 0.38)"
                  keyboardAppearance="dark"
                  value={categorie}
                  onChangeText={setCategorie}
                />
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="rgba(255, 255, 255, 0.38)"
                  keyboardAppearance="dark"
                  //   value={}
                  //   onChangeText={}
                />
              </View>
            </View>
            <View style={styles.downPart}>
              <TextInput
                style={styles.inputDownPart}
                placeholder="Description"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                keyboardAppearance="dark"
                multiline={true}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                style={styles.inputDownPart}
                placeholder="aqui ira el mapa, nomas pongo esto de referencia"
                placeholderTextColor="#fff"
                keyboardAppearance="dark"
                multiline={true}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.postButton} onPress={postService}>
                <Text style={styles.postText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "MyListings":
        return (
          <Text style={styles.contentText}>My Listings Screen Content</Text>
        );
      case "Notifications":
        return (
          <Text style={styles.contentText}>Notifications Screen Content</Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SmallLogo />
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedScreen === "Create" && styles.selectedButton,
          ]}
          onPress={() => setSelectedScreen("Create")}
        >
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedScreen === "MyListings" && styles.selectedButton,
          ]}
          onPress={() => setSelectedScreen("MyListings")}
        >
          <Text style={styles.navText}>My Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedScreen === "Notifications" && styles.selectedButton,
          ]}
          onPress={() => setSelectedScreen("Notifications")}
        >
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{renderScreen()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  header: {
    paddingLeft: 30,
    width: "100%",
    margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    marginBottom: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 106,
    height: 27,
    backgroundColor: "rgba(145, 174, 200, 0.2)",
    borderRadius: 10,
  },
  navText: {
    color: "#fff",
    fontSize: 13,
  },
  createTitle: {
    color: "#fff",
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  selectedButton: {
    width: 114,
    height: 40,
    backgroundColor: "#91AEC8",
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  image: {
    width: 172,
    height: 172,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "rgba(145, 174, 200, 0.2)",
    width: 141,
    height: 27,
    borderRadius: 10,
    paddingLeft: 15,
  },
  downPart: {
    marginTop: 10,
    alignItems: "center",
    gap: 20,
  },
  inputDownPart: {
    backgroundColor: "rgba(145, 174, 200, 0.2)",
    width: "100%",
    height: 93,
    borderRadius: 10,
    padding: 10,
  },
  postButton: {
    backgroundColor: "#597EAA",
    width: 174,
    height: 36,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  postText: {
    fontSize: 20,
    color: "#fff",
  },
});
export default MyListings;
