import { tagsInputStyles as styles } from '@/styles'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const TagsPreview = ({ tags }: { tags: string[] }) => {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  )
}