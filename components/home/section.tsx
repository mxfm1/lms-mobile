import { colors } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
type SectionProps = {
    containerStyle?:ViewStyle;
    title?:string

} & PropsWithChildren
const Section = ({
    children,
    containerStyle,
    title
}:SectionProps) => {
  return (
    <LinearGradient 
      colors={[colors.metalicBlue, colors.dark]}
      start={{x:0,y:0}}
      end={{x:1,y:1}}
      style={[
        styles.container,
        containerStyle
    ]}> 
      {title && (
          <Text style={{paddingTop:8, paddingBottom: 12, fontSize:24, fontWeight: 'bold', color:'white'}}>
              {title}
          </Text>
      )}
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius:20,
        // backgroundColor: '#f2f2f2',
    }
})

export default Section