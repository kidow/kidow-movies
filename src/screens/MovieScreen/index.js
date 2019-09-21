import React, { Component } from 'react'
import { Loader } from 'components'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import { Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
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

const SectionContainer = styled.View`
  margin-vertical: 20px;
`

const SectionTitle = styled.Text`
  color: white;
  font-weight: 600;
  padding-left: 20px;
  margin-bottom: 15px;
`

const SectionScrollView = styled.ScrollView`
  padding-left: 20px;
`

const ItemContainer = styled.View`
  align-items: center;
  margin-right: 20px;
`

const ItemTitle = styled.Text`
  color: white;
  font-size: ${({ big }) => (big ? '14px' : '12px')};
  margin-vertical: 5px;
`

const HContainer = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
`

const ItemColumn = styled.View`
  margin-left: 20px;
  width: 60%;
`

const ItemOverview = styled.Text`
  color: #bdc3c7;
  font-size: 12px;
  margin-vertical: 10px;
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
    const { navigation } = this.props
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
                              <Rating>⭐️ {`${vote_average} / 10`}</Rating>
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
        {upcoming && (
          <SectionContainer>
            <SectionTitle>Upcoming Movies</SectionTitle>
            <SectionScrollView horizontal>
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
                    <ItemContainer>
                      <PosterImage
                        source={{ uri: this.makePhotoUrl(poster_path) }}
                      />
                      <ItemTitle>
                        {title.length > 15
                          ? `${title.substring(0, 12)}...`
                          : title}
                      </ItemTitle>
                      <Rating>⭐️ {`${vote_average} / 10`}</Rating>
                    </ItemContainer>
                  </TouchableWithoutFeedback>
                ))}
            </SectionScrollView>
          </SectionContainer>
        )}
        {popular && (
          <SectionContainer>
            <SectionTitle>Popular Movies</SectionTitle>
            <SectionScrollView horizontal={false}>
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
                      <HContainer>
                        <PosterImage
                          source={{ uri: this.makePhotoUrl(poster_path) }}
                        />
                        <ItemColumn>
                          <ItemTitle big>{title}</ItemTitle>
                          <Rating>⭐️ {`${vote_average} / 10`}</Rating>
                          {overview && (
                            <ItemOverview>
                              {overview.length > 150
                                ? `${overview.substring(0, 147)}...`
                                : overview}
                            </ItemOverview>
                          )}
                        </ItemColumn>
                      </HContainer>
                    </TouchableWithoutFeedback>
                  )
                )}
            </SectionScrollView>
          </SectionContainer>
        )}
      </Container>
    )
  }
}

export default withNavigation(MovieScreen)
