import App from './App'
import notifee, { EventType } from '@notifee/react-native'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('es')

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
