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
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomAlert from "../components/warning";
import { BigLogo } from "../components/logo";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/FBconfig";
import LocationPermission from "../components/getLocation";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationObtained = (loc) => {
    console.log("Location in login screen");
    if (loc && loc.coords) {
      setUserLocation(loc);
    } else {
      console.log("Error: Not valid location");
    }
  };

  const handleSignInWithGoogle = ()=> {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado como: ", user);
    })
    .catch((error) =>{
      console.log("Error")
    })
  }
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
          navigation.navigate("MainMenu", { location: userLocation });
          console.log("User logged In");
        }, 2000);
      })

      .catch((error) => {
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
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <LocationPermission onLocationObtained={handleLocationObtained} />
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
                placeholder="Email"
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

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSignInWithGoogle} style={styles.googleButton}>
                <View style={styles.googleContainer}>
                  <Image
                    style={styles.googleLogo}
                    source={require("../../assets/icons-google.png")}
                  />
                  <Text style={styles.googleText}>Log In with Google</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  Don't you have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserData")}
                >
                  <Text style={styles.signUpLink}> Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ResetPassword")}
                >
                  <Text style={styles.forgetPasswordText}>
                    ¿Did you forget your password?
                  </Text>
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
      </SafeAreaView>
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
  googleButton: {
    width: 200,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 20
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleContainer: {
    flexDirection: "row",
  },
  googleText: {
    fontWeight: 600,
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
  forgotPasswordContainer: {
    marginTop: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 27,
  },
  signUpText: {
    color: "#fff",
  },
  forgetPasswordText: {
    color: "#597EAA",
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
