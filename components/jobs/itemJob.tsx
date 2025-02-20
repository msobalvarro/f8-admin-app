import { Colors } from '@/constants/colors'
import { JobsResponse } from '@/interfaces'
import { deleteJobService } from '@/services/deleteJob'
import { ItemJobStyles as styles } from '@/styles'
import { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper'
import { TagsPreview } from './tagsPreview'

type Props = {
  job: JobsResponse
  refetch: () => void
}

export const JobItem = ({ job, refetch }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteJobService(job._id, refetch)
    setLoading(false)
  }

  const handledArchive = async () => {
    // await handledArchiveMessage(message._id, setLoading, refetch)
  }

  return (
    <View style={styles.container}>
      {job?.image && <Image source={{ uri: job.image }} style={styles.image} />}

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
        {!job?.active && (
          <Button
            loading={loading}
            textColor={Colors.primary}
            icon='archive'
            onPress={handledArchive}>Activar</Button>
        )}

        {job?.active && (
          <Button
            loading={loading}
            textColor={Colors.primary}
            icon='undo'
            onPress={handledArchive}>Desactivar</Button>
        )}

        <Button
          loading={loading}
          textColor={Colors.primaryLight}
          icon='edit'
          onPress={handledArchive}>Editar</Button>

        <Button
          loading={loading}
          textColor={Colors.delete}
          icon='delete'
          onPress={handleDelete}>
          Eliminar
        </Button>
      </View>

    </View>
  )
}
