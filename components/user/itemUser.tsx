import dayjs from 'dayjs'
import { UserResponse } from '@/interfaces'
import { UserListStyles as styles } from '@/styles'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from '@/constants/colors'
import { useContext, useState } from 'react'
import { deleteUserService } from '@/services/deleteUser'
import { UsersContextService } from '@/context'
import { useNavigation } from '@react-navigation/native'
import { IconCalendar } from '../Icons'

interface Props {
  users: UserResponse[]
}

export const UserList = ({ users }: Props) => {
  const navigation = useNavigation()
  const context = useContext(UsersContextService)
  const [loading, setLoading] = useState(false)
  const onUpdatePassword = (user: UserResponse) => navigation.navigate('UpdatePasswordUser' as never, user)

  const deleteUser = async (id: string) => {
    setLoading(true)
    await deleteUserService(id, context?.refetch)
    setLoading(false)
  }

  const RenderItem = ({ item }: { item: UserResponse }) => (
    <View style={styles.card}>

      <View style={styles.dateContainer}>
        <IconCalendar />
        <Text style={styles.date}>{dayjs(item.createdAt).format('DD/MM/YY HH:mm A')}</Text>
      </View>

      <View style={styles.containerNames}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.username}>@{item.username}</Text>
      </View>

      <View style={styles.containerButtons}>
        <Button
          textColor={Colors.primary}
          onPress={() => onUpdatePassword(item)}
          icon='update'>Actualizar Contraseña</Button>

        <Button
          loading={loading}
          onPress={() => deleteUser(item._id)}
          textColor={Colors.delete}
          icon='delete'>
          Eliminar
        </Button>
      </View>

    </View>
  )

  return (
    <View style={styles.container}>
      {users.map(user => <RenderItem item={user} key={user._id} />)}
    </View>
  )
}
