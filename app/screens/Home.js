
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Buttons } from './../styles'

import { AuthContext } from '../context/AuthContext.js'

export default function Home( probs, { navigation }) {
  
  console.log(probs);

  const { id } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

//192.168.178.83 mbpro
//192.168.178.35 imac
// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000

    useEffect(() => {
      if(!id) return;
      fetch(`http://192.168.178.83:8000/api/client/${id}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [id]);

    const ProjectListItem = ({ item }) => {

      const reviews = item.tasks.filter(item => item.status.indexOf('review') !== -1);

      return (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Project', { item: item })
            }
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              {reviews.length > 0 &&
                <Text style={styles.badgeReview}> {reviews.length} Review</Text>
              }
              <Text style={styles.info}>{item.tasks.length} Tasks</Text>
            </View>
          </TouchableHighlight>
      )
    };

  return (

    <View style={styles.container}>

      {isLoading
        ? <ActivityIndicator/>
        : (
          <>
            <FlatList
              data={data.projects}
              style={styles.flatList}
              renderItem={ProjectListItem}
              keyExtractor={(item, index) => 'key'+index}
            />
          </>
        )}
    </View>

  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  card: {
    ...Cards.card,
    marginBottom: Spacing.p2,
  },
  flatList: {
    paddingTop: Spacing.p4,
  },
  client: {
    ...Typography.label,
    marginBottom: Spacing.p4,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  info: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textLight,
  },
  badgeReview: {
    ...Typography.badge,
    ...Colors.textWhiteFull,
    ...Buttons.badgeReview,
    marginBottom: Spacing.p2,
  },
})
