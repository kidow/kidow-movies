import React from 'react'
import { View, Text } from 'react-native'

class TVScreen extends React.Component {
  state = {
    loading: true,
    popular: null,
    airingThisWeek: null,
    airingToday: null
  }
  componentDidMount() {
    this.getTv()
  }
  getTv = async () => {}
  render() {
    const { loading, popular, airingThisWeek, airingToday } = this.state
    return (
      <View>
        <Text>tv</Text>
      </View>
    )
  }
}

export default TVScreen
