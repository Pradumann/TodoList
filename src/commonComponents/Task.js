import React from 'react'
import { TouchableOpacity , StyleSheet, Text} from 'react-native'
import { backgroundColor, textColor } from '../common/Colors';
import { fontSize, heightAndWidth, margins, paddings, radius } from '../common/Dimensions';
import RadioButton from './RadioButton';

const Task = ({task, isCompleted, onPress}) => {
    const {container, taskText} = styles
    return(
        <TouchableOpacity style={container} onPress={onPress}>
            <RadioButton isChecked={isCompleted}/>
            <Text style={[taskText, {textDecorationLine: isCompleted ? 'line-through' : null}]}>{task}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      width: heightAndWidth.taskCardWidth,
      minHeight: heightAndWidth.taskCardHeigh,
      backgroundColor: backgroundColor.incompleteTaskBackground,
      borderRadius: radius.taskCardRadius,
      marginTop: margins.taskCardVerticalMargin,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal:paddings.taskCardHorizontalPadding,
      paddingVertical: paddings.taskCardVerticalPadding
    },
    taskText: {
        
        fontFamily: 'Nunito-SemiBold',
        fontSize: fontSize.taskText,
        color: textColor.incompleteTaskText,
        marginLeft: margins.taskElementHorizontalMargin
    }
  });

export default Task