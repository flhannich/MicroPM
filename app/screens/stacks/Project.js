
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, TouchableHighlight, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons, Nav } from './../../styles'

import { CardTask, CardReview } from './../../components'

import { AuthContext } from '../../context/AuthContext.js'

export default function Project( data ) {

  const { id } = useContext(AuthContext);

  const tasks = data.route.params.item.tasks;
  const navigation = data.navigation;

  const tasksReview = tasks.filter(task => task.status == 'review');
  const tasksCompleted = tasks.filter(task => task.status == 'completed');
  const tasksInProgress = tasks.filter(task => task.status == 'in_progress');
  const notStarted = tasks.filter(task => task.status == 'not_started');

  return (

    <>

    <ScrollView style={ styles.container }>

      <>

      { tasksReview.length > 0 &&
        <>
          <View style={ styles.cardStatus }>
            <Text style={ styles.status }>Review </Text>
            <Text style={ styles.counter }>{ tasksReview.length }</Text>
          </View>

          { tasksReview.map((item, index) =>
            <CardReview
              key={ index }
              item={ item }
              navigation={ navigation }
            />
          )}
        </>
      }



      { tasksInProgress.length > 0 &&
        <>
          <View style={ styles.cardStatus }>
            <Text style={ styles.status }>In Progress </Text>
            <Text style={ styles.counter }>{ tasksInProgress.length }</Text>
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

      { notStarted.length > 0 &&
        <>
          <View style={ styles.cardStatus }>
            <Text style={ styles.status }>Not Started</Text>
            <Text style={ styles.counter }>{ notStarted.length }</Text>
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

      { tasksCompleted.length > 0 &&
        <>
          <View style={ styles.cardStatus }>
            <Text style={ styles.status }>Completed</Text>
            <Text style={ styles.counter }>{ tasksCompleted.length }</Text>
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
  cardStatus: {
    ...Cards.cardStatus,
    marginTop: Spacing.p5,
    marginBottom: Spacing.p3,
  },
  counter: {
    ...Typography.status,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  status: {
    ...Typography.status,
  },
})
