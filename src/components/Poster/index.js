import React from 'react'
import { string } from 'prop-types'
import { makePhotoUrl } from 'utils'
import { Image } from 'react-native'

const Poster = ({ poster_path }) => <Image style={{ width: 110, height: 160, borderRadius: 2.5 }} source={{ uri: makePhotoUrl(poster_path )}} />

Poster.propTypes = {
  poster_path: string.isRequired
}

export default Poster