import React from 'react'
import { Text } from 'react-native'

class SearchScreen extends React.Component {
  state = {
    loading: false,
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    error: null
  }
  handleSearchUpdate = text => this.setState({ searchTerm: text })

  onSubmitEditing = async () => {}

  render() {
    const { loading, movieResults, tvResults, searchTerm } = this.state
    return <Text>search</Text>
  }
}

export default SearchScreen
