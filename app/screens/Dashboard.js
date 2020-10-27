
import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'

export default function Dashboard({ navigation }) {

  return(
    <View style={styles.screen}>
      <Text style={styles.title}>Board</Text>
    </View>

  )

}


const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
})
