import React, { useContext, useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from './../styles';

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
    headerBackTitle: ' ',
    headerRight: () => (
      <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10,width: 120}}>
         <TouchableOpacity>
           <Ionicons
             name="ios-more"
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

const MainNavigation = ({ data }) => {

  return (

    <NavigationContainer>
      <HomeStack.Navigator>
       <HomeStack.Screen
         name="Home"
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
       <HomeStack.Screen
         name="Settings"
         component={Settings}
         options={StackOptions}
       />
      </HomeStack.Navigator>
    </NavigationContainer>

  );
}

export default MainNavigation
