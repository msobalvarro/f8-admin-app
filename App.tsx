import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { theme } from './constants/constanst'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { UiNavbar } from './components/ui/Navbar'
import { useStore } from './hooks/useStore'
import { useEffect } from 'react'
import { registerNotification, socket } from './socket'
import Login from './views/login'
import Menu from './views/menu'
import Messages from './views/messages'
import NewService from './views/newService'
import Products from './views/products'
import Product from './views/product'
import Service from './views/service'
import NewProduct from './views/newProduct'
import Preference from './views/preference'
import Services from './views/services'
import Users from './views/users'
import NewUser from './views/newUser'
import UpdatePasswordUser from './views/updatePasswordUser'
import Jobs from './views/jobs'
import NewJob from './views/newJob'
import UpdateJob from './views/updateJob'
import ApplicationsByJob from './views/applicationsByJob'
import VacantApplication from './views/application'


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screenOptions: {
    navigationBarHidden: true,
    header: () => <UiNavbar />
  },
  screens: {
    Login,
    Menu,
    Messages,
    NewService,
    NewProduct,
    Products,
    Product,
    Services,
    Service,
    Preference,
    Users,
    NewUser,
    UpdatePasswordUser,
    Jobs,
    NewJob,
    UpdateJob,
    ApplicationsByJob,
    VacantApplication
  },
})

const Navigation = createStaticNavigation(RootStack)

function App() {
  const { isAuth, token } = useStore()

  useEffect(() => {
    if (isAuth && token) {
      socket.auth = { token }
      socket.connect()

      registerNotification()
    } else {
      socket.disconnect()
    }
  }, [isAuth, token])

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
