import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ListingsCard = ({ title, image, description, price }) => {
    const Navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => Navigation.navigate("ClientPostView")}
    style={styles.card}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.infoContainer}>
          <View style={styles.header}> 
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  card: {
    width: 350,
    height: 124,
    backgroundColor: "#3A4750",
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flexShrink: 1,
    marginLeft: 10,
    maxWidth: 230,
    marginLeft: 25,
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  description: {
    fontSize: 12,
    color: "#fff",
    numberOfLines: 2,
    ellipsizeMode: "tail",
  },
  header: {
    flexDirection:'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingRight: 20
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'regular'
  }
});

export default ListingsCard;
