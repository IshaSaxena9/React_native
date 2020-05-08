import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseUrl } from "../shared/baseUrl";
import * as ImageManipulator from "expo-image-manipulator";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false
    };
  };

  componentDidMount() {
    SecureStore.getItemAsync("userinfo")
    .then(userData => {
      let userInfo = JSON.parse(userData);
      if(userInfo) {
        const { username, password } = userInfo;
        this.setState({ username, password, remember: true });
      };
    });
  };

  handleLogin = () => {
    const { username, password, remember } = this.state;
    if(remember) {
      SecureStore.setItemAsync("userinfo", JSON.stringify({
        username, password
      }))
      .catch(error => console.log("Could not save user info ", error));
    } else {
      SecureStore.deleteItemAsync("userinfo")
      .catch(error => console.log("Could not delete user info ", error));
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <CheckBox
          title="Remember Me"
          checked={this.state.remember}
          center
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={this.handleLogin}
            title="Login"
            icon={<Icon name="sign-in" type="font-awesome" color="white" size={24} containerStyle={styles.leftIcon} />}
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            icon={<Icon name="user-plus" type="font-awesome" color="blue" size={24} containerStyle={styles.leftIcon} />}
            titleStyle={{ color: "blue" }}
            buttonStyle={{ backgroundColor: "transparent" }}
          /> 
        </View>
      </View>
    );
  };
};

class RegisterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: baseUrl + "images/logo.png"
    };
  };

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3]
      });
      if(!capturedImage.cancelled)
        this.processImage(capturedImage.uri);
    };
  };

  processImage = async imageUri => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 200 }}
      ],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    this.setState({ imageUrl : processedImage.uri });
  };

  handleRegister = () => {
    console.log(JSON.stringify(this.state));
    if(this.state.remember) {
      SecureStore.setItemAsync("userinfo", JSON.stringify({
        username, password
      }))
      .catch(error => console.log("Could not save user info ", error));
    };
  };

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: this.state.imageUrl }}
          loadingIndicatorSource={require("./images/logo.png")}
          style={styles.image}
        />
        <Button title="Camera" onPress={this.getImageFromCamera} />
      </View>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <Input
          placeholder="Firstname"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={firstname => this.setState({ firstname })}
          value={this.state.firstname}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <Input
          placeholder="Lastname"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={lastname => this.setState({ lastname })}
          value={this.state.lastname}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope-o" }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.leftIcon}
        />
        <CheckBox
          title="Remember Me"
          checked={this.state.remember}
          center
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={this.handleRegister}
            title="Register"
            icon={<Icon name="user-plus" type="font-awesome" color="white" size={24} containerStyle={styles.leftIcon} />}
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

const Tab = createBottomTabNavigator();

const Login = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "#9575CD",
      inactiveBackgroundColor: "#D1C4E9",
      activeTintColor: "white",
      inactiveTintColor: "gray",
      labelStyle: { fontSize: 18 },
    }}
  >
    <Tab.Screen name="Login" component={LoginTab} options={{
      tabBarIcon: ({ color }) => <Icon name="sign-in" type="font-awesome" size={20} iconStyle={{ color }} />
    }} />
    <Tab.Screen name="Register" component={RegisterTab} options={{
      tabBarIcon: ({ color }) => <Icon name="user-plus" type="font-awesome" size={20} iconStyle={{ color }} />
    }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20
  },
  formInput: {
    marginVertical: 10
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null
  },
  formButton: {
    marginVertical: 20,
    marginHorizontal: 40
  },
  leftIcon: {
    marginRight: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Login;