import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor, textColor } from '../common/Colors';
import { fontSize, heightAndWidth, margins, paddings, radius } from '../common/Dimensions';
import Task from '../commonComponents/Task';
import { storageKeys } from '../common/Strings';

class Home extends Component {

    state = {
        inputText: '',
        taskList: [
        ]
    }

    componentDidMount() {
        this.getTaskListFromCache()
    }

    addTask = () => {
        let taskList = [ ...this.state.taskList ];
        taskList.unshift({
            task: this.state.inputText,
            isCompleted: false
        })
        this.setState({
            taskList: taskList,
            inputText: ''
        })
        this.updateTaskListInCache(taskList)
        Keyboard.dismiss()
    }

    completeTask = (item, index) => {
      
       if(!item.isCompleted){
          
            let taskList = [ ...this.state.taskList ];
            taskList[index] = {...taskList[index], isCompleted: true};
            this.setState({ taskList });

            setTimeout(() => {
                taskList.splice(index, 1)
                this.updateTaskListInCache(taskList)
                this.setState({
                    taskList
                })
            }, 2000)
        }
    }

    updateTaskListInCache = async (taskList) => {
        try{
            await AsyncStorage.setItem(storageKeys.taskList, JSON.stringify(taskList))
        }catch(e){
            console.log('Error in storage ', e)
        }
    }

    getTaskListFromCache = async () => {
        try {
            const taskList = await AsyncStorage.getItem(storageKeys.taskList);
            if (taskList != null) {

              this.setState({taskList: JSON.parse(taskList)})
            }
          } catch (e) {
            console.log('Error in storage ', e)
          }
    }

    render(){
        const {taskList, inputText} = this.state
        const {
            container, titleText,
             taskInputContainer, 
             taskInput, addButton,  
             buttonText
            } = styles
        return(
            <View style={container}>
                <View style={taskInputContainer}>
                    <TextInput 
                    value={inputText}
                    style={taskInput} placeholder='Add task' 
                    onChangeText={inputText => this.setState({inputText})} 
                    />
                    {
                        inputText.trim().length > 0 
                        ? <TouchableOpacity style={addButton} onPress={this.addTask}>
                            <Text style={buttonText}>Add</Text>
                         </TouchableOpacity> 
                        : null
                    }
                </View>
                {
                    taskList.length > 0 ? 
                    <Text style={titleText} > Todo list </Text> : null
                }
                <ScrollView 
                style={{flex: 1, width: '100%'}} 
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
                >
                {
                    taskList.map((item, index)  => {
                        return (
                          <Task 
                           onPress={() => this.completeTask(item, index)}
                           task={item.task} isCompleted={item.isCompleted}
                           />
                        )
                      })
                }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor.commonScreenBackground,
      alignItems: 'center', 
      paddingVertical: paddings.screenVerticalPadding,
    },
    taskInputContainer: {
        width: heightAndWidth.commonElementWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: backgroundColor.buttonBackground,
        paddingVertical: paddings.buttonVertical,
        paddingHorizontal: paddings.buttonHorizontal,
        borderRadius: radius.buttonRadius
    },
    taskInput: {
        width: '75%',
        fontFamily: 'Nunito-Medium',
        fontSize: fontSize.commontTextSize,
        color: textColor.commonScreenText
    },
    buttonText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: fontSize.buttonTextSize,
        color: textColor.buttonText
    },
    titleText: {
        fontSize: fontSize.titleText,
        color: textColor.commonScreenText,
        width: heightAndWidth.commonElementWidth,
        fontFamily: 'Nunito-Medium',
        marginBottom: margins.screenElementVerticalMargin,
        marginTop: margins.screenElementVerticalMargin
        
    }
  });

export default Home