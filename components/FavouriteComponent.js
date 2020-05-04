import React, { Component } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { deleteFavourite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

class Favourites extends Component {
  onDelete = item => {
    Alert.alert("Delete Favourite?",  "Are you sure you wish to delete the favourite dish " + item.name + "?",
    [
      { text: "Cancel", onPress: () => console.log(item.name + " not deleted"), style: "cancel" },
      { text: "OK", onPress: () => this.props.deleteFavourite(item.id)}
    ],
    { cancelable: false }
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { dishes, favourites } = this.props;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => this.onDelete(item)
        }
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            onPress={() => navigate("DishDetail", { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
          </Animatable.View>
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