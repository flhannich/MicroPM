
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { Colors, Typography, Spacing, Forms, Cards, Buttons, Files } from './../styles'

import { AuthContext } from '../context/AuthContext.js'
import { DataContext } from '../context/DataContext.js'

import { CardProject } from '../components'

export default function Home({ navigation }) {

  const { data, setData } = useContext(DataContext);
  const { token } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(true);

// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000

  useFocusEffect(
    useCallback(() => {
      _getData(token);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
)

  useEffect(() => {

    _getData(token);

  }, [token]);


  const _getData = (token) => {
    if(!token) return;
    fetch(`http://192.168.178.35:8000/api/client/projects`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setData(json)
      setLoading(false);
    })
    .catch((error) => console.error(error))
  }


  return (

    <ScrollView style={styles.container}>

      <View style={{paddingBottom: Spacing.p6}}>

        {isLoading
          ? <ActivityIndicator/>
          : (
            <>
            <Text style={styles.mainTitle}>Your Projects</Text>
            {data.projects.length > 0 &&
              <>

                { data.projects.map((item, index) =>
                  <CardProject
                    key={index}
                    item={item}
                    navigation={navigation}
                  />
                )}
              </>
            }
            </>
          )}

        </View>

      </ScrollView>

  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p6,
  },
})
