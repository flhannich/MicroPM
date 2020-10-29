import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Dashboard from './../screens/Dashboard';
import Settings from './../screens/Settings';
import Contact from './../screens/Settings';
import Task from './../screens/Task';

import { AppContext } from '../context/AppContext.js'


const TaskStackOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <MaterialCommunityIcons
        name="information-variant"
        onPress={() => navigation.navigate('Settings')}
        color='#999'
        size='24'
      />
    )
  }
}

const DashboardStack = createStackNavigator();

function DashboardStackScreen() {

 return (
   <DashboardStack.Navigator>
    <DashboardStack.Screen
      name="Dashboard"
      component={Dashboard}
    />
    <DashboardStack.Screen
      name="Task"
      component={Task}
      // options={TaskStackOptions}
      />
   </DashboardStack.Navigator>

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

const MainNavigation = () => {

  const { isValidated } = (useContext(AppContext));

  return (

    <>
    {isValidated &&

    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
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
          name="Dashboard"
          component={DashboardStackScreen}
          options={{
            tabBarLabel: 'Tasks',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ContactStackScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-box" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

    }
  </>

  );
}

export default MainNavigation
