
import { MessagesResponse } from '@/interfaces'
import { MessageItemStyles as styles } from '@/styles'
import { Badge, Button } from 'react-native-paper'
import { View, Text, ScrollView } from 'react-native'
import { ContactButtons } from './contactCard'
import { useState } from 'react'
import { handledArchiveMessage, handleDeleteMessage } from '@/services/messageServices'
import { IconArchive, IconTrash } from '../Icons'
import { theme } from '@/constants/constanst'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface Props {
  message: MessagesResponse
  refetch: () => void
}

export const MessageCard = ({ message, refetch }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    await handleDeleteMessage(message._id, setLoading, refetch)
  }

  const handledArchive = async () => {
    await handledArchiveMessage(message._id, setLoading, refetch)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {message?.archived && (
          <View style={{ alignItems: 'flex-start' }}>
            <Badge>Archivado</Badge>
          </View>
        )}

        <Text style={styles.header}>Message from {message.fullName}</Text>
        <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
        <Text style={styles.subHeader}>{message.company}</Text>

        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Email:</Text>
          <Text style={styles.detailText} selectable>{message.email}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Phone:</Text>
          <Text style={styles.detailText} selectable>{message.phoneNumber}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Message:</Text>
          <Text style={styles.messageText} selectable>{message.message}</Text>
        </View>

        <View style={styles.containerButtons}>
          {!message?.archived && <Button
            loading={loading}
            buttonColor={theme.colors.surface}
            onPress={handledArchive}>
            <IconArchive />
          </Button>}

          {message?.archived && (
            <Button
              loading={loading}
              buttonColor={theme.colors.surface}
              onPress={handledArchive}>
              Recuperar
            </Button>
          )}

          <Button
            loading={loading}
            buttonColor={theme.colors.primary}
            onPress={handleDelete}>
            <IconTrash />
          </Button>
        </View>

        <View style={styles.divider} />

        <ContactButtons
          email={message.email}
          whatsapp={message.phoneNumber}
          phoneNumber={message.phoneNumber} />
      </View>
    </ScrollView>
  )
}
