import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const PostCard = ({ image, post, title }) => {
    const navigation = useNavigation();
  return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("PostDetails", { post })}
      >
        <Image source={image} style={styles.imagePost} />
        <Text style={styles.titlePost}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePost: {
    width: 152,
    height: 152,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 10,
  },
  titlePost: {
    color: "#fff",
    fontSize: 15,
    width: 152,
    textAlign: "center",
    marginTop: 10,
  },
});

export default PostCard;
