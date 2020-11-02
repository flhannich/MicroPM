
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonPrimary, ButtonSecondary } from './../../components'

import { Ionicons } from '@expo/vector-icons';

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Review( item ) {

  const data = item.route.params.item;
  const navigation = item.navigation;

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
  }

  const pdf = data.file.filter(item => item.type === 'pdf');
  const images = data.file.filter(item => item.type === 'jpg');
  const link = data.file.filter(item => item.type === 'link');

  let projectName;

  (data.project !== undefined)
  ? projectName = data.project.name
  : projectName = false;

  console.log(projectName);

  return (
    <>

    <ScrollView style={styles.container}>
      {projectName &&
        <Text style={styles.status}>{projectName}</Text>
      }
      <Text style={styles.title}>{data.name}</Text>

      <View style={styles.meta}>
        <Text style={styles.badgeReview} numberOfLines={1}>Review</Text>
        <Text style={styles.date}>{elapsedTime(data.updated_at)}</Text>
      </View>

        <View style={styles.files}>
          {pdf.length > 0 &&
            <FilePDF item={pdf} />
          }
          {images.length > 0 &&
            <FileImage item={images} />
          }
          {link.length > 0 &&
            <FileLink item={link} />
          }
        </View>

        <View styles={{marginBottom: Spacing.p3}}>

          <ButtonPrimary
            target={() => navigation.goBack() }
            text='Accept'
          />

        </View>

        <View>

          <ButtonSecondary
            target={() => navigation.navigate('Feedback', { item: data }) }
            text='Call'
          />

          <Text style={styles.info}>Or send Feedback</Text>

          <TextInput
            multiline={true}
            style={styles.input}
            numberOfLines={4}
            onChangeText={(text) => this.setState({text})}
          />

          <ButtonPrimary
            target={() => navigation.navigate('Feedback', { item: data }) }
            text='Send'
          />
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
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  meta: {
    display: 'flex',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p4,
    paddingBottom: Spacing.p4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  buttonSpacing: {
    paddingBottom: Spacing.p2
  },
  titleAttachment: {
    display: 'flex',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p4,
  },
  iconAttachment: {
    marginRight: Spacing.p2,
  },
  badgeReview: {
    ...Typography.badge,
    ...Colors.textWhiteFull,
    ...Buttons.badgeReview,
  },
  description: {
    ...Colors.textLight,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
    marginBottom: Spacing.p3,
  },
  statusColor: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textBrand,
  },
  date: {
    ...Typography.date,
    ...Colors.textLight,
    marginLeft: Spacing.p2,
  },
  info: {
    ...Typography.info,
    ...Colors.textLightest,
    textAlign: 'center',
    marginTop: Spacing.p2,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p3,
  },
})
