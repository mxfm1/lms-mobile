import { colors } from '@/theme/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


type ProgressBarProps = {
    progress?:number
}

const ProgressBar = ({
    progress
}:ProgressBarProps) => {
    const courseProgress = Math.max(0, Math.min(progress ?? 0, 1))
  return (
    <View style={styles.progressBarContainer}>
      <Text style={[
        styles.progressBar,
        {width: `${courseProgress * 100}%`}
      ]}/>
    </View>
  )
}

const styles = StyleSheet.create({
    progressBarContainer: {
        width: '100%',
        height: 6,
        borderRadius:6,
        overflow: 'hidden',
        backgroundColor: colors.progressBarBg
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.primary
    }
})

export default ProgressBar