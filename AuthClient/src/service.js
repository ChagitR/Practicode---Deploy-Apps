import axios from 'axios';

// הגדרת כתובת ברירת מחדל
axios.defaults.baseURL = "https://localhost:7066";

// הוספת interceptor לתפיסת שגיאות ב-response
axios.interceptors.response.use(
  (response) => {
    // אם התקבל response בהצלחה, החזרתו כפי שהוא
    return response;
  },
  (error) => {
    // אם התקבלה שגיאה ב-response, רישום ללוג
    console.error('Error in response interceptor:', error);

    // החזרת השגיאה לטובת המשך עיבוד
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/items');
      return result.data;
    } catch (error) {
      // טיפול בשגיאה במקום הקריאה לפונקציה
      console.error('Error getting tasks:', error);
      throw error; // הזרקת השגיאה למשך עיבוד
    }
  },

  addTask: async (name) => {
    let item = { "Name": name, "IsComplete": false };
    try {
      await axios.post("/items", item);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },
  
  deleteTask: async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      return true; // הצלחה
    } catch (error) {
      console.error('Error deleting task:', error);
      return false; // כישלון
    }
  },

  setCompleted: async (task, isComplete) => {
    try {
      await axios.put(`/items/${task.id}`, { Name: task.name, IsComplete: isComplete });
      return true; // הצלחה
    } catch (error) {
      console.error('Error updating task completion:', error);
      return false; // כישלון
    }
  },
};
