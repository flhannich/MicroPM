import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

const elapsedTime = (time) => {
  return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
}

import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../styles'

import { Badge, CardFilePreview } from './'

const CardTask = ({item, navigation}) => {

  return (
      <>

        {item.status == 'in_progress' &&
          <TouchableHighlight
            onPress={() => { navigation.navigate('Task', { item: item })}}
            underlayColor="transparent"
          >
            <View style={styles.cardTask}>
              <View style={styles.cardTitle}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'nowrap'}}>
                  {(item.is_review === '1' && item.is_accepted === '0') &&
                    <Badge status={'review'}/>
                  }
                  {item.is_accepted === '1'  &&
                    <Ionicons
                       style={{ marginLeft: Spacing.p1, lineHeight: 24}}
                       name="ios-checkmark-circle-outline"
                       color='#007AFF'
                       size={26}
                    />
                  }
                </View>
              </View>
              <View style={styles.meta}>
                {item.file.length > 0 &&
                  <CardFilePreview
                    count={item.file.length}
                  />
                }
                <Text style={styles.info}>{elapsedTime(item.updated_at)}</Text>
              </View>
            </View>
          </TouchableHighlight>
        }

        {item.status == 'completed' &&
          <TouchableHighlight
            onPress={() => navigation.navigate('Task', { item: item }) }
            underlayColor="white"
          >
            <View style={styles.cardTask}>
              <View style={styles.cardTitle}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
                <View style={styles.meta}>
                  {item.file.length > 0 &&
                    <CardFilePreview
                      count={item.file.length}
                    />
                  }
                  <Text style={styles.info}>{format(new Date(Date.parse(item.updated_at)), 'd MMM yyyy', { locale: de })}</Text>
                </View>
            </View>
          </TouchableHighlight>
        }

        {item.status == 'not_started' &&
            <View style={styles.cardNotStarted}>
              <View style={styles.cardTitle}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.meta}>
                {item.file.length > 0 &&
                  <CardFilePreview
                    count={item.file.length}
                  />
                }
              </View>
            </View>
        }

      </>


  )
}

export default CardTask;



const styles = StyleSheet.create({
  cardTask: {
    ...Cards.cardTask,
    marginBottom: Spacing.p3,
  },
  cardTitle: {
    ...Cards.cardTitle,
    paddingRight: Spacing.p1,
  },
  cardNotStarted: {
    ...Cards.cardNotStarted,
  },
  title: {
    ...Typography.cardTitle,
  },
  meta: {
    ...Files.container,
    marginTop: Spacing.p1,
  },
  info: {
    ...Typography.info,
    ...Colors.textLight,
  },
})
