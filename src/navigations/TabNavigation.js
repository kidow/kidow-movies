import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { TabBarIcon } from 'components'
import { MovieScreen } from 'screens'

const createStack = (screen, title) =>
  createStackNavigator({
    Screen: {
      screen,
      navigationOptions: {
        title,
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: 'white'
        },
        headerTintColor: 'white'
      }
    }
  })

const TabNavigation = createBottomTabNavigator(
  {
    Movie: {
      screen: createStack(MovieScreen, 'Movie'),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-film' : 'md-film'}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'black',
        borderTopColor: 'black',
        color: 'white'
      }
    }
  }
)

export default createAppContainer(TabNavigation)
