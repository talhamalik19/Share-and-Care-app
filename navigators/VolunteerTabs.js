import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../screens/Volunteers/FeedScreen";

const Tab = createMaterialTopTabNavigator();

export default function VolunteerTabs({ navigation, route }) {
  return (
    <Tab.Navigator backBehavior="none" keyboardDismissMode="on-drag">
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: "Feed",
        }}
        component={FeedScreen}
        initialParams={{
          screen: "all",
        }}
      />
      <Tab.Screen
        name="MyRequests"
        options={{
          tabBarLabel: "My Requests",
        }}
        component={FeedScreen}
        initialParams={{
          screen: "myRequests",
        }}
      />
    </Tab.Navigator>
  );
}
