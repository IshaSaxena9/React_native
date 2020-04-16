import React from "react";
import { View, Text , ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";

function RenderDish(props) {
  const dish = props.dish;

  if(dish) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10} }>
          {dish.description}
        </Text>
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
      dishes: DISHES,
      comments: COMMENTS
    };
  };

  render() {
    const { dishId = "" } = this.props.route.params;
    return (
      <ScrollView>
        <RenderDish dish={this.state.dishes[+dishId]} />
        <RenderComments comments={this.state.comments.filter(item => item.dishId === dishId)} />
      </ScrollView>
    );
  }
};

export default DishDetail;