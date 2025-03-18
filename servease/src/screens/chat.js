import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/Servease-Logo.jpg")}
          style={styles.profilePhoto}
        />
        <View style={styles.info}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.name}>Person Name</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.sendContainer}>
          <TextInput
            style={styles.input}
            placeholder="Send a message"
            placeholderTextColor="#ccc"
            keyboardAppearance="dark"
          />
          <TouchableOpacity style={styles.sendButton} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  header: {
    width: "100%",
    paddingLeft: 60,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  profilePhoto: {
    width: 35,
    height: 35,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  info: {
    marginLeft: 20,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  name: {
    color: "#fff",
    fontSize: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sendContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#222831",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 41,
    backgroundColor: "rgba(145, 174, 200, 0.22)",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#fff",
  },
  sendButton: {
    backgroundColor: "#91AEC8",
    width: 41,
    height: 41,
    borderRadius: 30,
    marginLeft: 10,
  },
});

export default Chat;