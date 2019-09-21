import React, { useState } from 'react'
import { Text, View, StatusBar } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Ionicons } from '@expo/vector-icons'

const App = _ => {
  const [loaded, setLoaded] = useState(false)
  const loadAssets = async _ => await Font.loadAsync({ ...Ionicons.font })
  return loaded ? (
    <>
      <StatusBar barStyle="light-content" />
      <View>
        <Text>Welcome!</Text>
      </View>
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={setLoaded(true)}
      onError={console.warn}
    />
  )
}
export default App
