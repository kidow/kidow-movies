import React, { Component } from 'react'
import { Loader } from 'components'
import styled from 'styled-components'
import { Text } from 'react-native'

const Container = styled.ScrollView`
  background-color: black;
`

class MovieScreen extends Component {
  state = {
    loading: false,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null
  }
  componentDidMount() {
    this.getMovies()
  }
  getMovies = async _ => {}
  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state
    return loading ? (
      <Loader />
    ) : (
      <Container>
        <Text>mopvies</Text>
      </Container>
    )
  }
}

export default MovieScreen
