import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

class ContactUs extends React.Component {
  render() {
    return (
      <View>
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
      </View>
    );
  };
}

export default ContactUs;