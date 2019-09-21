import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import axios from 'axios'
import { Loader } from 'components'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')

class SearchScreen extends React.Component {
  state = {
    loading: false,
    movieResults: [],
    tvResults: [],
    searchTerm: '',
    error: null
  }
  handleSearchUpdate = text => this.setState({ searchTerm: text })

  onSubmitEditing = async () => {
    const { searchTerm } = this.state
    if (searchTerm) {
      this.setState({ loading: true })
      const baseURL = 'https://api.themoviedb.org/3/'
      const api_key = '1aad9ee63be99925b1fff73d71aa9e0d'
      try {
        const [movieResults, tvResults] = await Promise.all([
          axios.get(`${baseURL}search/movie?api_key=${api_key}`, {
            params: { query: encodeURIComponent(searchTerm.trim()) }
          }),
          axios.get(`${baseURL}search/tv?api_key=${api_key}`, {
            params: { query: encodeURIComponent(searchTerm.trim()) }
          })
        ])
        this.setState({
          movieResults: movieResults.data.results,
          tvResults: tvResults.data.results,
          loading: false
        })
      } catch (err) {
        console.log(err)
        this.setState({ loading: false, error: "Can't search" })
      }
    }
  }
  makePhotoUrl = (path, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${path}`
  render() {
    const { loading, movieResults, tvResults, searchTerm } = this.state
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TextInput
            autoFocus
            autoCapitalize="none"
            onChangeText={this.handleSearchUpdate}
            value={searchTerm}
            returnKeyType="search"
            placeholder="Search movies and tv"
            placeholderTextColor="#bdc3c7"
            onSubmitEditing={this.onSubmitEditing}
            style={{
              backgroundColor: 'rgba(255,255,255,1)',
              width: width / 1.6,
              borderRadius: 20,
              padding: 10,
              textAlign: 'center'
            }}
          />
        </View>
        <ScrollView>
          {loading ? (
            <Loader />
          ) : (
            <>
              {movieResults.length ? (
                <View style={{ marginVertical: 20 }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      paddingLeft: 20,
                      marginBottom: 15
                    }}
                  >
                    Movie Results
                  </Text>
                  <ScrollView style={{ paddingLeft: 20 }} horizontal>
                    {movieResults
                      .filter(({ poster_path }) => poster_path)
                      .map(
                        ({
                          id,
                          poster_path,
                          title,
                          overview,
                          vote_average
                        }) => (
                          <TouchableWithoutFeedback
                            key={id}
                            onPress={_ =>
                              navigation.navigate({
                                routeName: 'Detail',
                                params: {
                                  id,
                                  title,
                                  poster_path,
                                  vote_average,
                                  overview
                                }
                              })
                            }
                          >
                            <View
                              style={{ alignItems: 'center', marginRight: 20 }}
                            >
                              <Image
                                style={{
                                  width: 110,
                                  height: 160,
                                  borderRadius: 2.5
                                }}
                                source={{ uri: this.makePhotoUrl(poster_path) }}
                              />
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
                              <Text
                                style={{
                                  color: '#bdc3c7',
                                  fontSize: 8,
                                  fontWeight: '600'
                                }}
                              >
                                ⭐️ {`${vote_average} / 10`}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        )
                      )}
                  </ScrollView>
                </View>
              ) : null}
            </>
          )}
          {tvResults.length ? (
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  paddingLeft: 20,
                  marginBottom: 15
                }}
              >
                TV Results
              </Text>
              <ScrollView style={{ paddingLeft: 20 }} horizontal>
                {tvResults
                  .filter(({ poster_path }) => poster_path)
                  .map(({ id, poster_path, name, overview, vote_average }) => (
                    <TouchableWithoutFeedback
                      key={id}
                      onPress={_ =>
                        navigation.navigate({
                          routeName: 'Detail',
                          params: {
                            id,
                            name,
                            poster_path,
                            vote_average,
                            overview
                          }
                        })
                      }
                    >
                      <View style={{ alignItems: 'center', marginRight: 20 }}>
                        <Image
                          style={{ width: 110, height: 160, borderRadius: 2.5 }}
                          source={{ uri: this.makePhotoUrl(poster_path) }}
                        />
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                            marginVertical: 5
                          }}
                        >
                          {name.length > 15
                            ? `${name.substring(0, 12)}...`
                            : name}
                        </Text>
                        <Text
                          style={{
                            color: '#bdc3c7',
                            fontSize: 8,
                            fontWeight: '600'
                          }}
                        >
                          ⭐️ {`${vote_average} / 10`}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
              </ScrollView>
            </View>
          ) : null}
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(SearchScreen)
