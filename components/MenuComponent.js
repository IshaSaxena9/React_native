import React, { Component } from "react";
import { View, FlatList, Platform , Text} from "react-native";
import { Tile } from "react-native-elements";
import constants from "expo-constants";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

class Menu extends Component {
  render() {
    const { navigation } = this.props;
    const renderMenuItem = ({ item, index }) => (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={() => navigation.navigate("DishDetail", { dishId: item.id })}
        imageSrc={{ uri: baseUrl + item.image }}
      />
      </Animatable.View>
    );

    if(this.props.dishes.isLoading) {
      return <Loading />
    } else if(this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      )
    } else {
  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 0 : constants.statusBarHeight }}>
    <FlatList
      data={this.props.dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
    </View>
  )};
  }
};

const mapStateToProps = state => ({
  dishes: state.dishes,
});

export default connect(mapStateToProps)(Menu);