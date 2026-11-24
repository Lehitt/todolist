import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Task } from '../types/Task'

interface TodoRowProps {
    item: Task
    onToggle: (id: number) => void
}

export default function Row({ item, onToggle }: TodoRowProps) {
    const [done, setDone] = useState(false)


    return (
        <View style={styles.todoRow}>
            <Pressable onPress={() => onToggle(item.id)}>
                <Text style={item.completed ? styles.donestyle : styles.notdone}>{item.text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 4,
        margin: 4,
        borderColor: '#c1c0c0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center'
    },
    donestyle: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: 'red',
        fontSize: 16,
    },
    notdone: {
        textDecorationLine: 'none',
        fontWeight: 'bold'
    }
})
