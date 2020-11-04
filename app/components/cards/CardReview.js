import React from 'react'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native'

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'


const elapsedTime = (time) => {
  return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
}
//   console.log(result);

  //

// var result =


import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FilePreview } from './../'

const CardReview = ({ item, navigation }) => {

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Review', { item: item }) }
      underlayColor="white"
    >
      <View style={styles.cardReview}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.meta}>
          {item.file.length > 0 &&
            <FilePreview
              item={item}
            />
          }
          <Text style={styles.info}>{elapsedTime(item.updated_at)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default CardReview;



const styles = StyleSheet.create({
  cardReview: {
    ...Cards.cardReview,
    marginBottom: Spacing.p2,
  },
  title: {
    ...Typography.cardTitle,
    // ...Colors.textWhiteFull,
    ...Colors.textBrand,
  },
  meta: {
    ...Files.container,
    marginTop: Spacing.p2,
  },
  info: {
    ...Typography.info,
    // ...Colors.textWhiteLight,
    ...Colors.textLight,
    marginLeft: Spacing.p1,
  },
})
