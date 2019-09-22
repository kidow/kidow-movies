import React, { Component } from 'react'
import { Loader } from 'components'
import Swiper from 'react-native-swiper'
import {
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Poster, Rating } from 'components'
import axios from 'axios'

const { width, height } = Dimensions.get('screen')

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
  getMovies = async _ => {
    const baseURL = 'https://api.themoviedb.org/3/'
    const api_key = '1aad9ee63be99925b1fff73d71aa9e0d'
    try {
      const [upcoming, popular, nowPlaying] = await Promise.all([
        axios.get(`${baseURL}movie/upcoming?api_key=${api_key}`),
        axios.get(`${baseURL}movie/popular?api_key=${api_key}`),
        axios.get(`${baseURL}movie/now_playing?api_key=${api_key}`)
      ])
      this.setState({
        upcoming: upcoming.data.results,
        popular: popular.data.results,
        nowPlaying: nowPlaying.data.results,
        loading: false
      })
    } catch (error) {
      console.log('error: ', error)
      this.setState({ error: "Can't get Movies." })
    }
  }
  makePhotoUrl = (path, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${path}`
  render() {
    const { loading, upcoming, popular, nowPlaying } = this.state
    const { navigation } = this.props
    return loading ? (
      <Loader />
    ) : (
      <ScrollView style={{ backgroundColor: 'black' }}>
        {nowPlaying && (
          <Swiper
            showsPagination={false}
            autoplay
            style={{ height: height / 3 }}
            autoplayTimeout={3}
          >
            {nowPlaying
              .filter(({ backdrop_path }) => backdrop_path)
              .map(
                ({
                  id,
                  overview,
                  vote_average,
                  backdrop_path,
                  title,
                  poster_path
                }) => (
                  <View style={{ height: height / 3 }} key={id}>
                    <View style={{ flex: 1, position: 'relative' }}>
                      <Image
                        style={{
                          width,
                          height: height / 3,
                          opacity: 0.3,
                          position: 'absolute'
                        }}
                        source={{ uri: this.makePhotoUrl(backdrop_path) }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 30,
                          justifyContent: 'space-between'
                        }}
                      >
                        <Poster poster_path={poster_path} />
                        <View
                          style={{ width: '60%', alignItems: 'flex-start' }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: '600'
                            }}
                          >
                            {title}
                          </Text>
                          {vote_average && (
                            <View style={{ marginVertical: 10 }}>
                              <Rating vote_average={vote_average} />
                            </View>
                          )}
                          {overview && (
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 12,
                                marginBottom: 10
                              }}
                            >
                              {overview.length > 117
                                ? `${overview.substring(0, 120)}...`
                                : overview}
                            </Text>
                          )}
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#e74c3c',
                              borderRadius: 5,
                              padding: 8
                            }}
                            onPress={_ =>
                              navigation.navigate({
                                routeName: 'Detail',
                                params: {
                                  isMovie: true,
                                  id,
                                  poster_path,
                                  backdrop_path,
                                  title,
                                  vote_average,
                                  overview
                                }
                              })
                            }
                          >
                            <Text style={{ color: 'white', fontSize: 12 }}>
                              View details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              )}
          </Swiper>
        )}
        {upcoming && (
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                paddingLeft: 20,
                marginBottom: 15
              }}
            >
              Upcoming Movies
            </Text>
            <ScrollView style={{ paddingLeft: 20 }} horizontal>
              {upcoming
                .filter(movie => movie.poster_path)
                .map(({ id, poster_path, title, vote_average }) => (
                  <TouchableWithoutFeedback
                    onPress={_ =>
                      navigation.navigate({
                        routeName: 'Detail',
                        params: {
                          isMovie: true,
                          id,
                          poster_path,
                          backdrop_path: null,
                          title,
                          vote_average
                        }
                      })
                    }
                    key={id}
                  >
                    <View style={{ alignItems: 'center', marginRight: 20 }}>
                      <Poster poster_path={poster_path} />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          marginVertical: 5
                        }}
                      >
                        {title.length > 15
                          ? `${title.substring(0, 12)}...`
                          : title}
                      </Text>
                      <Rating vote_average={vote_average} />
                    </View>
                  </TouchableWithoutFeedback>
                ))}
            </ScrollView>
          </View>
        )}
        {popular && (
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                paddingLeft: 20,
                marginBottom: 15
              }}
            >
              Popular Movies
            </Text>
            <ScrollView style={{ paddingLeft: 20 }} horizontal={false}>
              {popular
                .filter(movie => movie.poster_path)
                .map(
                  ({
                    id,
                    poster_path,
                    title,
                    vote_average,
                    backdrop_path,
                    overview
                  }) => (
                    <TouchableWithoutFeedback
                      onPress={_ =>
                        navigation.navigate({
                          routeName: 'Detail',
                          params: {
                            isMovie: true,
                            id,
                            poster_path,
                            backdrop_path,
                            title,
                            vote_average,
                            overview
                          }
                        })
                      }
                      key={id}
                    >
                      <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                        <Poster poster_path={poster_path} />
                        <View style={{ marginLeft: 20, width: '60%' }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              marginVertical: 5
                            }}
                          >
                            {title}
                          </Text>
                          <Rating vote_average={vote_average} />
                          {overview && (
                            <Text
                              style={{
                                color: '#bdc3c7',
                                fontSize: 12,
                                marginVertical: 10
                              }}
                            >
                              {overview.length > 150
                                ? `${overview.substring(0, 147)}...`
                                : overview}
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                )}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    )
  }
}

export default withNavigation(MovieScreen)
