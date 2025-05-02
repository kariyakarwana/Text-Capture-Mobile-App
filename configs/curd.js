import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc 
  } from 'firebase/firestore';
  import { db } from './firebaseConfig';
  
  
  // Error messages
  const ERROR_MESSAGES = {
    CREATE: "Failed to create todo",
    READ: "Failed to fetch todos",
    UPDATE: "Failed to update todo",
    DELETE: "Failed to delete todo"
  };
  
  /**
   * Create a new todo document
   * @param {Object} data - Todo data to create (must contain title and description)
   */
  export const createTodo = async (data) => {
    try {
      if (!data?.title || !data?.description) {
        throw new Error('Title and description are required');
      }
  
      const docRef = await addDoc(collection(db, "todo"), {
        title: data.title,
        description: data.description,
        createdAt: new Date()
      });
      
      return { 
        success: true, 
        id: docRef.id,
        message: "Todo created successfully"
      };
    } catch (error) {
      console.error(ERROR_MESSAGES.CREATE, error);
      return { 
        success: false, 
        error: ERROR_MESSAGES.CREATE,
        details: error.message 
      };
    }
  };
  
  /**
   * Get all todos sorted by creation date
   
  export const getAllTodo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      console.log('Firestore documents found:', querySnapshot.size); // Debug log
      
      const todos = querySnapshot.docs.map(doc => {
        console.log('Document data:', doc.id, doc.data()); // Debug log
        return {
          id: doc.id,
          title: doc.data().title || 'No Title',
          description: doc.data().description || '',
          // Add createdAt if you have it
          createdAt: doc.data().createdAt?.toDate() || new Date()
        };
      });
  
      return { 
        success: true, 
        todos,
        count: todos.length 
      };
    } catch (error) {
      console.error("Full Firestore error:", error);
      return { 
        success: false, 
        error: "Failed to load todos",
        details: error.message 
      };
    }
  };
  */
  export const getAllTodo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todo")); // Match web app
      
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      return { 
        success: true, 
        todos,
        status: 200  // Match web app's response format
      };
    } catch (error) {
      console.error("Error:", error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };
  /**
   * Update a todo document
   */
  export const updateTodo = async (id, data) => {
    try {
      if (!id) throw new Error('Document ID is required');
      
      await updateDoc(doc(db, "todo", id), data);
      return { success: true };
    } catch (error) {
      console.error(ERROR_MESSAGES.UPDATE, error);
      return { 
        success: false, 
        error: ERROR_MESSAGES.UPDATE,
        details: error.message 
      };
    }
  };
  
  /**
   * Delete a todo document
   */
  export const deleteTodo = async (id) => {
    try {
      if (!id) throw new Error('Document ID is required');
      
      await deleteDoc(doc(db, "todo", id));
      return { success: true };
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE, error);
      return { 
        success: false, 
        error: ERROR_MESSAGES.DELETE,
        details: error.message 
      };
    }
  };