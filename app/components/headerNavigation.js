
import React from 'react'

import { TouchableHighlight, View, StyleSheet } from 'react-native'
import { Nav } from './../styles'
import { Ionicons } from '@expo/vector-icons';


const HeaderNavigation = ( { navigation } ) => {

  return (
    <View style={styles.header}>
      <TouchableHighlight
        onPress={() => navigation.goBack() }
        underlayColor="white"
      >
        <>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color='#007AFF'
          />
        </>
      </TouchableHighlight>
    </View>
  )

}

export default HeaderNavigation

const styles = StyleSheet.create({
  header: {
    ...Nav.header,
  },
})
