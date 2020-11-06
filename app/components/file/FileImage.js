import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { Icons, Typography, Files, Spacing, Colors } from './../../styles'

const FileImage = ({item}) => {

  return (

    <View>
      <Image
        style={styles.image}
        source={{uri: item.path}}
      />
      <Text style={styles.name}>{item.name}</Text>
    </View>

  )
}

export default FileImage

const styles = StyleSheet.create({
  name: {
    marginBottom: Spacing.p3,
    ...Colors.textLightest,
    ...Typography.info,
  },
  description: {
    marginBottom: Spacing.p6,
    ...Typography.description,
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'cover',
    marginBottom: Spacing.p2,
    borderRadius: 5,
  },
});
