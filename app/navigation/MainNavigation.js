import React, { useContext, useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './../screens/Home';
import Settings from './../screens/Settings';
import Contact from './../screens/Contact';

import Project from './../screens/stacks/Project';
import Task from './../screens/stacks/Task';
import Review from './../screens/stacks/Review';


import { AuthContext } from '../context/AuthContext.js'

const StackOptions = ({ navigation }) => {

  return {
    // title: '',
    headerTitleStyle: {
      color: 'transparent',
    },
    headerStyle: {
      shadowColor: 'transparent',
    },
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


const HomeStack = createStackNavigator();




function HomeStackScreen() {

 return (
   <HomeStack.Navigator>
    <HomeStack.Screen
      name="Dashboard"
      component={Home}
      options={StackOptions}

    />
    <HomeStack.Screen
      name="Project"
      component={Project}
      options={StackOptions}
    />
    <HomeStack.Screen
      name="Review"
      component={Review}
      options={StackOptions}
    />
    <HomeStack.Screen
      name="Task"
      component={Task}
      options={StackOptions}
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
        options={StackOptions}
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
        options={StackOptions}
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
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-list-box" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactStackScreen}
          options={{
            tabBarLabel: 'Contact',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-chatboxes" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Settings',
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
