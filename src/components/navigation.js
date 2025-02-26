import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SmallLogo } from "/logo";
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signUp";
import MainMenu from "../screens/mainMenu";
import Categories from "../screens/categories";
import MyListings from "../screens/myListings";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            name="MainMenu"
            component={MainMenu}
            options={{
              headerLeft: () => <SmallLogo />,
              headerStyle: {
                backgroundColor: "#222831",
                borderBottomWidth: 0,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTitle: "",
              headerLeftContainerStyle: {
                top: 20,
                left: -5,
              },
              gestureEnabled: false,
              headerRight: () => (
                <Text
                  style={{
                    top: 20,
                    right: 15,
                    color: "#fff",
                  }}
                >
                  Profile
                </Text>
              ),
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              presentation: "modal",
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#222831",
              },
            }}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="MyListings"
            component={MyListings}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
});

export default Navigation;
