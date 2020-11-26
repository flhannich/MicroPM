import React, {useRef, useState, useEffect} from 'react'
import { Text, TouchableHighlight, View, StyleSheet, Modal, Image, ScrollView, TouchableOpacity, Dimensions, Share } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors, Shadows } from './../../styles'

const ImageModal = ({modalState, setModalState, modalIndex, data}) => {

const scrollRef = useRef(0);

const [activeItem, setActiveItem] = useState(modalIndex);
const [width, setWidth] = useState(0);

const images = data.filter(x => x.type === 'image');

const _setActivePagination = (event) => {
  let offset = event.nativeEvent.contentOffset.x;
  setActiveItem(offset / width);
}

const _goToSlide = (index) => {
  scrollRef.current.scrollTo({x: width * index, y: 0, animated: true})
}

const _share = async (path, name, description) => {
  try {
    const result = await Share.share({
      message:description,
      title: name,
      url:path
    });

    if (result.action === Share.sharedAction) {
      alert("Post Shared")
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      alert("Post cancelled")
    }
  } catch (error) {
    alert(error.message);
  }
};


useEffect(() => {

  let d = Dimensions.get('window').width;
  let res = (d).toFixed(1)
  setWidth(parseInt(res))

}, [modalIndex])

return (
  <>
  {modalState &&

      <View style={styles.container}>

          <TouchableHighlight
            style={styles.close}
            onPress={() => {setModalState(false)}}
            underlayColor="transparent"
          >
            <Ionicons
              name="ios-close"
              color='#000'
              size={32}
            />
          </TouchableHighlight>





          <ScrollView
            ref={scrollRef}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
            onScroll={_setActivePagination}
          >
            { images.map((item, index) => {

              return (

                <View
                  key={index}
                  style={{width: parseInt(width)}}
                >
                  <View style={styles.imageHolder}>
                    <Image
                      style={styles.image}
                      source={{uri: item.path}}
                    />
                  </View>

                  <TouchableHighlight
                    style={styles.share}
                    onPress={() => {_share(item.path, item.name, item.description)}}
                    underlayColor="transparent"
                  >
                    <Ionicons
                      name="ios-share"
                      color='#fff'
                      size={32}
                    />
                  </TouchableHighlight>

                </View>

              )})}

          </ScrollView>

          <View style={styles.footer}>
          { images.length > 1 && images.map((item, index) => {
            return (
              <TouchableHighlight
                style={styles.bulletWrapper}
                onPress={() => {_goToSlide(index)}}
                key={index}
                underlayColor="white"
              >
                <View style={[styles.bullet, {opacity: activeItem === index ? 1 : 0.5 }]}></View>
              </TouchableHighlight>
            )
          })}
          </View>

      </View>

    }

    </>

)}

export default ImageModal

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 0,
    zIndex: 100,
    paddingTop: Spacing.p7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  close: {
    position: 'absolute',
    top: 32,
    right: 24,
    marginTop: -Spacing.p5,
    marginRight: -Spacing.p3,
    padding: Spacing.p3,
    zIndex: 1,
  },
  share: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    marginTop: -Spacing.p5,
    marginRight: -Spacing.p3,
    padding: Spacing.p3,
    zIndex: 1,
  },
  imageHolder: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.p2,
  },
  bulletWrapper: {
    paddingHorizontal: Spacing.p3,
    paddingVertical: Spacing.p3,
  },
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: Colors.text,
    borderRadius: 4,
    overflow: 'hidden',
  },
})
