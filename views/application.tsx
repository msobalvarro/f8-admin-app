import { ContainerViewLayout } from '@/components/ContainerView'
import { IconCallPhone, IconMail } from '@/components/Icons'
import { ContactButtons } from '@/components/message/contactCard'
import { TitleView } from '@/components/TitleView'
import { Colors } from '@/constants/colors'
import { documentOrigin } from '@/constants/constanst'
import { useAxios } from '@/hooks/useFetch'
import { ApplicationsByJobResponse } from '@/interfaces'
import { store } from '@/store'
import { StaticScreenProps } from '@react-navigation/native'
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'

type Props = StaticScreenProps<{
  applicationId: string
}>

export default function VacantApplication({ route }: Props) {
  const { token } = store.getState()
  const { applicationId } = route.params
  const { data: dataApplication, isLoading, refetch } = useAxios<ApplicationsByJobResponse>({ endpoint: `/applicationJobs/detail/${applicationId}` })

  return (
    <ContainerViewLayout>
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}

        {dataApplication && (
          <View style={styles.containerInformation}>
            <Text style={styles.name}>{dataApplication.fullName}</Text>
            <View style={styles.containerContactInformation}>
              <View style={styles.subContainerInformation}>
                <IconMail />
                <Text>{dataApplication.email}</Text>
              </View>
              <View style={styles.subContainerInformation}>
                <IconCallPhone />
                <Text>{dataApplication.phoneNumber}</Text>
              </View>
            </View>

            {(dataApplication.cv && token) && (
              <Pdf
                trustAllCerts={false}
                onError={e => console.log(e)}
                source={{
                  uri: `${documentOrigin}/${dataApplication.cv}`,
                  method: 'GET',
                  cache: true,
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }}
                style={styles.pdf} />
            )}

            <ContactButtons
              email={dataApplication.email}
              whatsapp={dataApplication.phoneNumber}
              phoneNumber={dataApplication.phoneNumber} />

            <Text style={styles.textDate}>
              {dataApplication.fullName.split(' ')[0]} aplicó el {dayjs(dataApplication.createdAt).format('LL')}
            </Text>
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
    textAlign: 'center',
  },
  pdf: {
    backgroundColor: '#AAA',
    height: 480,
    borderRadius: 10,
    width: '100%',
  },
  containerContactInformation: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  subContainerInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textDate: {
    color: '#AAA',
    textAlign: 'center'
  }
})