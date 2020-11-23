
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ActivityIndicator, TouchableHighlight, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons, Nav } from './../../styles'

import { CardTask, Badge } from './../../components'

import { DataContext } from './../../context/DataContext'

  export default function Project( probs ) {

  const { data, setData } = useContext(DataContext);

  const [ project, setProject ] = useState(0);
  const [ taskNotStarted, setTaskNotStarted ] = useState([]);
  const [ tasksInProgress, setTasksInProgress ] = useState([]);
  const [ tasksCompleted, setTasksCompleted ] = useState([]);

  const nameCompleted = 'completed';
  const nameInProgress = 'in_progress';
  const nameNotStarted = 'not_started';

  const _getProject = (json) => {
    json.projects.forEach((item, i) => {
      if(item.id === probs.route.params.item.id) {
        setProject(item);
        setTasksCompleted(item.tasks.filter(task => task.status == nameCompleted))
        setTasksInProgress(item.tasks.filter(task => task.status == nameInProgress))
        setTaskNotStarted(item.tasks.filter(task => task.status == nameNotStarted))
      }
    })
  }

  useEffect(() => {
  }, [])


  useFocusEffect(
    useCallback(() => {
      _getProject(data)
      console.log(data);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
)

  return (

    <>

    {project !== undefined &&

    <ScrollView style={ styles.container }>

      <View style={{paddingBottom: Spacing.p6}}>

        <Text style={styles.mainTitle}>{project.name}</Text>

        { tasksInProgress.length > 0 &&
          <>
            <View style={ styles.titleWrapper }>
              <Badge status={nameInProgress} count={tasksInProgress.length}/>
            </View>

            { tasksInProgress.map((item, index) =>
              <CardTask
                key={ index }
                item={ item }
                navigation= { probs.navigation }
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
                navigation={ probs.navigation }
              />
            )}
          </>
        }

        { taskNotStarted.length > 0 &&
          <>
            <View style={ styles.titleWrapper }>
              <Badge status={nameNotStarted} count={taskNotStarted.length}/>
            </View>

            { taskNotStarted.map((item, index) =>
              <CardTask
                key={ index }
                item={ item }
                navigation={ probs.navigation }
              />
            )}
          </>
        }

      </View>

    </ScrollView>

 }
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
