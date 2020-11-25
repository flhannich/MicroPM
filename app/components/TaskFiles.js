
import React from 'react'

import { Text, View, StyleSheet, Image } from 'react-native'
import { Colors, Typography, Spacing, Cards } from './../styles'
import { Ionicons } from '@expo/vector-icons';

const TaskDescription = ( { title, files } ) => {

  return (

    <View style={{marginBottom: Spacing.p6}}>

      <View style={{marginBottom: Spacing.p2}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.filesBody}>

        { files.map((item, index) =>

          <View style={styles.cardWrapper} key={index}>

            {item.type === 'image' &&
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{uri: item.path}}
              />
            </View>
            }

            {item.type === 'document' &&
              <View style={styles.card}>
              <View style={styles.cardContentHolder}>
                  <Ionicons
                    style={styles.icon}
                    name="ios-document"
                    size={24}
                    color='#000'
                  />
                  <Text style={styles.cardDescription}>{item.name}</Text>
                </View>
             </View>
            }

            {item.type === 'link' &&
            <View style={styles.card}>
              <View style={styles.cardContentHolder}>
                <Ionicons
                  style={styles.icon}
                  name="ios-link"
                  size={24}
                  color='#000'
                />
              <Text style={styles.cardDescription}>{item.name}</Text>
              </View>
           </View>
            }

          </View>

        )}

      </View>
    </View>

  )

}

export default TaskDescription

const styles = StyleSheet.create({
  filesTitle: {
    paddingBottom: Spacing.pb3
  },
  title: {
    ...Typography.subTitle,
    ...Colors.textLightest,
  },
  filesBody: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: Spacing.pb5,
    marginHorizontal: -Spacing.p1,
  },
  cardWrapper: {
    width: '33.333%',
    padding: Spacing.p1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    height: 120,
    overflow: 'hidden',
  },
  cardContentHolder: {
    alignItems: 'center',
  },
  icon: {
    marginTop: Spacing.p2,
    marginBottom: Spacing.p2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  cardDescription: {
    ...Typography.description,
    ...Colors.textNormal,
  },

})
