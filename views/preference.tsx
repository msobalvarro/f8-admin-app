import { ContainerViewLayout } from '@/components/ContainerView'
import { ItemPreference } from '@/components/preferences/itemPreference'
import { LoadingSekeleton } from '@/components/preferences/loadingSkeleton'
import { NewPreference } from '@/components/preferences/newPreference'
import { TitleView } from '@/components/TitleView'
import { PreferenceContextService } from '@/context'
import { useAxios } from '@/hooks/useFetch'
import { PreferenceResponse } from '@/interfaces'
import { PreferenceStyles as styles } from '@/styles'
import { useState } from 'react'
import { View } from 'react-native'

export default function Preference() {
  const { data, isLoading, refetch } = useAxios<PreferenceResponse[]>({ endpoint: '/preferences' })
  const [showModal, toggleModal] = useState(false)

  return (
    <PreferenceContextService.Provider value={{ refetch }}>
      <ContainerViewLayout scroll onRefresh={refetch} isLoading={isLoading}>
        <View style={{ paddingVertical: 30, gap: 20 }}>
          <TitleView
            onClickAdd={() => toggleModal(true)}
            title='Preferencias'
            subtitle='Establece tus variables para el sitio de f8' />

          {isLoading && <LoadingSekeleton />}

          <View style={styles.containerList}>
            {!isLoading && data?.map((data, i) => (
              <ItemPreference preference={data} key={i} />
            ))}
          </View>

          <NewPreference onRefetch={refetch} isVisible={showModal} toggleModal={toggleModal} />
        </View>
      </ContainerViewLayout>
    </PreferenceContextService.Provider>
  )
}