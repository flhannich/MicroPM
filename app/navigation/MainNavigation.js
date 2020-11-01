import React, { useContext, useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './../screens/Home';
import Settings from './../screens/Settings';
import Contact from './../screens/Settings';
import Project from './../screens/Project';

import { AuthContext } from '../context/AuthContext.js'

const ProjectStackOptions = ({ navigation }) => {

  return {
    headerRight: () => (
      <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10,width: 120}}>
         <TouchableOpacity>
           <Ionicons
             name="ios-chatboxes"
             onPress={() => navigation.navigate('Settings')}
             color='#007AFF'
             size={24}
           />
         </TouchableOpacity>
       </View>
    )
  }
}

const HomeStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10,width: 120}}>
         <TouchableOpacity>
           <Ionicons
             name="ios-help-circle"
             onPress={() => navigation.navigate('Settings')}
             color='#007AFF'
             size={24}
           />
         </TouchableOpacity>
       </View>
    )
  }
}

const HomeStack = createStackNavigator();




function HomeStackScreen() {

 return (
   <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={HomeStackOptions}
    />
    <HomeStack.Screen
      name="Project"
      component={Project}
      options={ProjectStackOptions}
      />
   </HomeStack.Navigator>

  );
}


const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
      />
    </SettingsStack.Navigator>
  );
}


const ContactStack = createStackNavigator();

function ContactStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Contact"
        component={Contact}
      />
    </SettingsStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const MainNavigation = ({ data }) => {

  return (

    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#007AFF',
          // labelStyle: {
          //   fontSize: 11,
          //   paddingTop: 0 //-> e.g number of tabs
          // },
          // tabStyle: {
          //   // height: 0, //-> e.g number of tabs
          //   paddingVertical: 0 //-> e.g number of tabs
          // }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          data={data}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-list-box" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-chatboxes" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ContactStackScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default MainNavigation
