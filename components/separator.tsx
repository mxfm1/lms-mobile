    // components/separator.tsx
import { colors } from '@/theme/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type SeparatorProps = {
  label: string
}

const Separator = ({ label }: SeparatorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
    opacity: 0.4,
  },
  text: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 13,
  },
})

export default Separator
