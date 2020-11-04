
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, TouchableHighlight, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons, Nav } from './../../styles'

import { CardTask, CardReview, Badge } from './../../components'

import { AuthContext } from '../../context/AuthContext.js'

export default function Project( data ) {

  const { id } = useContext(AuthContext);

  const item = data.route.params.item;
  const tasks = data.route.params.item.tasks;
  const navigation = data.navigation;

  const nameReview = 'review';
  const nameCompleted = 'completed';
  const nameInProgress = 'in_progress';
  const nameNotStarted = 'not_started';

  const tasksReview = tasks.filter(task => task.status == nameReview);
  const tasksCompleted = tasks.filter(task => task.status == nameCompleted);
  const tasksInProgress = tasks.filter(task => task.status == nameInProgress);
  const notStarted = tasks.filter(task => task.status == nameNotStarted);

  return (

    <>

    <ScrollView style={ styles.container }>

      <>

      <Text style={styles.mainTitle}>{item.name}</Text>

      <Text style={styles.title}>you have {tasksReview.length} open reviews</Text>

      { tasksReview.length === 0 &&
        <>
          <View style={ styles.titleWrapper }>
            <Badge status={nameReview} count={tasksReview.length}/>
          </View>

          { tasksReview.map((item, index) =>
            <CardTask
              key={ index }
              item={ item }
              navigation= { navigation }
            />
          )}
        </>
      }


      { tasksInProgress.length > 0 &&
        <>
          <View style={ styles.titleWrapper }>
            <Badge status={nameInProgress} count={tasksInProgress.length}/>
          </View>

          { tasksInProgress.map((item, index) =>
            <CardTask
              key={ index }
              item={ item }
              navigation= { navigation }
            />
          )}
        </>
      }

      { tasksCompleted.length > 0 &&
        <>
          <View style={ styles.titleWrapper }>
            <Badge status={nameCompleted} count={tasksCompleted.length}/><Text>👍</Text>
          </View>

          { tasksCompleted.map((item, index) =>
            <CardTask
              key={ index }
              item={ item }
              navigation={ navigation }
            />
          )}
        </>
      }

      { notStarted.length > 0 &&
        <>
          <View style={ styles.titleWrapper }>
            <Badge status={nameNotStarted} count={notStarted.length}/>
          </View>

          { notStarted.map((item, index) =>
            <CardTask
              key={ index }
              item={ item }
              navigation={ navigation }
            />
          )}
        </>
      }

      </>

    </ScrollView>

    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  headerNavigation: {
    ...Nav.header,
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p3,
  },
  titleWrapper: {
    ...Cards.cardStatus,
    marginTop: Spacing.p4,
    marginBottom: Spacing.p3,
  },
  counter: {
    ...Typography.status,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  status: {
    ...Typography.status,
    ...Colors.textLightest,
  },
})
