import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { TabBarIcon } from 'components'
import { MovieScreen, TVScreen, SearchScreen } from 'screens'

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
    영화: {
      screen: createStack(MovieScreen, '영화'),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-film' : 'md-film'}
          />
        )
      }
    },
    드라마: {
      screen: createStack(TVScreen, '드라마'),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
          />
        )
      }
    },
    검색: {
      screen: createStack(SearchScreen, '검색'),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
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
      },
      activeTintColor: 'white'
    }
  }
)

export default createAppContainer(TabNavigation)
