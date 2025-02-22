import { ContainerViewLayout } from '@/components/ContainerView'
import { ItemApplicationJob } from '@/components/jobs/itemApplicationJob'
import { TitleView } from '@/components/TitleView'
import { useAxios } from '@/hooks/useFetch'
import { ApplicationsByJobResponse } from '@/interfaces'
import { StaticScreenProps } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = StaticScreenProps<{
  jobId: string
  jobTitle: string
}>

export const ApplicationsByJob = ({ route }: Props) => {
  const { jobId, jobTitle } = route.params
  const { data, isLoading, refetch } = useAxios<ApplicationsByJobResponse[]>({ endpoint: `/applicationJobs/job/${jobId}` })


  return (
    <ContainerViewLayout scroll onRefresh={refetch} isLoading={isLoading}>
      <View style={styles.container}>
        <TitleView
          title={jobTitle}
          subtitle='Muestra todas las personas que han aplicado a este empleo'
          hiddenButton />

        <View>
          {data?.map((application) => <ItemApplicationJob application={application} key={application._id} />)}
        </View>
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