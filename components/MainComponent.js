import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import ContactUs from "./ContactComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home}
    options={({ navigation }) => ({ headerStyle: {backgroundColor: "#512DA8"}, headerTintColor: "#fff", headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /> })} />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="About Us" component={AboutUs}
    options={({ navigation }) => ({ headerStyle: {backgroundColor: "#512DA8"}, headerTintColor: "#fff", headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /> })} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Menu" component={Menu} 
    options={({ navigation }) => ({ headerStyle: {backgroundColor: "#512DA8"}, headerTintColor: "#fff", headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /> })} />
  </Stack.Navigator>
);

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Contact Us" component={ContactUs}
    options={({ navigation }) => ({ headerStyle: {backgroundColor: "#512DA8"}, headerTintColor: "#fff", headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} /> })} />
  </Stack.Navigator>
);

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Menu">
          <Drawer.Screen name="Home" component={HomeStack} options={{ drawerIcon: ({ color }) => (
          <Icon name="home" type="font-awesome" size={24} color={color} /> )}} />
          <Drawer.Screen name="About Us" component={AboutStack} options={{ drawerIcon: ({ color }) => (
          <Icon name="info-circle" type="font-awesome" size={24} color={color} /> )}} />
          <Drawer.Screen name="Menu" component={MenuStack} options={{ drawerIcon: ({ color }) => (
          <Icon name="list" type="font-awesome" size={24} color={color} /> )}}/>
          <Drawer.Screen name="Contact Us" component={ContactStack} options={{ drawerIcon: ({ color }) => (
          <Icon name="address-card" type="font-awesome" size={22} color={color} /> )}} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
};

export default Main;