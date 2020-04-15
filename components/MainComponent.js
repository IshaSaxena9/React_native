import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import ContactUs from "./ContactComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="About Us" component={AboutUs} options={{ title: "About us" }} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Menu" component={Menu} options={{ title: "Menu" }} />
  </Stack.Navigator>
);

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Contact Us" component={ContactUs} options={{ title: "Contact us" }} />
  </Stack.Navigator>
);

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="About Us" component={AboutStack} />
          <Drawer.Screen name="Menu" component={MenuStack} />
          <Drawer.Screen name="Contact Us" component={ContactStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
};

export default Main;