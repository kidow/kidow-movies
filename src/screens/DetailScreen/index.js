import React from 'react'
import axios from 'axios'
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  Platform
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Loader } from 'components'

const { width, height } = Dimensions.get('window')

class DetailScreen extends React.Component {
  constructor(props) {
    super(props)
    const {
      navigation: {
        state: {
          params: {
            isMovie,
            id,
            poster_path,
            backdrop_path,
            title,
            vote_average,
            overview
          }
        }
      }
    } = props
    this.state = {
      isMovie,
      id,
      poster_path,
      backdrop_path,
      title,
      vote_average,
      overview,
      loading: true,
      genres: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async _ => {
    const { isMovie, id } = this.state
    const baseURL = 'https://api.themoviedb.org/3/'
    const api_key = '1aad9ee63be99925b1fff73d71aa9e0d'
    try {
      if (isMovie) {
        const {
          data: {
            backdrop_path,
            genres,
            poster_path,
            overview,
            title,
            vote_average,
            release_date,
            status
          }
        } = await axios.get(`${baseURL}movie/${id}`, {
          params: { append_to_response: 'videos', api_key }
        })
        this.setState({
          loading: false,
          genres,
          backdrop_path,
          overview,
          status,
          date: release_date,
          poster_path,
          vote_average,
          title
        })
      } else {
        const {
          data: {
            genres,
            overview,
            status,
            first_air_date,
            name,
            backdrop_path,
            poster_path
          }
        } = await axios.get(`${baseURL}tv/${id}`, {
          params: { append_to_response: 'videos', api_key }
        })
        this.setState({
          loading: false,
          genres,
          backdrop_path,
          overview,
          status,
          date: first_air_date,
          title: name,
          poster_path
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({ error, loading: false })
    }
  }
  makePhotoUrl = (path, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${path}`
  render() {
    const {
      isMovie,
      id,
      poster_path,
      backdrop_path,
      title,
      vote_average,
      overview,
      loading,
      date,
      status,
      genres
    } = this.state
    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{
              width,
              height: height / 3.5,
              position: 'absolute',
              top: 0
            }}
            source={{ uri: this.makePhotoUrl(backdrop_path) }}
          />
          <LinearGradient
            colors={['transparent', 'black']}
            start={Platform.select({ ios: [0, 0] })}
            end={Platform.select({ ios: [0, 0.5], android: [0, 0.9] })}
          >
            <View style={{ flexDirection: 'row', width: '80%', alignItems: 'flex-end', paddingHorizontal: 20, height: height / 3.5 }}>
              <Image style={{ width: 110, height: 160, borderRadius: 2.5 }} source={{ uri: this.makePhotoUrl(poster_path) }} />
              <View style={{ marginLeft: 30 }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                    marginBottom: 10
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{ color: '#bdc3c7', fontSize: 8, fontWeight: '600' }}
                >
                  ⭐️ {`${vote_average} / 10`}
                </Text>
                
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginTop: 10,
                      width: '95%'
                    }}
                  >
                    {genres.map(({ name }, index) =>
                      index === genres.length - 1 ? name : `${name} / `
                    )}
                  </Text>
                
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          {overview && (
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ color: 'white', fontWeight: '600', marginBottom: 10 }}
              >
                Overview
              </Text>
              <Text
                style={{
                  width: '80%',
                  color: 'white',
                  fontSize: 12,
                  marginBottom: 10
                }}
              >
                {overview}
              </Text>
            </View>
          )}
          {status && (
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ color: 'white', fontWeight: '600', marginBottom: 10 }}
              >
                Status
              </Text>
              <Text
                style={{
                  width: '80%',
                  color: 'white',
                  fontSize: 12,
                  marginBottom: 10
                }}
              >
                {status}
              </Text>
            </View>
          )}
          {date && (
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ color: 'white', fontWeight: '600', marginBottom: 10 }}
              >
                {isMovie ? 'Release Date' : 'First Episode'}
              </Text>
              <Text
                style={{
                  width: '80%',
                  color: 'white',
                  fontSize: 12,
                  marginBottom: 10
                }}
              >
                {date}
              </Text>
            </View>
          )}
          {loading && <Loader />}
        </View>
      </ScrollView>
    )
  }
}

export default DetailScreen
