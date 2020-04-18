import React from "react";
import { View, Text , ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

function RenderDish(props) {
  const dish = props.dish;

  if(dish) {
    return (
      <Card
        featuredTitle={dish.name}
        image={{ uri: baseUrl + dish.image }}
      >
        <Text style={{ margin: 10} }>
          {dish.description}
        </Text>
        <Icon raised reverse name={props.favourite ? "heart" : "heart-o"} type="font-awesome" color="#f50" onPress={() => props.favourite ? console.log("Already favourite") : props.onPress()} />
      </Card>
    );
  } else {
    return <View />;
  };
};

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    const date = new Date(item.date);
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} stars</Text>
        <Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + date.toUTCString()}</Text>
      </View>
    )
  };
  return (
    <Card title="Comments">
      <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
    </Card>
  )
}

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: []
    };
  };

  markFavourite = dishId => {
    this.setState({ favourites: this.state.favourites.concat(dishId) });
  };

  render() {
    const { dishId = "" } = this.props.route.params;
    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.state.favourites.some(item => item === dishId)} onPress={() => this.markFavourite(dishId)} />
        <RenderComments comments={this.props.comments.comments.filter(item => item.dishId === dishId)} />
      </ScrollView>
    );
  }
};

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments
});

export default connect(mapStateToProps)(DishDetail);