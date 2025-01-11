import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { theme } from './constants/constanst'
import { AlertNotificationRoot } from 'react-native-alert-notification'
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
import { UiNavbar } from './components/ui/Navbar'


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
    Preference
  },
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
