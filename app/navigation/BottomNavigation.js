import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppContext } from './../context/AppContext.js'

import Dashboard from './../screens/Dashboard';
import Settings from './../screens/Settings';
import Project from './../screens/Project';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

  const { isValidated } = (useContext(AppContext));

  return (
    <>
    {isValidated &&

      <NavigationContainer>

        <Tab.Navigator
          initialRouteName="Dashboard"
          tabBarOptions={{
            activeTintColor: '#007AFF',
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: 'Projects',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Contact',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Settings}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>

      </NavigationContainer>

    }
    </>
  );
}

export default BottomNavigation
