import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion, uploadQuestionsCsv } from '../../api/questions';
import './QuestionCreatePage.css';
import api from '../../api'; // api をインポート

const QuestionCreatePage = () => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    statement: '',
    difficulty: '',
    access_level: '',
    explanation: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [csvFile, setCsvFile] = useState(null);

  const difficulties = ['easy', 'medium', 'hard', 'K1', 'K2', 'K3', 'K4'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
    // input要素をリセットするためにvalueを空にする
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleCorrectChoiceChange = (e) => {
    setCorrectChoice(parseInt(e.target.value, 10));
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'カテゴリを入力してください';
    }

    if (!formData.subcategory.trim()) {
      newErrors.subcategory = 'サブカテゴリを入力してください';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    }

    if (!formData.statement.trim()) {
      newErrors.statement = '問題文を入力してください';
    }

    if (!formData.difficulty.trim()) {
      newErrors.difficulty = '難易度を入力してください';
    }

    if (!formData.access_level) {
      newErrors.access_level = 'アクセスレベルを選択してください';
    }

    if (!formData.explanation.trim()) {
      newErrors.explanation = '解説を入力してください';
    }

    // 選択肢の検証を追加
    if (!validateChoices()) {
      newErrors.choices = '選択肢を正しく入力してください';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();

        // 基本データの追加
        for (const [key, value] of Object.entries(formData)) {
          formDataToSend.append(key, value);
        }

        // 選択肢の検証
        if (correctChoice === null) {
          setErrors(prev => ({
            ...prev,
            choices: '正解を選択してください'
          }));
          return;
        }

        // 選択肢データの処理
        const choicesData = choices.map((choice, index) => ({
          choice_text: choice.trim(),
          is_correct: index === correctChoice
        }));

        // 選択肢の検証
        if (choicesData.some(choice => !choice.choice_text)) {
          setErrors(prev => ({
            ...prev,
            choices: '全ての選択肢を入力してください'
          }));
          return;
        }

        // 選択肢データをJSON文字列として追加
        formDataToSend.append('choices', JSON.stringify(choicesData));

        // 画像の追加（画像サイズの検証付き）
        if (image) {
          if (image.size > 5 * 1024 * 1024) { // 5MB制限
            setErrors(prev => ({
              ...prev,
              image: '画像サイズは5MB以下にしてください'
            }));
            return;
          }
          formDataToSend.append('image', image);
        }

        // デバッグログの追加
        console.log('Sending form data:', {
          formData: Object.fromEntries(formDataToSend.entries()),
          choicesData,
          hasImage: !!image,
          imageSize: image?.size
        });

        // エラーメッセージをクリア
        setErrors({});

        // APIリクエストを送信
        const response = await api.post('/questions', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          // タイムアウトを設定
          timeout: 30000
        });

        console.log('Question created successfully:', response.data);
        navigate('/admin/questions');
      } catch (error) {
        console.error('Failed to create question:', error);

        // エラーメッセージの詳細な処理
        const errorMessage = error.response?.data?.message
          || error.message
          || 'Failed to create question. Please try again.';

        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));

        // エラーの詳細をコンソールに出力
        if (error.response) {
          console.error('Error response:', {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers
          });
        }
      }
    }
  };

  // 選択肢の入力検証を追加
  const validateChoices = () => {
    const hasEmptyChoice = choices.some(choice => !choice.trim());
    const hasNoCorrectChoice = correctChoice === null;

    if (hasEmptyChoice || hasNoCorrectChoice) {
      setErrors(prev => ({
        ...prev,
        choices: hasEmptyChoice ? '全ての選択肢を入力してください' : '正解を選択してください'
      }));
      return false;
    }
    return true;
  };

  const handleCsvFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      alert('Please select a CSV file');
      return;
    }
    const formData = new FormData();
    formData.append('file', csvFile);
    try {
      const result = await uploadQuestionsCsv(formData);
      console.log('CSV upload result:', result);
      alert(result.message || 'Questions uploaded successfully');
      navigate('/admin/questions');
    } catch (error) {
      console.error('Failed to upload questions', error);
      alert(`Failed to upload questions: ${error.response?.data?.message || error.message}`);
    }
  };

  const uploadQuestionsCsv = async (formData) => {
    try {
      // アップロード前にFormDataの内容を確認
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await api.post('/questions/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading CSV:', error);
      throw error;
    }
  };






  return (
    <div className="question-create-page">
      <h1>Create Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
          {errors.subcategory && <span className="error">{errors.subcategory}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="statement">Statement:</label>
          <textarea
            id="statement"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            rows="10"
            style={{ whiteSpace: 'pre-wrap' }}  // この行を追加
          ></textarea>
          {errors.statement && <span className="error">{errors.statement}</span>}
        </div>


        <div className="form-group">
          <label htmlFor="image">Question Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />
              <button
                type="button"
                onClick={handleImageDelete}
                className="image-delete-button"
              >
                画像を削除
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select difficulty</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
          {errors.difficulty && <span className="error">{errors.difficulty}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="access_level">Access Level:</label>
          <select
            id="access_level"
            name="access_level"
            value={formData.access_level}
            onChange={handleChange}
          >
            <option value="">Select access level</option>
            <option value="unauthorized">Unauthorized</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            {/* <option value="admin">Admin</option> */}
          </select>
          {errors.access_level && <span className="error">{errors.access_level}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="explanation">Explanation:</label>
          <textarea
            id="explanation"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            style={{ whiteSpace: 'pre-wrap' }}  // この行を追加
          ></textarea>
          {errors.explanation && <span className="error">{errors.explanation}</span>}
        </div>

        <div>
          <label>Choices:</label>
          {choices.map((choice, index) => (
            <div key={index}>
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Correct Choice:</label>
          <select value={correctChoice} onChange={handleCorrectChoiceChange}>
            <option value={null}>Select correct choice</option>
            {choices.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Question</button>
      </form>

      {/* CSV アップロードフォーム */}
      <h2>Upload Questions from CSV</h2>
      <form onSubmit={handleCsvUpload}>
        <input type="file" accept=".csv" onChange={handleCsvFileChange} />
        <button type="submit">Upload CSV</button>
      </form>


    </div>
  );
};

export default QuestionCreatePage;
