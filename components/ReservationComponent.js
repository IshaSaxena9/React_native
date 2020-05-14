import React from "react";
import { View, Text, ScrollView, StyleSheet, Picker, Switch, Button, TouchableOpacity, Alert, Platform } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import { Notifications } from "expo";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false,
      showTimePicker: false,
    };
  };

  changeTime = (_event, date) => this.setState({ date, showTimePicker: false });

  changeDate = (_event, date) => this.setState({ date, showDatePicker: false });

  handleReservation = () => {
    const { guests, smoking, date } = this.state;
    Alert.alert("Your Reservation OK?", `Number of Guests: ${guests}\nSmoking?: ${smoking}\nDate and Time: ${date.toString()}`, [
      {text: "Cancel", onPress: () => this.resetForm()},
      {text: "OK", onPress: () =>  {
          this.presentLocalNotification(this.state.date);
          this.addReservationToCalendar(this.state.date);
          this.resetForm();
        }
      }
    ],
    {cancelable: false});
  };

  resetForm = () => {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false,
      showTimePicker: false
    });
  };

  obtainNotificationPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if(permission.status !== "granted") {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if(permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      };
    };
    return permission;
  };

  addReservationToCalendar = async date => {
    let startDate = new Date(date);
    const calendarPerm = await this.obtainCalendarPermission();
    if(calendarPerm.status === "granted") {
      Calendar.createEventAsync("1", {
        title: "Con Fusion Table Reservation",
        startDate: date,
        endDate: startDate.setHours(startDate.getHours() + 2),
        timeZone: "Asia/Hong_Kong",
        location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong"
      });
    };
  };

  obtainCalendarPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if(permission.status !== "granted") {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if(permission.status !== "granted") {
        Alert.alert("Permission not granted to access calendar");
      };
    };
    return permission;
  };

  presentLocalNotification = async date => {
    await this.obtainNotificationPermission();
    if(Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("notify", {
        name: "notify",
        sound: true,
        vibrate: true
      })
    };
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date.toDateString() + " requested",
      ios: {
        sound: true
      },
      android: {
        color: "#512DA8",
        channelId: "notify"
      }
    });
  };

  render() {
    const { showDatePicker, showTimePicker } = this.state;
    return  (
      <ScrollView>
        <Animatable.View animation="zoomIn">
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, _itemIndex) => this.setState({ guests: itemValue })}
          >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={this.state.smoking}
            onTintColor="#512DA8"
            onValueChange={value => this.setState({ smoking: value })}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date</Text>
          <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
            <Text>{this.state.date.toDateString()}</Text>          
          </TouchableOpacity>
          {showDatePicker ? (
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            value={this.state.date}
            mode="date"
            minimumDate={new Date("2017-01-01")}
            onChange={this.changeDate}
          />) : null}
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Time</Text>
          <TouchableOpacity onPress={() => this.setState({ showTimePicker: true })}>
            <Text>{this.state.date.toLocaleTimeString()}</Text>          
          </TouchableOpacity>
          {showTimePicker ? (
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            value={this.state.date}
            mode="time"
            minimumDate={new Date("2017-01-01")}
            onChange={this.changeTime}
          />) : null}
        </View>
        <View style={styles.formRow}>
          <Button
            title="Reserve"
            color="#512DA8"
            onPress={() => this.handleReservation()}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        </Animatable.View>
        </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  }
});

export default Reservation;