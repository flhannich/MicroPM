
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards } from './../styles'

import { AppContext } from '../context/AppContext.js'

export default function Dashboard({ navigation }) {

  const { id } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

console.log(data);
    useEffect(() => {
      if(!id) return;
      fetch(`http://192.168.178.35:8000/api/client/${id}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [id]);

    const Item = ({ item }) => (

      <TouchableHighlight
        onPress={() =>
          navigation.navigate('Task', { item: item })
        }
      >
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.info}>{item.task.length} Tasks</Text>
        </View>
      </TouchableHighlight>

    );

    const renderItem = ({ item }) => (
      <Item item={item} />
    );

  return(

    <View style={styles.container}>

      {isLoading
        ? <ActivityIndicator/>
        : (
          <>
            <FlatList
              data={data.project}
              style={styles.flatList}
              renderItem={renderItem}
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
})
