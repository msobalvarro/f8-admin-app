import { createStaticNavigation, NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { theme } from './constants/constanst'
import Login from './views/login'
import Menu from './views/menu'
import Messages from '@/views/messages'
import { AlertNotificationRoot } from 'react-native-alert-notification'


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screenOptions: {
    navigationBarHidden: true,
    header: () => null
  },
  screens: { Login, Menu, Messages },
})

const Navigation = createStaticNavigation(RootStack)

function App() {
  return (
    <PaperProvider theme={theme}>
      <AlertNotificationRoot>
        <NavigationIndependentTree>
          <Navigation />
        </NavigationIndependentTree >
      </AlertNotificationRoot>
    </PaperProvider>
  )
}

export default App
