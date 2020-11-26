
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Buttons, Files } from './../styles'

import { AuthContext } from '../context/AuthContext.js'

import { CardProject } from '../components'

export default function Home({ navigation }) {

  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000

//   useFocusEffect(
//     useCallback(() => {
//       _getData(token);
//
//       return () => {
//         // Do something when the screen is unfocused
//         // Useful for cleanup functions
//       };
//     }, [])
// )


  useEffect(() => {
    console.log(token);
    if(!token) return;
    fetch(`http://192.168.178.35:8000/api/projects`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, [token]);


  return (

    <ScrollView style={styles.container}>

      <View style={{paddingBottom: Spacing.p6}}>

        {isLoading
          ? <ActivityIndicator style={styles.activityIndicator}/>
          : (
            <>

              <Text style={styles.mainTitle}>Your Projects</Text>

                {data.projects.length > 0 &&

                  <View style={styles.projectsWrapper}>
                    { data.projects.map((item, index) =>
                      <CardProject
                        key={index}
                        item={item}
                        navigation={navigation}
                      />
                    )}
                  </View>

                }

            </>
          )}

        </View>

      </ScrollView>

  )

}


const styles = StyleSheet.create({
  activityIndicator: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 projectsWrapper: {
   display: 'flex',
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
  container: {
    ...Spacing.container,
    flex: 1,
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p6,
  },
})
