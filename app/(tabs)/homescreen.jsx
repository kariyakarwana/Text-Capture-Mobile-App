import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { createTodo, getAllTodo } from '../../configs/curd'; // Make sure to import your CRUD operations

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(false);

  const loadTodos = async () => {
    setFetching(true);
    try {
      const result = await getAllTodo();
      if (result.success) {
        setTodos(result.todos);
      } else {
        Alert.alert('Error', result.error || 'Failed to load todos');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch todos');
      console.error('Load error:', error);
    } finally {
      setFetching(false);
    }
  };
  
  // Add this useEffect to load todos when component mounts
  useEffect(() => {
    loadTodos();
  }, []);


  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    setLoading(true);
    try {
      const result = await createTodo({
        title,
        description,
        createdAt: new Date()
      });

      if (result.success) {
        Alert.alert('Success', 'Todo saved successfully');
        setTitle('');
        setDescription('');
        // Refresh the todo list after saving
        await loadTodos();
      } else {
        Alert.alert('Error', result.error || 'Failed to save todo');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Capture Text App</Text>
        <Text style={{fontFamily:'outFit',fontSize:12,textAlign:'center',color:Colors.GRAY,paddingBottom:30}}>Using below form you can add notes.All the Added notes can view using Captured tab.</Text>
      </View>
      
      {/* Title Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter the Title</Text>
        <TextInput 
          placeholder='Enter Title' 
          style={styles.input} 
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter the Description</Text>
        <TextInput 
          placeholder='Enter Description' 
          multiline={true} 
          numberOfLines={4} 
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity 
        style={styles.button1} 
        onPress={handleSave} 
        disabled={loading}
      >
        <Text style={styles.buttonText1}>{loading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'outFit-bold',
    fontSize: 30,
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    fontFamily: 'outFit',
    color: Colors.PRIMARY
  },
  label: {
    fontFamily: 'outFit',
    paddingBottom: 10,
    color: Colors.PRIMARY
  },
  inputContainer: {
    marginBottom: 20
  },
  descriptionInput: {
    height: 120,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button1: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginBottom: 20,
  },
  buttonText1: {
    fontFamily: 'outFit',
    fontSize: 17,
    color: Colors.WHITE
  },
  todoListContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: 'outFit-bold',
    fontSize: 20,
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  todoItem: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  todoTitle: {
    fontFamily: 'outFit-bold',
    fontSize: 18,
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  todoDescription: {
    fontFamily: 'outFit',
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  todoDate: {
    fontFamily: 'outFit',
    fontSize: 12,
    color: Colors.LIGHT_GRAY,
  },
  emptyText: {
    fontFamily: 'outFit',
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  }
});