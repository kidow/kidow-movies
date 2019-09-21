import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
`

export default _ => (
  <Container>
    <ActivityIndicator color="white" />
  </Container>
)
