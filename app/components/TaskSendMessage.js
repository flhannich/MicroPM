
import React, {useEffect, useState} from 'react'

import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Colors, Typography, Spacing, Forms } from './../styles'
import { Ionicons } from '@expo/vector-icons';

import { ButtonPrimary } from './'

const TaskSendMessage = ( {  status, set, update, store } ) => {

const [message, setMessage] = useState('');
const [inputHeight, setInputHeight] = useState(38);
const [storedMessage, setStoredMessage] = useState([]);

const _storeTaskMessage = () => {
  console.log(message);
}


  return (

    <View style={styles.wrapper}>

        <TextInput
          style={[styles.input, {height: inputHeight}]}
          editable={true}
          multiline={true}
          placeholder={'Neuer Kommentar'}
          placeholderTextColor="#aaa"
          onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
          onChangeText={text => set(text)}
        />

        <View style={styles.messageSubmit}>
          <Ionicons
            style={styles.icon}
            name="ios-send"
            size={32}
            color={Colors.brand}
            onPress={() => {store()}}
          />
       </View>

       <View style={styles.messageAccept}>
       {(status === '1' )
       ? <Ionicons
            name="ios-close-circle-outline"
            color='#aaa'
            size={32}
            onPress={() => {update(0)}}
          />
       : <Ionicons
            name="ios-checkmark-circle-outline"
            color={Colors.brand}
            size={32}
            onPress={() => {update(1)}}
          />
         }
         </View>

    </View>



  )

}

export default TaskSendMessage

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.p3,
    paddingVertical: Spacing.p3,
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderTopColor: Colors.borderLight,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  },
  messageSubmit: {
    borderRadius: 40,
    width: 40,
    height: 40,
    paddingLeft: 11,
    justifyContent: 'center',
  },
  messageAccept: {
    borderRadius: 40,
    width: 40,
    height: 40,
    paddingLeft: 7,
    justifyContent: 'center',
    marginLeft: Spacing.p2,
  },
  input: {
    flexGrow: 1,
    marginRight: Spacing.p3,
    ...Forms.input,
    ...Typography.input,
    ...Colors.textNormal,
  },

})
