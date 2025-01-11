import notifee, { AndroidImportance } from "@notifee/react-native"


/** Muestra una notificacion push */
export async function onDisplayNotification(body: string) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  })

  // Display a notification
  await notifee.displayNotification({
    title: 'F8 Technologies',
    body,
    data: {
      type: 'message'
    },
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  })
}