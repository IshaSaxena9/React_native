import React from "react";
import { View, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from 'expo-mail-composer';

class ContactUs extends React.Component {
  sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "Enquiry",
      body: "To whom it may concern"
    });
  };
  
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
          <Text>{"\n"} Email:confusion@food.net{"\n"}</Text>
          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#512DA8" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.sendMail}
          />
        </Card>
        </Animatable.View>
      </View>
    );
  };
}

export default ContactUs;