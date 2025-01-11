import { ContainerViewLayout } from '@/components/ContainerView'
import { MessageCard } from '@/components/message/itemMessage'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { MessagesResponse } from '@/interfaces'
import { MessageStyles as styles, UiStyles } from '@/styles'
import { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

export default function MessageView() {
  const [showArchive, toggleArchive] = useState(false)
  const [filter, setFiter] = useState('')
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

        <Checkbox.Item
          label='Mostrar archivados'
          color='#FFF'
          rippleColor='#FFF'
          disabled={isLoading}
          status={showArchive ? 'checked' : 'unchecked'}
          onPress={onChangeArchived} />
        {/* <Text style={{ color: '#CCC', fontSize: 16 }}></Text> */}

        <TextInput
          placeholderTextColor='#CCC'
          placeholder='Filtrar por nombre, correo, telefónico'
          style={[UiStyles.InputStyle, { width: '100%', fontSize: 20 }]}
          value={filter}
          keyboardType='default'
          onChangeText={setFiter} />

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