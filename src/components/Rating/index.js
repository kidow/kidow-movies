import React from 'react'
import { Text } from 'react-native'
import { number, bool } from 'prop-types'

const Rating = ({ vote_average, inSlide = false }) => (
  <Text
    style={{
      color: inSlide ? 'white' : '#bdc3c7',
      fontSize: inSlide ? 10 : 8,
      fontWeight: '600'
    }}
  >
    ⭐️ {`${vote_average} / 10`}
  </Text>
)

Rating.propTypes = {
  vote_average: number.isRequired,
  inSlide: bool
}

export default Rating
