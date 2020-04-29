import React from "react";
import { View, Text , ScrollView, FlatList, StyleSheet, Modal, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavourite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

function RenderDish(props) {
  const dish = props.dish;

  if(dish) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
      </Animatable.View>
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
        <Rating startingValue={item.rating} readonly imageSize={20} />
        <Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + date.toUTCString()}</Text>
      </View>
    )
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
    <Card title="Comments">
      <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
    </Card>
    </Animatable.View>
  )
}

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      rating: 0,
      author: "",
      comment: ""
    };
  };

  markFavourite = dishId => {
    this.props.postFavourite(dishId);
  };

  addComment = () => {
    this.setState({ showForm: true });
  };

  resetForm = () => {
    this.setState({
      rating: 0,
      author: "",
      comment: ""
    });
  };

  toggleModal = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleComment = () => {
    const { dishId = "" } = this.props.route.params;
    const { rating, author, comment } = this.state;
    if(author && comment) {
      const commentObj = {
        dishId, rating, author, comment
      };
      this.props.postComment(commentObj);
    }
    this.toggleModal();
  };

  render() {
    const { dishId = "" } = this.props.route.params;
    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.props.favourites.some(item => item === dishId)} onPress={() => this.markFavourite(dishId)} addComment={this.addComment} />
        {this.props.comments.comments.length ? <RenderComments comments={this.props.comments.comments.filter(item => item.dishId === dishId)} /> : null}
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
          <View style={styles.modal}>
            <Rating
            showRating
            startingValue={0}
            ratingCount={5}
            minValue={1}
            onFinishRating={rating => this.setState({ rating })}
            />
            <Input
              placeholder="Author"
              leftIcon={
                <Icon name="user" size={24} type="font-awesome" iconStyle={styles.formIcons} />
              }
              value={this.state.author}
              onChangeText={author => this.setState({ author })}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder="Comment"
              leftIcon={
                <Icon name="comment" size={22} type="font-awesome" iconStyle={styles.formIcons} />
              }
              value={this.state.comment}
              onChangeText={comment => this.setState({ comment })}
              containerStyle={styles.formInput}
            />
            <Text />
            <Button 
              onPress={this.handleComment}
              color="#512DA8"
              title="Submit"
              />
              <Text />
              <Button 
              onPress={() => {
              this.toggleModal();
              this.resetForm();
              }}
              color="#85807f"
              title="Cancel"
              />
          </View>
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
  postFavourite: dishId => dispatch(postFavourite(dishId)),
  postComment: comment => dispatch(postComment(comment))
});

const styles = StyleSheet.create({
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  modal: {
    margin: 25
  },
  formIcons: {
    marginRight: 5
  },
  formInput: {
    marginTop: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);