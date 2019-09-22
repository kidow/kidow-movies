import React from 'react'
import { oneOfType, arrayOf, node, bool, string } from 'prop-types'
import { View, Text, ScrollView } from 'react-native'

const Section = ({ title, children, horizontal = true }) => (
  <View style={{ marginVertical: 20 }}>
    <Text
      style={{
        color: 'white',
        fontWeight: '600',
        paddingLeft: 20,
        marginBottom: 15
      }}
    >
      {title}
    </Text>
    <ScrollView horizontal={horizontal} style={{ paddingHorizontal: 20 }}>
      {children}
    </ScrollView>
  </View>
)

Section.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  horizontal: bool,
  title: string.isRequired
}

export default Section
