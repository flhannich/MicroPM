import React, { useState, useEffect, useContext, useRef } from 'react'
import { ActivityIndicator, TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonPrimary, ButtonSecondary, Badge } from './../../components'

import { AuthContext } from './../../context/AuthContext'

import { Ionicons } from '@expo/vector-icons';

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Task( probs ) {

  const { token } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [message, setMessage] = useState({});

  const _elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de })
  }

  useEffect(() => {
    _getTask();
  }, [])


  const _getTask = () => {
    if(!token) return;
    setLoading(true);
    fetch(`http://192.168.178.35:8000/api/task/${probs.route.params.item.id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => setTask(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }


  const _updateTaskStatus = (status) => {
    if(!token) return;
    setLoading(true);
    fetch(`http://192.168.178.35:8000/api/task/${probs.route.params.item.id}/${status}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token,
        },
      })
      .then((response) => response.json())
      .then((json) => _getTask())
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const _storeTaskMessage = (status) => {
    if(!token) return;
    setLoading(true);
    fetch(`http://192.168.178.35:8000/api/task/${probs.route.params.item.id}/message`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: {
          body: JSON.stringify({message: message})
        }
      })
      .then((response) => response.json())
      .then((json) => _getTask())
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }


        return (

            <>

            {isLoading
              ? <ActivityIndicator style={styles.activityIndicator}/>
              : (

              <>

              <ScrollView
                style={styles.container}
              >

              <View style={{paddingBottom: Spacing.p6}}>

                <Text style={styles.mainTitle}>
                  {task.name}
                </Text>

                <View style={styles.meta}>

                  <Badge status={task.status}/>

                  {(task.is_accepted === '0' && task.is_review === '1') &&
                    <View style={{ marginLeft: Spacing.p1 }} >
                      <Badge status='review'/>
                    </View>
                  }

                  {(task.is_accepted === '1') &&
                   <Ionicons
                      style={{ marginLeft: Spacing.p1 }}
                      name="ios-checkmark-circle"
                      color='#007AFF'
                      size={24}
                    />
                  }

                  <Text style={styles.date}>{_elapsedTime(task.updated_at)}</Text>

                </View>


                <View style={{marginBottom: Spacing.p3}}>

                  { task.file.map((item, index) =>

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

                  )}

                </View>

                <Text style={styles.description}>{task.description}</Text>

                </View>

              </ScrollView>

              {task.is_review === '1' &&

                <View style={styles.footer}>

                    <View>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setMessage(text)}
                      />
                      <ButtonPrimary
                        target={() => {_storeTaskMessage()}}
                        text='Send'
                      />
                    </View>

                    {(task.is_accepted === '1')
                    ?
                      <ButtonSecondary
                        target={() => {_updateTaskStatus(0)}}
                        text='Revoke'
                      />
                    : <ButtonPrimary
                        target={() => {_updateTaskStatus(1)}}
                        text='Accept'
                      />
                    }
                  </View>

                }


              </>

)}
            </>

)}


const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 input: {
   ...Forms.input,
   ...Typography.input,
 },
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
  sliderFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  counter: {
    ...Typography.info,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p4,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p4,
    paddingBottom: Spacing.p4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
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
    ...Typography.description,
    marginBottom: Spacing.p5,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
  },
  bulletWrapper: {
    paddingHorizontal: Spacing.p3,
    paddingVertical: Spacing.p2,
    marginBottom: Spacing.p3,
    marginTop: Spacing.p2,
  },
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: Colors.text,
    borderRadius: 4,
    overflow: 'hidden',
  },
  date: {
    ...Typography.date,
    ...Colors.textLight,
    marginLeft: Spacing.p2,
    lineHeight: 24,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
