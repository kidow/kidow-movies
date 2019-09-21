import React, { Component } from 'react'
import { Loader } from 'components'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import axios from 'axios'

const { width, height } = Dimensions.get('screen')

const Container = styled.ScrollView`
  background-color: black;
`

const View = styled.View`
  height: ${height / 3};
`

const SlideContainer = styled.View`
  flex: 1;
  position: relative;
`

const BgImage = styled.Image`
  width: ${width};
  height: ${height / 3};
  opacity: 0.3;
  position: absolute;
`

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 30px;
  justify-content: space-between;
`

const Column = styled.View`
  width: 60%;
  align-items: flex-start;
`

const Title = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
`

const Overview = styled.Text`
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
`

const VoteContainer = styled.View`
  margin: 10px 0px;
`

const BtnContainer = styled.TouchableOpacity`
  background-color: #e74c3c;
  border-radius: 5px;
  padding: 8px;
`

const BtnText = styled.Text`
  color: white;
  font-size: 12px;
`

const PosterImage = styled.Image`
  width: 110px;
  height: 160px;
  border-radius: 2.5px;
`

const Rating = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: 600;
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
    return loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying && (
          <Swiper
            showsPagination={false}
            autoplay
            style={{ height: height / 3 }}
            autoplayTimeout={3}
          >
            {nowPlaying
              .filter(({ backdrop_path }) => backdrop_path !== null)
              .map(
                ({
                  id,
                  overview,
                  vote_average,
                  backdrop_path,
                  title,
                  poster_path
                }) => (
                  <View key={id}>
                    <SlideContainer>
                      <BgImage
                        source={{ uri: this.makePhotoUrl(backdrop_path) }}
                      />
                      <Content>
                        <PosterImage
                          source={{ uri: this.makePhotoUrl(poster_path) }}
                        />
                        <Column>
                          <Title>{title}</Title>
                          {vote_average && (
                            <VoteContainer>
                              <Rating>{`${vote_average} / 10`}</Rating>
                            </VoteContainer>
                          )}
                          {overview && (
                            <Overview>
                              {overview.length > 117
                                ? `${overview.substring(0, 120)}...`
                                : overview}
                            </Overview>
                          )}
                          <BtnContainer
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
                            <BtnText>View details</BtnText>
                          </BtnContainer>
                        </Column>
                      </Content>
                    </SlideContainer>
                  </View>
                )
              )}
          </Swiper>
        )}
      </Container>
    )
  }
}

export default withNavigation(MovieScreen)
