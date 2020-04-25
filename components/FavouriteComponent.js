import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { deleteFavourite } from "../redux/ActionCreators";

class Favourites extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { dishes, favourites } = this.props;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => this.props.deleteFavourite(item.id)
        }
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            onPress={() => navigate("DishDetail", { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Swipeout>
      )
    }

    if (dishes.isLoading) {
      return <Loading />
    } else if (dishes.errMess) {
      return (
        <View>
          <Text>{dishes.errMess}</Text>
        </View>
      )
    } else if (favourites.length) {
      return (
        <FlatList
          data={this.props.dishes.dishes.filter(dish => this.props.favourites.some(item => item === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    } else {
      return (
        <View>
          <Text>No Favourites yet.</Text>
        </View>
      )
    }
  }
};

const mapStateToProps = state => ({
  dishes: state.dishes,
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  deleteFavourite: dishId => dispatch(deleteFavourite(dishId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);