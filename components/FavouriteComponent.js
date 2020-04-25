import React, { Component } from "react";
import { View, FlatList, Text} from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

class Favourites extends Component {
  render () {
    const { navigate } = this.props.navigation;
    const { dishes } = this.props;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        onPress={() => navigate("DishDetail", { dishId: item.id })}
        leftAvatar={{ source: { uri: baseUrl + item.image }}}
        />
      )
    }

    if(dishes.isLoading) {
      return <Loading />
    } else if(dishes.errMess) {
      return (
        <View>
          <Text>{dishes.errMess}</Text>
        </View>
      )
    } else if(dishes.dishes.length) {
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

export default connect(mapStateToProps)(Favourites);