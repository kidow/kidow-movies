import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { string, bool } from 'prop-types'

const TabBarIcon = ({ name, focused }) => (
  <Ionicons size={26} name={name} color={focused ? 'white' : '#7f8c8d'} />
)

TabBarIcon.propTypes = {
  name: string.isRequired,
  focused: bool.isRequired
}

export default TabBarIcon
