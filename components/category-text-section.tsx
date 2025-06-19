import { colors } from '@/theme/colors';
import React from 'react';
import { Text, View } from 'react-native';

const UnderlinedText = ({
    label
}:{
    label:string
}) => {

  return (
    <View style={{}}>
      <Text
        style={{
          fontWeight: 'light',
          fontSize: 12,
          color: colors.primary,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          marginTop: 1,
          height: 2,
          width: '20%',
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

export default UnderlinedText;
