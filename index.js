import App from './App'
import notifee, { EventType } from '@notifee/react-native'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'


notifee.onBackgroundEvent(({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      break;
  }
})

AppRegistry.registerComponent(appName, () => App)
