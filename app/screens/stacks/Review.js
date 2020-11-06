
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Text, ScrollView, View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonSecondary, Badge, FeedbackModal } from './../../components'

import { ReviewContext } from './../../context/ReviewContext'

import { Ionicons } from '@expo/vector-icons';

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Review( item ) {

  const navigation = item.navigation;

  const { reviews } = useContext(ReviewContext);

  const [modalState, setModalState] = useState(false);

  const [activeItem, setActiveItem] = useState(0);
  const [width, setWidth] = useState(0);

  const scrollRef = useRef(0);

  const handleScroll = (event) => {
    let offset = event.nativeEvent.contentOffset.x;
    setActiveItem(offset / width);
  }

  const handleClick = (index) => {
    scrollRef.current.scrollTo({x: width * index, y: 0, animated: true});
  }

  useEffect(() => {
    let totalWidth = width * reviews.length;
    setWidth(Dimensions.get('window').width)

  }, [])

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
  }

  return (

    <>
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
      onScroll={handleScroll}
    >

          { reviews.map((item, index) => {

            return (


            <View
              key={index}
              style={{flex: '1', width: width}}
            >

            <FeedbackModal
              review={item}
              state={modalState}
              setState={setModalState}
            />

            <ScrollView
              style={styles.container}
              nestedScrollEnabled={true}
            >

            <View style={{paddingBottom: Spacing.p6}}>

              <Text style={styles.mainTitle}>{item.name}</Text>

              <View style={styles.meta}>

                <Badge status={item.status}/>

                <View style={{ marginLeft: Spacing.p1 }} >
                  <Badge status='review'/>
                </View>

                <Text style={styles.date}>{elapsedTime(item.updated_at)}</Text>

              </View>

              <View style={{marginBottom: Spacing.p3}}>

                { item.file.map((item, index) => {

                  return (

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

                )})}

              </View>

              <Text style={styles.description}>{item.description}</Text>

              </View>

            </ScrollView>

              <View style={styles.footer}>
                <ButtonSecondary
                  target={() => setModalState(true) }
                  text='Make a Call'
                />
                <ButtonSecondary
                  target={() => setModalState(true) }
                  text='Accept'
                />
              </View>

            </View>

          )})}

    </ScrollView>

    <View style={styles.sliderFooter}>

      { reviews.length > 1 && reviews.map((item, index) => {
        return (
          <TouchableHighlight
            style={styles.bulletWrapper}
            onPress={() => {handleClick(index)}}
            key={index}
            underlayColor="white"
          >
          <Text style={{...styles.bullet, opacity: activeItem === index ? 1 : 0.5 }}></Text>
          </TouchableHighlight>
        )
      })}

    </View>


  </>

)}


const styles = StyleSheet.create({
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
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
