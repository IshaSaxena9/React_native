import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class ContactUs extends React.Component {
  render() {
    return (
      <View>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card
          title="Contact Information"
        >
          <Text>121, Clear Water Bay Road </Text>
          <Text>{"\n"}Clear Water Bay, Kowloon</Text>
          <Text>{"\n"} HONG KONG</Text>
          <Text>{"\n"} Tel: +852 1234 5678</Text>
          <Text>{"\n"} Fax: +852 8765 4321</Text>
          <Text>{"\n"} Email:confusion@food.net</Text>
        </Card>
        </Animatable.View>
      </View>
    );
  };
}

export default ContactUs;