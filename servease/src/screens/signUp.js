import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  View,
  Modal,
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

//Pantalla de datos de usuario
const UserDataScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  //Funcion para crear un usuario con email y contraseña en authentication
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

    //Aca se suben los datos que puso el usuario a firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //Aca pasamos de pantalla a personData y le pasamos el email y el id de firebase para guardar los datos en MYSQL
        navigation.navigate("PersonData", {
          email: email,
          firebase_uid: user.uid,
        });
        console.log("User created: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setPasswordError("Email already in use");
          console.log("Email already in use");
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

//Pantalla de datos personales
const PersonDataScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("client");
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  //Route params es para poder obtener los datos que se pasan de la pantalla de userData
  const { email, firebase_uid } = route.params;

  //Funcion para subir los datos del usuario a MYSQL
  handlePersonData = async () => {
    Keyboard.dismiss();

    if (!name || !lastname || !phoneNumber) {
      setPasswordError("All fields are required");
      console.log("All fields are required");
    }

    const userData = {
      firebase_uid: firebase_uid,
      nombre: `${name} ${lastname}`,
      email: email,
      telefono: phoneNumber,
      tipo: userType
    };

    try {
      const response = await fetch(
        "http://192.168.1.71:8000/api/registerUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.ok) {
        setAlert({
          message: "Account created successfully",
          type: "success",
          visible: true,
        });
        setTimeout(() => {
          navigation.navigate("MainMenu")
          console.log("Account created successfully");
        }, 2000)
      } else {
        setAlert({
          message: "Error creating account",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      setAlert({
        message: "Server conection error",
        type: "error",
        visible: true,
      });
      console.log("Server conection error", error);
    }
  };

  hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

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
              style={styles.selectButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.selectButtonText}>
                {userType === 'client' ? 'Client' : 'Provider'}
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Select Role</Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setUserType('cliente');
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Client</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setUserType('proveedor');
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Provider</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handlePersonData()}
            >
              <Text style={styles.loginButtonText}>Create Account</Text>
            </TouchableOpacity>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.0)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    paddingVertical: 15,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#333",
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
  selectButton: {
    width: 283,
    height: 62,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 90,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#3A4750",
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 24,
    justifyContent: "center",
  },
  selectButtonText: {
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
