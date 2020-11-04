import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

const elapsedTime = (time) => {
  return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
}

import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FilePreview } from './../'

const CardTask = ({item, navigation}) => {

  return (
      <>

        {item.status == 'review' &&
          <TouchableHighlight
            onPress={() => navigation.navigate('Review', { item: item }) }
            underlayColor="white"
          >
            <View style={styles.cardTask}>
              <Text style={styles.title}>{item.name}</Text>
                <View style={styles.meta}>
                  {item.file.length > 0 &&
                    <FilePreview
                      item={item}
                    />
                  }
                  <Text style={styles.info}>{elapsedTime(item.updated_at)}</Text>
                </View>
            </View>
          </TouchableHighlight>

        }

        {item.status == 'in_progress' &&
          <TouchableHighlight
            onPress={() => navigation.navigate('Task', { item: item }) }
            underlayColor="white"
          >
            <View style={styles.cardTask}>
              <Text style={styles.title}>{item.name}</Text>
                <View style={styles.meta}>
                  {item.file.length > 0 &&
                    <FilePreview
                      item={item}
                    />
                  }
                  <Text style={styles.info}>Last Update: {elapsedTime(item.updated_at)}</Text>
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
              <Text style={styles.title}>{item.name}</Text>
                <View style={styles.meta}>
                  {item.file.length > 0 &&
                    <FilePreview
                      item={item}
                    />
                  }
                  <Text style={styles.info}>{format(new Date(Date.parse(item.updated_at)), 'd MMM yyyy', { locale: de })}</Text>
                </View>
            </View>
          </TouchableHighlight>
        }

        {item.status == 'not_started' &&
          <TouchableHighlight
            onPress={() => navigation.navigate('Task', { item: item }) }
            underlayColor="white"
          >
            <View style={styles.cardNotStarted}>
              <Text style={styles.title}>{item.name}</Text>
                <View style={styles.meta}>
                  {item.file.length > 0 && item.file.map((item, index) => (
                    <FilePreview
                      key={index}
                      item={item}
                    />
                  ))}
                </View>
            </View>
          </TouchableHighlight>
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
