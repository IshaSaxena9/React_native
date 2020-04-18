import React, { Component } from "react";
import { View, FlatList, Platform } from "react-native";
import { Tile } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import constants from "expo-constants";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

class Menu extends Component {
  render() {
    const { navigation } = this.props;
    const renderMenuItem = ({ item, index }) => (
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={() => navigation.navigate("DishDetail", { dishId: item.id })}
        imageSrc={{ uri: baseUrl + item.image }}
      />
    );

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 0 : constants.statusBarHeight }}>
    <FlatList
      data={this.props.dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
    </View>
  );
  }
};

const mapStateToProps = state => ({
  dishes: state.dishes,
});

export default connect(mapStateToProps)(Menu);