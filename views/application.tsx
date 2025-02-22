import { ContainerViewLayout } from '@/components/ContainerView'
import { ContactButtons } from '@/components/message/contactCard'
import { TitleView } from '@/components/TitleView'
import { Colors } from '@/constants/colors'
import { documentOrigin } from '@/constants/constanst'
import { useAxios } from '@/hooks/useFetch'
import { ApplicationsByJobResponse } from '@/interfaces'
import { store } from '@/store'
import { StaticScreenProps } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'

type Props = StaticScreenProps<{
  applicationId: string
}>

export default function VacantApplication({ route }: Props) {
  const { token } = store.getState()
  const { applicationId } = route.params
  const { data, isLoading, refetch } = useAxios<ApplicationsByJobResponse>({ endpoint: `/applicationJobs/detail/${applicationId}` })

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={styles.container}>
        {/* <TitleView
          title='Información de la persona'
          subtitle='Muestra la información de la persona que ha aplicado a esta vacante'
          hiddenButton /> */}

        {data && (
          <View style={styles.containerInformation}>
            <Text style={styles.name}>{data.fullName}</Text>

            {data.cv && (
              <Pdf
                trustAllCerts={false}
                onError={e => console.log(e)}
                source={{
                  uri: `${documentOrigin}/${data.cv}`,
                  method: 'GET',
                  cache: true,
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }}
                style={styles.pdf} />
            )}

            <ContactButtons
              email={data.email}
              whatsapp={data.phoneNumber}
              phoneNumber={data.phoneNumber} />
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
  containerInformation: {
    gap: 15,
  },
  name: {
    color: Colors.primaryLight,
    fontSize: 24,
  },
  pdf: {
    backgroundColor: '#AAA',
    height: 480,
    borderRadius: 10,
    width: '100%',
  }
})