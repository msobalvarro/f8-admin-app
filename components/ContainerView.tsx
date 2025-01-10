import React from 'react'
import { ContainerLayoutStyles as styles } from '@/styles'
import { ScrollView } from 'react-native'
import { RefreshControl, View } from 'react-native'

interface Props {
  children: React.ReactNode
  scroll?: boolean
  isLoading?: boolean
  onRefresh?: () => void
}


export const ContainerViewLayout = ({ children, scroll, isLoading, onRefresh }: Props) => {
  if (scroll) {
    return (
      <View style={styles.containerScroll}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          refreshControl={(onRefresh) &&
            <RefreshControl
              refreshing={Boolean(isLoading)}
              onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scroll}>
          {children}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}
