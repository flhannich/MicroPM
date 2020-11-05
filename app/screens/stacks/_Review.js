
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonPrimary, ButtonSecondary, Badge } from './../../components'

import { Ionicons } from '@expo/vector-icons';

import { ReviewContext } from './../../context/ReviewContext'

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Review( data ) {

  const navigation = data.navigation;

  const { reviews } = useContext(ReviewContext);

  console.log(reviews);

  return (
    
    <>

        <ScrollView
          horizontal={true}
          style={styles.container}
        >
          { reviews.map((item, index) =>
            <Text>Review</Text>
          )}
        </ScrollView>

    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  }
})
