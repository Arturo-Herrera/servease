import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SmallLogo } from "../components/logo";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageCard from "../components/messageCard";
import { title } from "framer-motion/client";

const MessagesScreen = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SmallLogo />
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
        {searchVisible && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
        />
      )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        <MessageCard title={'Title'} profilePhoto={require('../../assets/Servease-Logo.jpg')} name={'Name'}/>
        <MessageCard title={'Title'} profilePhoto={require('../../assets/Servease-Logo.jpg')} name={'Name'}/>
        <MessageCard title={'Title'} profilePhoto={require('../../assets/Servease-Logo.jpg')} name={'Name'}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  header: {
    width: "100%",
    margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#393E46",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    marginBottom: 20
  },
  messagesContainer: {
    flexGrow: 1,
  }
});

export default MessagesScreen;
