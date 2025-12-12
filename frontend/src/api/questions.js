import api from './index';
import axios from 'axios';


export const getQuestions = async (role, searchParams = {}) => {
  try {
    const params = new URLSearchParams();

    if (role === 'admin') {
      params.append('access_level', 'unauthorized,free,paid,admin');
    } else if (role === 'paid') {
      params.append('access_level', 'unauthorized,free,paid');
    } else if (role === 'free') {
      params.append('access_level', 'unauthorized,free');
    } else {
      params.append('access_level', 'unauthorized');
    }

    if (searchParams.category) params.append('category', searchParams.category);
    if (searchParams.subcategory) params.append('subcategory', searchParams.subcategory);
    if (searchParams.difficulty) params.append('difficulty', searchParams.difficulty);
    if (searchParams.status) params.append('status', searchParams.status);

    const response = await api.get(`/questions?${params.toString()}`);
    console.log('Questions response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getSubcategories = async () => {
  try {
    const response = await api.get('/subcategories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subcategories');
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    // FormDataオブジェクトかどうかをチェック
    if (questionData instanceof FormData) {
      const response = await api.put(`/questions/${questionId}`, questionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // 通常のJSONデータとして送信
      const response = await api.put(`/questions/${questionId}`, questionData);
      return response.data;
    }
  } catch (error) {
    console.error('Error updating question:', error);
    throw new Error('Failed to update question');
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    await api.delete(`/questions/${questionId}`);
  } catch (error) {
    throw new Error('Failed to delete question');
  }
};

// ...

export const getQuestionById = async (questionId) => {
  try {
    const response = await api.get(`/questions/${questionId}`, {
      params: {
        include: 'QuestionChoices',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch question');
  }
};

// ...
export const getQuestionsByCategoryId = async (categoryId) => {
  try {
    const response = await api.get(`/questions/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions by category:', error);
    throw error;
  }
};

export const createQuestion = async (formData) => {
  try {
    const response = await api.post('/questions', formData, {
      headers: {
        // FormDataを使用する場合は、Content-Typeをmultipart/form-dataに設定
        // axios は自動的に適切な Content-Type を設定するため、
        // 明示的に設定する必要はありません
        // 'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    // より詳細なエラーメッセージを提供
    throw new Error(
      error.response?.data?.message ||
      'Failed to create question. Please check your input and try again.'
    );
  }
};

// 必要に応じて、画像アップロード用のヘルパー関数を追加
export const uploadQuestionImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/questions/upload-image', formData, {
      headers: {
        // Content-Type は axios が自動的に設定します
      }
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories/all');
    console.log('Fetched categories:', response.data);  // デバッグログを追加
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);  // エラーログを追加
    throw new Error('Failed to fetch categories');
  }
};

export const getAllSubcategories = async () => {
  try {
    const response = await api.get('/subcategories/all');
    console.log('Fetched subcategories:', response.data);  // デバッグログを追加
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);  // エラーログを追加
    throw new Error('Failed to fetch subcategories');
  }
};

export const getDifficulties = async () => {
  try {
    const response = await api.get('/questions/difficulties');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch difficulties');
  }
};

export const saveUserAnswer = async (questionId, choiceId) => {
  try {
    const response = await api.post('/user-answers', { questionId, choiceId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to save user answer');
  }
};

export const uploadQuestionsCsv = async (formData) => {
  try {
    const response = await api.post('/questions/upload-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload questions CSV');
  }
};
