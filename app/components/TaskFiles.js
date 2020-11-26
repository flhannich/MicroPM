import React, {useState} from 'react'

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors, Typography, Spacing, Cards } from './../styles'
import { Ionicons } from '@expo/vector-icons';
import { ImageModal } from './';

const TaskDescription = ( { title, files } ) => {

const [modalState, setModalState] = useState(false);
const [modalIndex, setModalIndex] = useState(0);

let images = files.filter(x => x.type === 'image');

  return (

    <View style={{marginBottom: Spacing.p5}}>

      <View style={{marginBottom: Spacing.p2}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ImageModal
        state={modalState}
        setState={setModalState}
        index={modalIndex}
        data={files}
      />

      <View style={styles.filesBody}>

            {images.map((item, index) =>

              <TouchableOpacity
                key={index}
                style={styles.cardImage}
                onPress={() => {
                  setModalState(true),
                  setModalIndex(index)
                }}
              >
                <Image
                  style={styles.image}
                  source={{uri: item.path}}
                />
              </TouchableOpacity>

            )}


            { files.map((item, index) =>

            <>

            {item.type === 'document' &&
              <TouchableOpacity
                style={styles.card}
                key={index}
              >
              <View style={styles.cardContentHolder}>
                <Ionicons
                  style={styles.icon}
                  name="ios-document"
                  size={24}
                  color='#000'
                />
                <Text style={styles.cardDescription}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            }

            {item.type === 'link' &&
              <TouchableOpacity
                style={styles.card}
                key={index}
              >
              <View style={styles.cardContentHolder}>
                <Ionicons
                  style={styles.icon}
                  name="ios-link"
                  size={24}
                  color='#000'
                />
                <Text style={styles.cardDescription}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            }

          </>

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
  },
  cardImage: {
    display: 'flex',
    justifyContent: 'center',
    width: '31%',
    aspectRatio: 1,
    height: 120,
    borderRadius: 5,
    overflow: 'hidden',
    margin: Spacing.p1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
    width: '31%',
    aspectRatio: 1,
    height: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.brand,
    margin: Spacing.p1,

  },
  cardContentHolder: {
    alignItems: 'center',
  },
  icon: {
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
