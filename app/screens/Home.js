
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Buttons, Files } from './../styles'

import { AuthContext } from '../context/AuthContext.js'
import { ReviewContext } from '../context/ReviewContext.js'

import { CardProject } from '../components'

export default function Home({ navigation }) {

  const { setReviews } = useContext(ReviewContext);
  const { id } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

//192.168.178.83 mbpro
//192.168.178.35 imac
// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000

    useEffect(() => {
      if(!id) return;
      fetch(`http://192.168.178.35:8000/api/client/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
          setReviews(json.reviews)
        })
        .catch((error) => console.error(error))
        .finally((json) => setLoading(false));
    }, [id]);

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
