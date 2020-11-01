
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FilePreview } from './../../components'

export default function Review( item ) {

  const data = item.route.params.item;
  const navigation = item.navigation;

  return (
    <>

    <ScrollView style={styles.container}>

      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
        <View style={styles.files}>
          {data.file.length > 0 && data.file.map((item, index) => (
            <FilePreview
              key={index}
              item={item}
            />
          ))}
        </View>

    </ScrollView>
    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  counter: {
    ...Typography.info,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
  },
})
