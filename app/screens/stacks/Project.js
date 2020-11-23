
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, TouchableHighlight, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons, Nav } from './../../styles'

import { CardTask, Badge } from './../../components'

import { AuthContext } from '../../context/AuthContext.js'

export default function Project( probs ) {

  const project = probs.route.params.item;

  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(!token) return;
    fetch(`http://192.168.178.35:8000/api/projects/${project.id}/tasks`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => setTasks(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, [])


  return (

  <>

  {isLoading
    ? <ActivityIndicator style={styles.activityIndicator}/>
    : (

    <ScrollView style={ styles.container }>

      <View style={{paddingBottom: Spacing.p6}}>

        <Text style={styles.mainTitle}>{project.name}</Text>

          <View style={ styles.titleWrapper }>
            <Badge status={'in_progress'} />
          </View>

          { tasks.map((item, index) => (item.status == 'in_progress') &&
            <CardTask
              key={ index }
              item={ item }
              navigation= { probs.navigation }
            />
          )}

          <View style={ styles.titleWrapper }>
            <Badge status={'completed'}/><Text> 👍</Text>
          </View>

          { tasks.map((item, index) => (item.status == 'completed') &&
            <CardTask
              key={ index }
              item={ item }
              navigation= { probs.navigation }
            />
          )}

          <View style={ styles.titleWrapper }>
            <Badge status={'not_started'}/>
          </View>

          { tasks.map((item, index) => (item.status == 'not_started') &&
            <CardTask
              key={ index }
              item={ item }
              navigation= { probs.navigation }
            />
          )}

      </View>

    </ScrollView>

 )}
    </>
)}


const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
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
