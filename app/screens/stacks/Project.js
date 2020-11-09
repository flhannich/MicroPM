
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, TouchableHighlight, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons, Nav } from './../../styles'

import { CardTask, Badge } from './../../components'

export default function Project( data ) {

  const item = data.route.params.item;
  const tasks = data.route.params.item.tasks;
  const navigation = data.navigation;

  const nameCompleted = 'completed';
  const nameInProgress = 'in_progress';
  const nameNotStarted = 'not_started';

  const tasksCompleted = tasks.filter(task => task.status == nameCompleted);
  const tasksInProgress = tasks.filter(task => task.status == nameInProgress);
  const notStarted = tasks.filter(task => task.status == nameNotStarted);

  return (

    <>

    <ScrollView style={ styles.container }>

      <View style={{paddingBottom: Spacing.p6}}>

        <Text style={styles.mainTitle}>{item.name}</Text>

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
  reminder: {
    marginTop: Spacing.p2,
    marginBottom: Spacing.p3,
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
  status: {
    ...Typography.status,
    ...Colors.textLightest,
  },
})
