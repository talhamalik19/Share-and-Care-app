import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import Button from "../components/UI/Button";

export default function NoConnectionScreen({ navigation, route }) {
  const { checkForInternetConnection, checkForCredentialsInLocalStorage } =
    route.params;

  const onPressHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    checkForInternetConnection();
    checkForCredentialsInLocalStorage();
  };

  const animation = useRef(null);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <LottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../assets/animations/no-internet-connection.json")}
        />
        <Text style={styles.text}>No internet connection</Text>
        <Text style={styles.subTitle}>
          Please check your Wifi or Cellular Connection
        </Text>
      </View>
      <Button
        style={{
          width: "40%",
        }}
        onPress={onPressHandler}
      >
        Retry
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: gs.colors.text,
    marginTop: 15,
    textAlign: "center",
  },
});
