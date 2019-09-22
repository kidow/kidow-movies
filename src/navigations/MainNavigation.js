import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import TabNavigation from './TabNavigation'
import { DetailScreen } from 'screens'

const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: {
        header: null
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
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
  },
  { headerMode: 'screen', headerBackTitleVisible: false }
)

export default createAppContainer(MainNavigation)
