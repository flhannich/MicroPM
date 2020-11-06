
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonSecondary, Badge } from './../../components'

import { Ionicons } from '@expo/vector-icons';

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Task( item ) {

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

  return (

    <>

    <ScrollView style={styles.container}>

      <View style={{paddingBottom: Spacing.p6}}>

        <Text style={styles.mainTitle}>{data.name}</Text>

        <View style={styles.meta}>

           <Badge status={data.status}/>

           {data.is_review === '1' &&
             <View style={{ marginLeft: Spacing.p1 }} >
               <Badge status='review'/>
             </View>
           }

          <Text style={styles.date}>{elapsedTime(data.updated_at)}</Text>
        </View>

        <View style={{marginBottom: Spacing.p3}}>

          { data.file.map((item, index) => {

            return (

            <View key={index}>

            {item.type === 'link' &&
              <FileLink item={item} />
            }

            {item.type === 'document' &&
              <FilePDF item={item} />
            }

            {item.type === 'image' &&
              <FileImage item={item} />
            }

            </View>

          )})}

        </View>

        <Text style={styles.description}>{data.description}</Text>

      </View>

    </ScrollView>

    {data.is_review === '1' &&
      <View style={styles.footer}>
        <ButtonSecondary
          target={() => navigation.goBack() }
          text='Make a Call'
        />
        <ButtonSecondary
          target={() => navigation.goBack() }
          text='Accept'
        />
      </View>
    }

    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: Spacing.p2,
    paddingHorizontal: Spacing.p2,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p4,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  description: {
    ...Typography.description,
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
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
  },
  date: {
    ...Typography.date,
    ...Colors.textLight,
    marginLeft: Spacing.p2,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
