import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
// import DishDetail from "./DishDetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
          <Stack.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }} />
        </Stack.Navigator> */}
        <Drawer.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
          <Stack.Screen name="About Us" component={AboutUs} options={{ title: 'About us' }} />
          <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
          <Stack.Screen name="Contact Us" component={ContactUs} optiosn={{ title: "Contact us" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
};

export default Main;