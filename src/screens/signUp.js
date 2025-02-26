import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BigLogo } from "../components/logo";
import { auth } from "../config/FBconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomAlert from "../Components/Notifications";

const SignUpScreen = ({ navigation }) => {
  // const [name, setName] = useState("");
  // const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [accountTyoe, setAccountType] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = () => {
    Keyboard.dismiss();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      console.log("Password must be at least 6 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAlert({
          message: "Account created successfully",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          navigation.navigate("MainMenu");
          console.log("User created: ", user);
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setAlert({
            message: "Email already in use",
            type: "error",
            visible: true,
          });
        } else {
          setAlert({
            message: "Error creating account",
            type: "error",
            visible: true,
          });
        }
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
            <Text style={styles.title}>Sign Up</Text>
            {/* <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={lastname}
              onChangeText={setLastName}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={email}
              onChangeText={setEmail}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Create account</Text>
            </TouchableOpacity>

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
  errorText: {
    color: "#FF0000",
    marginBottom: 10,
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

export default SignUpScreen;
