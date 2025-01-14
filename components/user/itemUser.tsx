import dayjs from 'dayjs'
import { UserResponse } from '@/interfaces'
import { UserListStyles as styles } from '@/styles'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from '@/constants/colors'
import { useContext, useState } from 'react'
import { deleteUserService } from '@/services/deleteUser'
import { UsersContextService } from '@/context'

interface Props {
  users: UserResponse[]
}

export const UserList = ({ users }: Props) => {
  const context = useContext(UsersContextService)
  const [loading, setLoading] = useState(false)

  const deleteUser = async (id: string) => {
    setLoading(true)
    await deleteUserService(id)
    await context?.refetch()
    setLoading(false)
  }

  const RenderItem = ({ item }: { item: UserResponse }) => (
    <View style={styles.card}>
      <View style={styles.containerNames}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.username}>@{item.username}</Text>
      </View>
      <Text style={styles.date}>Creado: {dayjs(item.createdAt).format('DD/MM/YY HH:mm A')}</Text>
      <Text style={styles.date}>Actualizado: {dayjs(item.updatedAt).format('DD/MM/YY HH:mm A')}</Text>

      <View style={styles.containerButtons}>

        <Button
          textColor={Colors.primary}
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
