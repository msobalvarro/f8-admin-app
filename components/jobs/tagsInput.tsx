import { TagStyles as styles } from '@/styles'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

type Props = {
  onChangeTags: (tags: string[]) => void
}

export const TagsInput = ({ onChangeTags }: Props) => {
  const [tags, setTags] = useState<string[]>([])
  const [text, setText] = useState('')

  const addTag = () => {
    if (text.trim() !== '' && !tags.includes(text.trim())) {
      const newTags = [...tags, text.trim()]
      setTags(newTags)
      onChangeTags(newTags)
      setText('')
    }
  }

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
    onChangeTags(newTags)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholderTextColor='#CCC'
        onSubmitEditing={addTag}
        placeholder='Tags, presiona enter para agregar'
        returnKeyType='done'
      />

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>

            <TouchableOpacity onPress={() => removeTag(index)}>
              <Text style={styles.removeTag}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}