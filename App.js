import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const App = _ => {
  const { container } = styles
  return (
    <View style={container}>
      <Text>Open up App.js Tos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
