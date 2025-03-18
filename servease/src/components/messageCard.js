import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MessageCard = ({ name, profilePhoto, title }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={profilePhoto}

        />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 315,
    height: 104,
    backgroundColor: "rgba(145, 174, 200, 0.2)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  image: {
    width: 59,
    height: 59,
    borderRadius: 30,
  },
  info: {
    flexDirection: "column",
    marginLeft: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  name: {
    color: "#fff",
    fontSize: 12,
  },
});

export default MessageCard;
