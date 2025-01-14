import { ContainerViewLayout } from '@/components/ContainerView';
import { TitleView } from '@/components/TitleView';
import { UserList } from '@/components/user/itemUser';
import { UsersContextService } from '@/context';
import { useAxios } from '@/hooks/useFetch';
import { UserResponse } from '@/interfaces';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export default function Users() {
  const navigation = useNavigation()
  const { data, isLoading, refetch } = useAxios<UserResponse[]>({ endpoint: '/user' })

  const onNewUser = () => navigation.navigate('NewUser' as never)

  return (
    <UsersContextService.Provider value={{ refetch }}>
      <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
        <View style={{ paddingVertical: 20, }}>
          <TitleView
            // hiddenButton
            onClickAdd={onNewUser}
            title='Administrar Usarios'
            subtitle='Administra tus usuarios registrados en la App F8'
          />

          {data && <UserList users={data} />}
        </View>
      </ContainerViewLayout>
    </UsersContextService.Provider>
  )
}