import React, { useState, useContext } from 'react'
import { Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Dashboard from './../screens/Dashboard';
import Settings from './../screens/Settings';
import Project from './../screens/Project';
import Login from './../screens/Login';

import { AppContext } from './../context/AppContext.js'

const Stack = createStackNavigator();

const navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Settings')
        }
        title="Profil"
      />
    )
  }
}

const StackNavigation = () => {

  const { isValidated } = (useContext(AppContext));

  return (
    <>
      {isValidated &&
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
           name="Board"
           component={Dashboard}
           options={navigationOptions}
         />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            name="Project"
            component={Project}
            options={navigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
      }
    </>
  )
}


export default StackNavigation
