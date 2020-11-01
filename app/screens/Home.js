
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Buttons, Files } from './../styles'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import { parseISO } from 'date-fns/parseISO'

import { AuthContext } from '../context/AuthContext.js'

import { FilePreview } from '../components'
import { CardProject } from '../components'
import { CardReview } from '../components'

export default function Home({ navigation }) {

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
        })
        .catch((error) => console.error(error))
        .finally((json) => setLoading(false));
    }, [id]);


  return (

    <ScrollView style={styles.container}>

      {isLoading
        ? <ActivityIndicator/>
        : (
          <>
          <Text style={styles.mainTitle}>Welcome</Text>

          {data.reviews.length > 0 &&
            <View style={styles.listReviews}>
              <View style={styles.cardTitle}>
                <Text style={styles.status}>Open Reviews</Text>
              </View>

              { data.reviews.map((item, index) =>
                <CardReview
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              )}
            </View>
          }

          {data.projects.length > 0 &&
            <>
              <View style={styles.cardTitle}>
                <Text style={styles.status}>Timelines</Text>
              </View>

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
    marginBottom: Spacing.p5,
  },
  listReviews: {
    marginBottom: Spacing.p5,
  },
  cardTitle: {
    marginBottom: Spacing.p3,
  },
})
