import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Profile = ({ navigation }) => {
  const handleLogout = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Profile;