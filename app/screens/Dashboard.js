
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms } from './../styles'

import { AppContext } from '../context/AppContext.js'

export default function Dashboard({ navigation }) {

  const { id } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

    useEffect(() => {
      if(!id) return;
      fetch(`http://127.0.0.1:8000/api/client/${id}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [id]);

    console.log(data);

  return(

    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator/>
        : (
            <>
              <Text style={styles.client}>{data.name}</Text>
              <FlatList
                data={data.project}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                  <Text style={styles.title}>{item.name}</Text>
                )}
              />
            </>
          )}
    </View>

  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
  },
  client: {
    ...Typography.label,
    marginBottom: Spacing.p5,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p4,
  },
  info: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textLight,
    marginBottom: Spacing.p4,
  },
  errorMessage: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textError,
    marginBottom: Spacing.p3,
  },
  label: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textLight,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
