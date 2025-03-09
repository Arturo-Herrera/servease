import * as React from "react";
import { StyleSheet, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/login";
import { UserDataScreen, PersonDataScreen } from "../screens/signUp";
import MainMenu from "../screens/mainMenu";
import Categories from "../screens/categories";
import MyListings from "../screens/myListings";
import Profile from "../screens/profile";
import ResetPassword from "../screens/resetPassword";
import PostDetails from "../screens/postDetails";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{  
              headerShown: false,
              gestureEnabled:  false
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PersonData"
            component={PersonDataScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UserData"
            component={UserDataScreen}
          />
          <Stack.Screen
            name="MainMenu"
            component={MainMenu}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              presentation: "modal",
              headerTitle: "Categories",
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: "#222831",
              },
              headerLeft: false
            }}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="MyListings"
            component={MyListings}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerTitle: 'Profile',
              headerTintColor: "#597EAA",
              headerBackTitle: '',
              headerStyle: {
                backgroundColor: "#222831",
              },

            }}
            name="Profile"
            component={Profile}
          />

          <Stack.Screen 
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="PostDetails"
            component={PostDetails}
            options={{
              headerShown: false
            }}
          />
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
