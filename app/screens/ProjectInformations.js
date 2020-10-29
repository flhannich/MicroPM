
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards } from './../styles'

import { AppContext } from '../context/AppContext.js'

export default function Project(project) {

  const { id } = useContext(AppContext);

  const Item = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.info}>{item.status}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
      <Item item={item} />
  );

  return(

    <View style={styles.container}>
      <>
        <FlatList
          data={project.route.params.item.task}
          style={styles.flatList}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'key'+index}
        />
      </>
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
