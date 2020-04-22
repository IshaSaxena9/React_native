import React from "react";
import { View, Text , ScrollView, FlatList, StyleSheet, Modal } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavourite } from "../redux/ActionCreators";

const styles = StyleSheet.create({
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});

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
        <View style={styles.icons}>
        <Icon raised reverse name={props.favourite ? "heart" : "heart-o"} type="font-awesome" color="#f50" onPress={() => props.favourite ? console.log("Already favourite") : props.onPress()} />
        <Icon raised reverse name="pencil" type="font-awesome" color="#512DA8" onPress={props.addComment} />
        </View>
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
      showForm: false
    };
  };

  markFavourite = dishId => {
    this.props.postFavourite(dishId);
  };

  addComment = () => {
    this.setState({ showForm: true });
  };

  resetForm = () => {
    console.log("reset")
  };

  toggleModal = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    const { dishId = "" } = this.props.route.params;
    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.props.favourites.some(item => item === dishId)} onPress={() => this.markFavourite(dishId)} addComment={this.addComment} />
        <RenderComments comments={this.props.comments.comments.filter(item => item.dishId === dishId)} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showForm}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <Text>jdhsvdh</Text>
        </Modal>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  postFavourite: dishId => dispatch(postFavourite(dishId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);