import { ApplicationsByJobResponse } from '@/interfaces'
import { ItemApplicationJobStyles as styles } from '@/styles'
import dayjs from 'dayjs'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { IconApplicationAttachment } from '../Icons'

type Props = {
  application: ApplicationsByJobResponse
}

export const ItemApplicationJob = ({ application }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <IconApplicationAttachment />
      <View style={{gap: 5}}>
        <Text style={styles.title}>{application.fullName}</Text>
        <Text style={styles.text}>{application.email}</Text>
        <Text style={styles.textDate}>
          {dayjs(application.createdAt).format('LL')} ({dayjs(application.createdAt).fromNow()})
        </Text>
      </View>
    </TouchableOpacity>
  )
}
