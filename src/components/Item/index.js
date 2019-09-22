import React from 'react'
import { number, string, bool } from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Poster, Rating } from 'components'

const Item = ({
  id,
  poster_path,
  title,
  vote_average,
  horizontal = false,
  overview,
  isMovie = true,
  navigation
}) => (
  <TouchableWithoutFeedback
    onPress={_ =>
      navigation.navigate({
        routeName: 'Detail',
        params: {
          isMovie,
          id,
          poster_path,
          backdrop_path: null,
          title,
          vote_average,
          overview
        }
      })
    }
  >
    {horizontal ? (
      <View style={{ marginBottom: 20, flexDirection: 'row' }}>
        <Poster poster_path={poster_path} />
        <View style={{ marginLeft: 20, width: '60%' }}>
          <Text style={{ color: 'white', fontSize: 14, marginVertical: 5 }}>
            {title}
          </Text>
          <Rating vote_average={vote_average} />
          <Text style={{ color: '#bdc3c7', fontSize: 12, marginVertical: 10 }}>
            {overview}
          </Text>
        </View>
      </View>
    ) : (
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Poster poster_path={poster_path} />
        <Text style={{ color: 'white', fontSize: 12, marginVertical: 5 }}>
          {title}
        </Text>
        <Rating vote_average={vote_average} />
      </View>
    )}
  </TouchableWithoutFeedback>
)

Item.propTypes = {
  id: number.isRequired,
  poster_path: string.isRequired,
  title: string.isRequired,
  vote_average: number.isRequired,
  overview: string,
  isMovie: bool
}

export default withNavigation(Item)
