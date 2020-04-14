import React, { Component } from "react";
import { View, FlatList, Platform, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import constants from "expo-constants";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  };

  render() {
    const { navigation } = this.props;
    const renderMenuItem = ({ item, index }) => (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        onPress={() => navigation.navigate("DishDetail", { dishId: item.id })}
        leftAvatar={{ source: require("./images/uthappizza.png") }}
      />
    );

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 0 : constants.statusBarHeight }}>
    <FlatList
      data={this.state.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
    </View>
  );
  }
};

export default Menu;