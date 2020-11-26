import React, { useContext, useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Buttons, Typography } from './../styles';

import Home from './../screens/Home';
import Settings from './../screens/Settings';
import Contact from './../screens/Contact';

import Project from './../screens/stacks/Project';
import Task from './../screens/stacks/Task';

import { Badge } from '../components'

import { DataContext } from '../context/DataContext.js'

const stackOptions = ( { navigation, route } ) => {

  return {
    headerTitleStyle: {
      color: 'transparent',
    },
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    animationEnabled: false,
    headerBackTitle: ' ',
    mode: 'modal',
    detachInactiveScreens: true,
    headerRight: () => (

      <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10,width: 120}}>

         <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
         >
           <Ionicons
              style={styles.icon}
             name="ios-more"
             color='#007AFF'
             size={24}
           />
         </TouchableOpacity>

       </View>
    )
  }
}


const MainStack = createStackNavigator();

const MainNavigation = () => {

  return (

    <NavigationContainer>
      <MainStack.Navigator>
       <MainStack.Screen
         name="Home"
         component={Home}
         options={stackOptions}
       />
       <MainStack.Screen
         name="Project"
         component={Project}
         options={stackOptions}
       />
       <MainStack.Screen
         name="Task"
         component={Task}
         options={stackOptions}
       />
       <MainStack.Screen
         name="Settings"
         component={Settings}
         options={stackOptions}
       />
      </MainStack.Navigator>
    </NavigationContainer>

  );
}

export default MainNavigation


const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: Spacing.p2,
    marginLeft: Spacing.p2,
  },
  reviewButtonWrapper: {
    marginRight: Spacing.p1,
  },
  reviewButton: {
    ...Typography.badge,
    ...Colors.textBrand,
    ...Buttons.badgeReview,
  },
  reviewButtonsCounter: {
    position: 'absolute',
    top: -4,
    right: -8,
    ...Typography.badge,
    ...Colors.textWhiteFull,
    ...Buttons.badgeCounterHeader,
  },
})
