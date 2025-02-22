import { ContainerViewLayout } from '@/components/ContainerView'
import { MessageCard } from '@/components/message/itemMessage'
import { TitleView } from '@/components/TitleView'
import { Colors } from '@/constants/colors'
import { useAxios } from '@/hooks/useFetch'
import { MessagesResponse } from '@/interfaces'
import { socket } from '@/socket'
import { MessageStyles as styles } from '@/styles'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Searchbar, Switch } from 'react-native-paper'

export default function MessageView() {
  const [showArchive, toggleArchive] = useState(false)
  const [filter, setFilter] = useState('')
  const { data, isLoading, refetch } = useAxios<MessagesResponse[]>({
    endpoint: `/message?archived=${showArchive}`
  })

  const dataFilter = data?.filter((message) =>
    `${message.fullName} ${message.email} ${message.phoneNumber}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  useEffect(() => {
    refetch()
  }, [showArchive])

  useEffect(() => {
    socket.on('newMessage', () => refetch())
  }, [])

  const onChangeArchived = () => {
    toggleArchive(!showArchive)
  }

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={styles.container}>
        <TitleView
          hiddenButton
          title='Mensajes'
          subtitle='Recibe y administras a tus consultas y solicitudes' />

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Switch value={showArchive} onChange={onChangeArchived} />
          <Text style={{ color: Colors.dark.text }}>Mostrar Mensajes Archivados</Text>
        </View>

        <Searchbar style={{ backgroundColor: 'rgba(250,250,250,0.1)' }} placeholder='buscar por nombre, correo, telefónico' onChangeText={setFilter} value={filter} />

        <View style={{ gap: 20 }}>

          {/* {isLoading && <MessageSkeleton />} */}

          {!isLoading && dataFilter?.map((message, i) => (<MessageCard refetch={refetch} message={message} key={i} />))}

          {!isLoading && dataFilter?.length == 0 && (
            <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
              No hay Mensajes
            </Text>
          )}
        </View>
      </View>
    </ContainerViewLayout>
  )
}