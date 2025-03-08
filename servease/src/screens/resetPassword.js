import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/FBconfig";
import { BigLogo } from "../components/logo";

const ResetPassword = ({ navigation}) => {
  const [email, setEmail] = useState("");

  handleResetPassword = () => {
    if (!email) {
      alert("Please, enter an email");
      return;
    }

    try {
      sendPasswordResetEmail(auth, email);
      alert("Check your email to reset your password");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      alert("Error: There was a problem");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <BigLogo />
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.emailInput}
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.forgotPasswordText}>Send Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222831",
  },
  title: {
    fontSize: 24,
    color: "#EEF1F5",
    fontFamily: "merriweather",
    marginBottom: 20,
  },
  emailInput: {
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
  resetButton: {
    backgroundColor: "#597EAA",
    width: 283,
    height: 62,
    borderWidth: 1,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default ResetPassword;
