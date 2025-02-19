import { JobsResponse } from '@/interfaces'
import { ItemJobStyles as styles } from '@/styles'
import { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export const JobItem = ({ job }: { job: JobsResponse }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    // await handleDeleteMessage(message._id, setLoading, refetch)
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

        <View style={styles.tagsContainer}>
          {job.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.containerButtons}>
        {!job?.active && (
          <Button
            loading={loading}
            textColor={Colors.primary}
            icon='archive'
            onPress={handledArchive}>Archivar</Button>
        )}

        {job?.active && (
          <Button
            loading={loading}
            textColor={Colors.primary}
            icon='undo'
            onPress={handledArchive}>Recuperar</Button>
        )}

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
