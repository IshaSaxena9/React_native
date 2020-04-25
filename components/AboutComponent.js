import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const styles = StyleSheet.create({
  textView: {
    paddingLeft: 10,
  }
});

const History = () => (
  <Card
    title="Our History"
  >
    <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
    <Text>{"\n"}The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
  </Card>
);

class AboutUs extends React.Component {
  render() {
    const itemRenderer = ({ item, index }) => (
      <ListItem
        key={index}
        title={<Text style={styles.textView}>{item.name}</Text>}
        subtitle={<View style={styles.textView}><Text>{item.description}</Text></View>}
        hideChevron={true}
        leftAvatar={{ source: { uri: baseUrl + item.image} }}
      />
    );

    const leaders = (
      <Card
        title="Corporate Leadership"
      >
      {this.props.leaders.isLoading ? <Loading /> : this.props.leaders.errMess ? <Text>{this.props.leaders.errMess}</Text> : (
        <FlatList
          data={this.props.leaders.leaders}
          renderItem={itemRenderer}
          keyExtractor={item => item.id.toString()}
        />)}
      </Card>
    );

    return (
      <ScrollView>
        <History />
        {leaders}
      </ScrollView>
    );
  };
}

const mapStateToProps = state => ({
  leaders: state.leaders
});

export default connect(mapStateToProps)(AboutUs);