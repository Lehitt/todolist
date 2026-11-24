import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, Pressable } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { Task } from './types/Task';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const database = await AsyncStorage.getItem('tasks')
        if (database !== null) {
          setTasks(JSON.parse(database))
        }
      } catch (error) {
        console.log("error")
      }
    }
    loadTodos()
  }, [])

  const addTask = async () => {
    if (!input.trim()) return

    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    }

    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)
    setInput("")

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
      console.log("task saved successfully")
    } catch (error) {
      console.log("error")
    }
  }

  const toggleTask = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View style={styles.placeholder}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder='add new task...'
          onSubmitEditing={addTask}
        />
        <Pressable style={styles.buttonStyle} onPress={addTask}>
          <Text style={styles.savestyle}>save</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Row item={item} onToggle={toggleTask} />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginLeft: 240,
    marginTop: 10,
    marginRight: 8
  },
  savestyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
  },
  input: {
    flex: 1
  },
  placeholder: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
