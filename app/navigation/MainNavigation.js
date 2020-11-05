import React, { useContext, useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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

import { Badge } from '../components'

import { AuthContext } from '../context/AuthContext.js'
import { ReviewContext } from '../context/ReviewContext.js'

const stackOptions = ( { navigation } ) => {

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

         <TouchableOpacity
          onPress={() => navigation.navigate('Review')}
         >
           <Badge
              style={styles.badge}
             status={'review'}
             count={'2'}
           />
         </TouchableOpacity>

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


const HomeStack = createStackNavigator();


const MainNavigation = ({ data }) => {

  const { reviews } = useContext(ReviewContext);

  return (

    <NavigationContainer>
      <HomeStack.Navigator>
       <HomeStack.Screen
         name="Home"
         component={Home}
         options={stackOptions}
       />
       <HomeStack.Screen
         name="Project"
         component={Project}
         options={stackOptions}
       />
       <HomeStack.Screen
         name="Review"
         component={Review}
         options={stackOptions}
       />
       <HomeStack.Screen
         name="Task"
         component={Task}
         options={stackOptions}
       />
       <HomeStack.Screen
         name="Settings"
         component={Settings}
         options={stackOptions}
       />
      </HomeStack.Navigator>
    </NavigationContainer>

  );
}

export default MainNavigation


const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: Spacing.p2,
    marginLeft: Spacing.p2,
  },
})
