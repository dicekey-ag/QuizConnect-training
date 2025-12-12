import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // useLocation を追加
import { getQuestionById, getQuestionsByCategoryId, saveUserAnswer } from '../../api/questions';
import './QuestionDetailPage.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ITEMS_PER_PAGE } from '../QuestionsPage/QuestionsPage';  // 追加

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // キャッシュバスター用のstate
  const [imageKey, setImageKey] = useState(Date.now());
  const [imageError, setImageError] = useState(false);
  // QuestionDetailPage.jsの先頭部分に追加
  const [imageLoading, setImageLoading] = useState(true);

  const location = useLocation();
  // location.stateから検索条件とフィルタリングされた問題一覧を取得
  const {
    searchParams,
    filteredQuestions,
    currentPage: originalPage,  // 追加: 元のページ番号
    currentIndex
  } = location.state || {};

  // 両方のファイルで使用する共通のソート関数
  const sortQuestionsByCategory = (questions) => {
    // カテゴリとサブカテゴリから数値を抽出する補助関数
    const extractNumber = (str) => {
      const match = str.match(/\d+(\.\d+)*/);
      return match ? match[0] : '';
    };

    // バージョン番号形式の文字列を比較する関数
    const compareVersionNumbers = (a, b) => {
      const aParts = a.split('.').map(Number);
      const bParts = b.split('.').map(Number);

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aNum = aParts[i] || 0;
        const bNum = bParts[i] || 0;
        if (aNum !== bNum) {
          return aNum - bNum;
        }
      }
      return 0;
    };

    return [...questions].sort((a, b) => {
      // カテゴリの数値を抽出して比較
      const catNumA = extractNumber(a.category);
      const catNumB = extractNumber(b.category);

      if (catNumA !== catNumB) {
        return compareVersionNumbers(catNumA, catNumB);
      }

      // カテゴリが同じ場合、サブカテゴリを比較
      const subNumA = extractNumber(a.subcategory);
      const subNumB = extractNumber(b.subcategory);

      return compareVersionNumbers(subNumA, subNumB);
    });
  };

  // QuestionsPage.jsのfetchData内での使用
  const fetchData = async (params = searchParams) => {
    try {
      const data = await getQuestions(role, params);
      // ...

      // 問題を章とセクションの順番でソート
      const sortedQuestions = data.questions ? sortQuestionsByCategory(data.questions) : [];

      setQuestions(sortedQuestions);
      // ...
    } catch (error) {
      // ...
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await getQuestionById(id);
        console.log('Fetched question:', fetchedQuestion); // デバッグログ
        setQuestion(fetchedQuestion);
        // 画像のキャッシュを強制的に更新
        setImageKey(Date.now());

        // フィルタリングされた問題一覧がある場合はそれを使用
        if (filteredQuestions && filteredQuestions.length > 0) {

          // ランダムモードの場合はそのまま使用
          setCategoryQuestions(filteredQuestions);
          const index = filteredQuestions.findIndex((q) => q.id === Number(id));
          setCurrentQuestionIndex(index);
        } else {
          const categoryId = fetchedQuestion.Category.id;
          const categoryQuestions = await getQuestionsByCategoryId(categoryId);
          const sortedCategoryQuestions = sortQuestionsByCategory(categoryQuestions);
          setCategoryQuestions(sortedCategoryQuestions);
          const index = sortedCategoryQuestions.findIndex((q) => q.id === Number(id));
          setCurrentQuestionIndex(index);
        }


        // 選択肢、正解/不正解の表示、解説の表示をリセット
        setSelectedChoice(null);
        setShowExplanation(false);

        // 問題切り替え時に画面上部へスクロール
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      } catch (error) {
        console.error('Failed to fetch question:', error);
        if (error.response?.status === 401) {
          // 認証エラー（セッション切れ）の場合
          navigate('/login', {
            state: {
              error: 'セッションが切れました。再度ログインしてください。',
              from: `/questions/${id}`  // 元のページを記録
            }
          });
        } else if (error.response?.status === 403) {
          // 権限エラーの場合
          navigate('/questions', {
            state: {
              error: 'この問題にアクセスする権限がありません',
              fromUnauthorized: true
            }
          });
        } else {
          // その他のエラーの場合
          navigate('/questions', {
            state: {
              error: '問題取得に失敗 or セッション切れ(再ログインしてください)'
            }
          });
        }
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id, navigate]);

  if (!question || !question.QuestionChoices) {
    return <div className="loading">Loading...</div>;
  }

  const handleChoiceSelect = async (choiceId) => {
    setSelectedChoice(choiceId);
    setShowExplanation(true);

    // ユーザーの回答を保存
    try {
      await saveUserAnswer(question.id, choiceId);
      // 正解の場合のみ解説までスクロール
      const isCorrect = question.QuestionChoices.find(choice => choice.id === choiceId)?.is_correct;
      if (isCorrect) {
        setTimeout(() => {
          const explanationElement = document.querySelector('.explanation');
          if (explanationElement) {
            const windowHeight = window.innerHeight;
            const explanationRect = explanationElement.getBoundingClientRect();
            const scrollTo = window.pageYOffset + explanationRect.top - (windowHeight * 0.2);
            window.scrollTo({ top: scrollTo, behavior: 'smooth' });
          }
        }, 300);
      }
    } catch (error) {
      console.error('Failed to save user answer:', error);
    }
  };

  const isCorrectChoice = selectedChoice && question.QuestionChoices.find(
    (choice) => choice.id === selectedChoice
  )?.is_correct;

  const handlePrevQuestion = () => {
    // 前の問題に遷移する処理を追加
    if (categoryQuestions.length === 0) return;
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      const prevQuestionId = categoryQuestions[prevIndex].id;
      navigate(`/questions/${prevQuestionId}`, {
        state: {
          searchParams,
          filteredQuestions: categoryQuestions,
          currentIndex: prevIndex
        }
      });
      // 画面上部へのスクロール処理を追加
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNextQuestion = () => {
    if (categoryQuestions.length === 0) return;
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < categoryQuestions.length) {
      const nextQuestionId = categoryQuestions[nextIndex].id;
      navigate(`/questions/${nextQuestionId}`, {
        state: {
          searchParams,
          filteredQuestions: categoryQuestions,
          currentIndex: nextIndex
        }
      });
      // 画面上部へのスクロール処理を追加
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const handleGoBack = () => {
    navigate('/questions', {
      state: {
        fromQuestionDetail: true,
        searchParams,
        filteredQuestions: categoryQuestions,
        selectedQuestionId: question.id,
        currentPage: originalPage || Math.floor(currentQuestionIndex / ITEMS_PER_PAGE) + 1
      }
    });
  };

  // 以前の未使用のコードを削除し、正しい位置にハンドラー関数を定義
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
    console.log('Image loaded successfully:', question?.image_url);
  };

  const handleImageError = (e) => {
    setImageLoading(false);
    setImageError(true);
    console.error('Image load error:', question?.image_url);
    e.target.style.display = 'none';
  };


  return (
    <div className="question-detail-page">
      <div className="question-detail-container">

        <div className="navigation-container top-navigation">
          <button
            className="nav-button prev"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            aria-label="Previous question"
          >
            <FaArrowLeft />
            <span className="button-text">前</span>
          </button>
          <button onClick={handleGoBack} className="back-button">一覧へ</button>
          <button
            className="nav-button next"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === categoryQuestions.length - 1}
            aria-label="Next question"
          >
            <span className="button-text">次</span>
            <FaArrowRight />
          </button>
        </div>

        <div className="category-header">
          <div className="category-info">
            <span className="category-label">カテゴリ:</span>
            <span className="category-value">{question.Category.name}</span>
          </div>
          <div className="category-separator"></div>
          <div className="category-info">
            <span className="category-label">サブカテゴリ:</span>
            <span className="category-value">{question.Subcategory.name}</span>
          </div>
        </div>

        <p>{question.statement}</p>
        {/* 画像の表示を追加 */}
        {question.image_url && question.image_url !== 'null' && !imageError && (
          <div className="question-image">
            <img
              key={imageKey}
              src={`${question.image_url}?v=${Date.now()}`} // タイムスタンプでキャッシュ制御
              alt="Question illustration"
              className="question-image__img"
              onError={(e) => {
                console.error('Image load error for URL:', question.image_url);
                setImageError(true);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', question.image_url);
                setImageError(false);
              }}
            />
          </div>
        )}

        <div className="choices">
          {question.QuestionChoices.map((choice, index) => (
            <button
              key={choice.id}
              className={`choice ${selectedChoice === choice.id ? 'selected' : ''}
              ${selectedChoice && choice.is_correct ? 'correct' : ''}`}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={selectedChoice !== null}
            >
              {`${String.fromCharCode(65 + index)}. ${choice.choice_text}`}
            </button>
          ))}
        </div>
        {selectedChoice && (
          <div className={`result ${isCorrectChoice ? 'correct' : 'incorrect'}`}>
            {isCorrectChoice ? '正解です！' : '不正解です。'}
          </div>
        )}
        {showExplanation && (
          <div className="explanation">
            <h2>解説</h2>
            <p>{question.explanation}</p>
          </div>
        )}
        {showExplanation && (
          <div className="navigation-container bottom-navigation">
            <button
              className="nav-button prev small"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              aria-label="Previous question"
            >
              <FaArrowLeft />
              <span className="button-text">前</span>
            </button>
            <button onClick={handleGoBack} className="back-button small">一覧へ</button>
            <button
              className="nav-button next small"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === categoryQuestions.length - 1}
              aria-label="Next question"
            >
              <span className="button-text">次</span>
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
