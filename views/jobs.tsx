import { ContainerViewLayout } from '@/components/ContainerView'
import { TitleView } from '@/components/TitleView'
import { View } from 'react-native'
import { JobsStyles as styles } from '@/styles'
import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useFetch'
import { JobsResponse } from '@/interfaces'
import { Searchbar, Switch, Text } from 'react-native-paper'
import { Colors } from '@/constants/colors'
import { JobItem } from '@/components/jobs/itemJob'

export default function Jobs() {
  const [showActive, setActive] = useState(true)
  const [filter, setFilter] = useState('')
  const { data: jobs, isLoading, refetch } = useAxios<JobsResponse[]>({
    endpoint: `/jobs?active=${showActive}`
  })

  const dataFilter = jobs?.filter((job) =>
    `${job.title} ${job.description} ${job.location} ${job.tags.toString()}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  useEffect(() => {
    refetch()
  }, [showActive])

  return (
    <ContainerViewLayout scroll isLoading={isLoading} onRefresh={refetch}>
      <View style={styles.container}>
        <TitleView
          hiddenButton
          title='Empleos F8'
          subtitle='Administra tus empleos que se muestran en el sitio F8' />

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Switch value={showActive} onChange={_ => setActive(!showActive)} />
          <Text style={{ color: Colors.dark.text }}>Mostrar Empleos Activos</Text>
        </View>

        <Searchbar style={{ backgroundColor: 'rgba(250,250,250,0.1)' }} placeholder='buscar por empleo, descripción,' onChangeText={setFilter} value={filter} />

        <View style={{ gap: 20 }}>

          {/* {isLoading && <MessageSkeleton />} */}

          {!isLoading && dataFilter?.map((jobs, i) => (<JobItem job={jobs} key={i} />))}

          {!isLoading && dataFilter?.length == 0 && (
            <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 24, alignSelf: 'center' }}>
              No hay Empleos
            </Text>
          )}
        </View>
      </View>
    </ContainerViewLayout>
  )
}