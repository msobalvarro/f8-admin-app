import { ContainerViewLayout } from '@/components/ContainerView'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ApplicationsByJobResponse } from '@/interfaces'
import { StaticScreenProps } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = StaticScreenProps<{
  applicationId: string
}>

export default function VacantApplication({ route }: Props) {
  const { applicationId } = route.params
  const { data, isLoading, refetch } = useAxios<ApplicationsByJobResponse>({ endpoint: `/applicationJobs/detail/${applicationId}` })

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={styles.container}>
        <TitleView
          title='Información de la persona'
          subtitle='Muestra la información de la persona que ha aplicado a esta vacante'
          hiddenButton />

        {data && (
          <View>
            <Text>{data.fullName}</Text>
          </View>
        )}
      </View>
    </ContainerViewLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    gap: 20,
  },
})