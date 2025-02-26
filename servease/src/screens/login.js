import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomAlert from "../components/warning";
import { BigLogo } from "../components/logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/FBconfig";

const LoginScreen = ({ navigation }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleLogin = () => {
    Keyboard.dismiss();

    signInWithEmailAndPassword(auth, Username, Password)
      .then((userCredental) => {
        const user = userCredental.user;
        setAlert({
          message: "Login successful",
          type: "success",
          visible: true,
        });

        setTimeout(() => {
          navigation.navigate("MainMenu");
          console.log("User logged in: ", user);
        }, 2000);
      })

      .catch( (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlert({
          message: "Invalid credentials",
          type: "error",
          visible: true,
        });
        console.log("Error: ", errorCode, errorMessage);
      });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <BigLogo />
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={Username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              secureTextEntry
              value={Password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't you have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="light"></StatusBar>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <CustomAlert
        message={alert.message}
        type={alert.type}
        visible={alert.visible}
        onHide={hideAlert}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "merriweather",
  },
  input: {
    width: 283,
    height: 62,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 90,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#3A4750",
    color: "#fff",
    fontSize: 24,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 27,
  },
  signUpText: {
    color: "#fff",
  },
  signUpLink: {
    color: "#597EAA",
    fontWeight: 700,
  },
  loginButton: {
    backgroundColor: "#597EAA",
    width: 283,
    height: 62,
    borderWidth: 1,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    color: "#EEF1F5",
    fontFamily: "merriweather",
    marginBottom: 28,
  },
});

export default LoginScreen;
