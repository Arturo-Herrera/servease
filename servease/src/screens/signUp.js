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
import CustomAlert from "../components/warning";

const UserDataScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleUserData = () => {
    Keyboard.dismiss();

    if (!email || !password || !confirmPassword) {
      setPasswordError("All fields are required");
      console.log("All fields are required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      console.log("Password must be at least 6 characters long");
      return;
    }

    if (confirmPassword != password || password != confirmPassword) {
      setPasswordError("Passwords don't match");
      console.log("Passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("PersonData")
        console.log("User created: ", user)
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
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View style={styles.inner}>
          <BigLogo />
          <Text style={styles.title}>User data</Text>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardAppearance="dark"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardAppearance="dark"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
            keyboardAppearance="dark"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleUserData()}
          >
            <Text style={styles.loginButtonText}>Next</Text>
          </TouchableOpacity>

          <StatusBar style="light"></StatusBar>
        </View>
        {/* </TouchableWithoutFeedback> */}
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

const PersonDataScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  handlePersonData = () => { 

  }
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <BigLogo />
            <Text style={styles.title}>Personal information</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Lastname"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={lastname}
              onChangeText={setLastName}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              keyboardAppearance="dark"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleSignUp()}
            >
              <Text style={styles.loginButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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

export { UserDataScreen, PersonDataScreen };
