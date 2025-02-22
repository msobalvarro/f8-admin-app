import { Colors } from '@/constants/colors'
import { JobsResponse, NavigateParamList } from '@/interfaces'
import { deleteJobService } from '@/services/deleteJob'
import { ItemJobStyles as styles } from '@/styles'
import { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { TagsPreview } from './tagsPreview'
import { imageOrigin } from '@/constants/constanst'
import { updatetStatusJob } from '@/services/updateStatusJob'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  job: JobsResponse
  refetch: () => void
}

export const JobItem = ({ job, refetch }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateParamList>>()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteJobService(job._id, refetch)
    setLoading(false)
  }

  const handleUpdateStatus = async () => {
    setLoading(true)
    await updatetStatusJob(job._id, job.active, refetch)
    setLoading(false)
  }

  const handledEdit = () => {
    navigation.navigate(`UpdateJob`, { id: job._id })
  }

  const handleNavigateApplications = () => {
    navigation.navigate(`ApplicationsByJob`, {
      jobId: job._id,
      jobTitle: job.title,
    })
  }

  return (
    <View style={styles.container}>
      {job?.image && <Image source={{ uri: `${imageOrigin}/${job.image}` }} style={styles.image} resizeMode='cover' />}

      {job.applicationsCount > 0 && (
        <TouchableOpacity onPress={handleNavigateApplications} style={styles.containerCounter}>
          <Text style={styles.textCount}>{job.applicationsCount} persona(s) han aplicado a este empleo</Text>
        </TouchableOpacity>
      )}

      <View style={styles.containerTitle}>
        <Text style={styles.title}>{job.title}</Text>

        <View style={[styles.status, job.active ? styles.active : styles.inactive]}>
          <Text style={styles.statusText}>{job.active ? 'Activo' : 'Inactivo'}</Text>
        </View>
      </View>


      <View style={styles.content}>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {job.description}
        </Text>

        <TagsPreview tags={job.tags} />
      </View>


      <View style={styles.containerButtons}>
        <Button
          disabled={loading}
          textColor={Colors.delete}
          icon='delete'
          onPress={handleDelete}>
          Eliminar
        </Button>

        {!job?.active && (
          <Button
            disabled={loading}
            textColor={Colors.primary}
            icon='undo'
            onPress={handleUpdateStatus}>Activar</Button>
        )}

        {job?.active && (
          <Button
            disabled={loading}
            textColor={Colors.primary}
            icon='archive'
            onPress={handleUpdateStatus}>Desactivar</Button>
        )}

        <Button
          disabled={loading}
          textColor={Colors.primaryLight}
          icon='pen'
          onPress={handledEdit}>Editar</Button>

      </View>

    </View>
  )
}
