import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { Loader } from 'components'
import axios from 'axios'
import { withNavigation } from 'react-navigation'

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
  getTv = async () => {
    const baseURL = 'https://api.themoviedb.org/3/'
    const api_key = '1aad9ee63be99925b1fff73d71aa9e0d'
    try {
      const [popular, airingThisWeek, airingToday] = await Promise.all([
        axios.get(`${baseURL}tv/popular?api_key=${api_key}`),
        axios.get(`${baseURL}tv/top_rated?api_key=${api_key}`),
        axios.get(`${baseURL}tv/airing_today?api_key=${api_key}`)
      ])
      this.setState({
        popular: popular.data.results,
        airingThisWeek: airingThisWeek.data.results,
        airingToday: airingToday.data.results,
        loading: false
      })
    } catch (error) {
      console.log(error)
      this.setState({ error: "Can't get TV" })
    }
  }
  makePhotoUrl = (path, size = 'w500') =>
    `https://image.tmdb.org/t/p/${size}${path}`
  render() {
    const { loading, popular, airingThisWeek, airingToday } = this.state
    const { navigation } = this.props
    if (loading) return <Loader />
    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        {airingToday && (
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                paddingLeft: 20,
                marginBottom: 15
              }}
            >
              Airing Today
            </Text>
            <ScrollView horizontal style={{ paddingLeft: 20 }}>
              {airingToday
                .filter(tv => tv.poster_path)
                .map(({ id, poster_path, name, vote_average }) => (
                  <TouchableWithoutFeedback
                    key={id}
                    onPress={_ =>
                      navigation.navigate({
                        routeName: 'Detail',
                        params: {
                          isMovie: false,
                          id,
                          poster_path,
                          name,
                          vote_average
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
                        {name}
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
        )}
        {airingThisWeek && (
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                paddingLeft: 20,
                marginBottom: 15
              }}
            >
              Airing this week
            </Text>
            <ScrollView horizontal style={{ paddingLeft: 20 }}>
              {airingThisWeek
                .filter(tv => tv.poster_path)
                .map(({ id, poster_path, name, vote_average }) => (
                  <TouchableWithoutFeedback
                    key={id}
                    onPress={_ =>
                      navigation.navigate({
                        routeName: 'Detail',
                        params: {
                          isMovie: false,
                          id,
                          poster_path,
                          name,
                          vote_average
                        }
                      })
                    }
                  >
                    <View style={{ alignItems: 'center', marginRight: 20 }}>
                      <Image
                        source={{ uri: this.makePhotoUrl(poster_path) }}
                        style={{ width: 110, height: 160 }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          marginVertical: 5
                        }}
                      >
                        {name}
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
              Popular
            </Text>
            <ScrollView horizontal={false} style={{ paddingLeft: 20 }}>
              {popular
                .filter(({ poster_path }) => poster_path)
                .map(({ id, overview, poster_path, name, vote_average }) => (
                  <TouchableWithoutFeedback
                    key={id}
                    onPress={_ =>
                      navigation.navigate({
                        routeName: 'Detail',
                        params: {
                          isMovie: false,
                          id,
                          name,
                          vote_average,
                          poster_path
                        }
                      })
                    }
                  >
                    <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                      <Image
                        style={{ width: 110, height: 160 }}
                        source={{ uri: this.makePhotoUrl(poster_path) }}
                      />
                      <View style={{ marginLeft: 20, width: '60%' }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                            marginVertical: 5
                          }}
                        >
                          {name}
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
                ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    )
  }
}

export default withNavigation(TVScreen)
