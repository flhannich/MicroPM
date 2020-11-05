import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors } from './../../styles'

const SettingsModal = () => {

  const [modalVisible, setModalVisible] = useState(false);

return (

<Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View>
        <View>
          <Text>Hello Modal!</Text>

          <TouchableHighlight
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>

  )

}

export default SettingsModal

const styles = StyleSheet.create({
  name: {
    marginBottom: Spacing.p4,
    ...Colors.textLightest,
  },
})
