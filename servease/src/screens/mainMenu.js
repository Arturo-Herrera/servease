import React from "react";
import { ScrollView, Text, StyleSheet, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MainMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.nav}>Categories</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text style={styles.nav}>Messages</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text style={styles.nav}>My offers</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
        <View style={styles.subBar}>
          <Text style={styles.recentPost}>Recent Post</Text>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
           >
            <Text style={styles.location}>Location</Text>
          </Pressable>
        </View>

        <Text style={{ color: "#fff" }}>
          Aqui ira el contenido de los posts
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    paddingLeft: 30,
    paddingRight: 30,
  },
  recentPost: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 16,
    left: 10,
  },
  location: {
    color: "#91AEC8",
    fontWeight: 500,
    fontSize: 14,
    right: 10,
  },
  subBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nav: {
    color: "#fff",
    fontFamily: "system-ui",
    fontWeight: 400,
    fontSize: 16,
  },
});

export default MainMenu;
