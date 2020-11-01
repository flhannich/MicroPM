import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { Icons, Typography, Files, Spacing, Colors } from './../../styles'

const FileImage = ({item}) => {
  console.log(item);
  return (

    <View style={styles.imageWrapper}>
      {item.map((item, index) => (
        <>
        <Image
          key={index}
          style={styles.image}
          source={{uri: item.path}}
        />
        <Text style={styles.imageName}>{item.name}</Text>
        <Text style={styles.imageDescription}>{item.description}</Text>
        </>
       ))}
    </View>

  )
}

export default FileImage

const styles = StyleSheet.create({
  imageName: {
    ...Colors.textLightest,
  },
  imageDescription: {
    marginBottom: Spacing.p6,
    marginTop: Spacing.p3,
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 1,
    paddingBottom: Spacing.p4,
    ...Typography.description,
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'cover',
    marginBottom: Spacing.p2,
  },
});
