import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { Icons, Typography, Files, Spacing, Colors } from './../../styles'

const FileImage = ({item}) => {

  return (

    <View>
      {item.map((item, index) => (
        <>
        <Image
          key={index}
          style={styles.image}
          source={{uri: item.path}}
        />
        <Text style={styles.name}>{item.name}</Text>
        </>
       ))}
    </View>

  )
}

export default FileImage

const styles = StyleSheet.create({
  name: {
    marginBottom: Spacing.p4,
    ...Colors.textLightest,
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
  },
});
