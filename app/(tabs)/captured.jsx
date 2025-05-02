import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { getAllTodo } from '../../configs/curd';

export default function Captured() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const result = await getAllTodo();
      
      if (result.success) {
        setTodos(result.todos || []);
        setError(result.todos?.length ? null : "No todos found");
      } else {
        throw new Error(result.error || 'Failed to fetch todos');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title || 'Untitled'}</Text>
      <Text style={styles.todoDescription}>
        {item.description || 'No description'}
      </Text>
      <Text style={styles.todoDate}>
        {item.createdAt?.toDate?.()?.toLocaleString() || 'Unknown date'}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.centerContainer} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captured Data</Text>
      
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {error || 'No todos found. Add one to get started!'}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'outFit-bold',
    fontSize: 24,
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginVertical: 16,
    paddingTop: 30
  },
  todoItem: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoTitle: {
    fontFamily: 'outFit-bold',
    fontSize: 18,
    color: Colors.PRIMARY,
    marginBottom: 4,
  },
  todoDescription: {
    fontFamily: 'outFit',
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 4,
  },
  todoDate: {
    fontFamily: 'outFit',
    fontSize: 12,
    color: Colors.LIGHT_GRAY,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'outFit',
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'outFit',
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
});