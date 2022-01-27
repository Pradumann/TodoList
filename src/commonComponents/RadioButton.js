import React from 'react'
import {View, StyleSheet} from 'react-native'
import { backgroundColor, borderColor } from '../common/Colors'
import { heightAndWidth, radius } from '../common/Dimensions'

const RadioButton = ({isChecked}) => {

    const {container} = styles

return(
    <View style={[container, {backgroundColor: isChecked 
        ? backgroundColor.radioButtonCheckedBackground 
        : backgroundColor.radioButtonUnCheckedBackground}]}
    />
)
}

const styles = StyleSheet.create({
    container: {
      borderRadius: radius.radioButtonRadius,
      width: radius.radioButtonRadius * 2,
      height: radius.radioButtonRadius * 2,
      borderColor: borderColor.radioButton,
      borderWidth: heightAndWidth.radioButtonBorderWidth
    }
  });

export default RadioButton