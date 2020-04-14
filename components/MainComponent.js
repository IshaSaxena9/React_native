import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
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
          <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
};

export default Main;