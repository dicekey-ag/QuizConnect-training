import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getQuestions, deleteQuestion } from '../../api/questions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './QuestionsPage.css';

// ページネーションの定数を外部に定義して、他のコンポーネントでも使えるようにエクスポート
export const ITEMS_PER_PAGE = 10;


const QuestionPage = () => {
  const { isAuthenticated, role } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ストレージ選択のヘルパー関数を作成
  const getStorage = () => isAuthenticated ? localStorage : sessionStorage;

  const [searchParams, setSearchParams] = useState(() => {
    const storage = getStorage();
    const savedParams = storage.getItem('searchParams');
    return savedParams ? JSON.parse(savedParams) : {
      category: '',
      subcategory: '',
      difficulty: '',
      status: '' // 新しく追加
    };
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(location.state?.error || '');

  // 既存のstate宣言に追加
  const [randomQuestionCount, setRandomQuestionCount] = useState(() => {
    const storage = getStorage();
    const savedCount = localStorage.getItem('randomQuestionCount');
    return savedCount ? Number(savedCount) : 10;
  });
  // randomQuestionsのstate追加
  const [isRandomMode, setIsRandomMode] = useState(() => {
    const storage = getStorage();
    return storage.getItem('isRandomMode') === 'true';
  });
  // originalQuestionsを追加
  const [originalQuestions, setOriginalQuestions] = useState([]);


  // ページネーション用の計算
  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / ITEMS_PER_PAGE);
  const indexOfLastQuestion = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // フィルタリングされたサブカテゴリのための新しいstate
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // locationから戻ってきた時の状態を確認
  useEffect(() => {
    if (location.state?.fromQuestionDetail) {
      const { searchParams, filteredQuestions, selectedQuestionId, currentPage: savedPage } = location.state;

      const handleStateRestore = async () => {
        try {
          // 検索パラメータとフィルタリングされた問題の復元
          if (searchParams) {
            setSearchParams(searchParams);
          }
          if (filteredQuestions) {
            setQuestions(filteredQuestions);
          }

          // ページ番号の設定
          if (savedPage) {
            setCurrentPage(savedPage);
          }

          // スクロールとハイライトの処理
          if (selectedQuestionId) {
            // DOMの更新を待つため、少し遅延を入れる
            setTimeout(() => {
              const element = document.getElementById(`question-${selectedQuestionId}`);
              if (element) {
                // スクロール位置の計算を改善
                const questionList = document.querySelector('.question-list');
                const elementRect = element.getBoundingClientRect();
                const containerRect = questionList?.getBoundingClientRect() || { top: 0 };

                // 親要素からの相対位置を計算
                const relativeTop = elementRect.top - containerRect.top;

                // スクロール位置を設定（コンテナの高さの1/4の位置に表示）
                if (questionList) {
                  questionList.scrollTop = relativeTop - (questionList.clientHeight / 4);
                }

                // メインスクロールも調整
                window.scrollTo({
                  top: window.scrollY + elementRect.top - window.innerHeight / 4,
                  behavior: 'smooth'
                });

                // ハイライト効果の追加
                element.classList.add('highlight-question');
                element.addEventListener('animationend', () => {
                  element.classList.remove('highlight-question');
                }, { once: true });
              }
            }, 100);
          }
        } catch (error) {
          console.error('Error restoring state:', error);
        }
      };

      handleStateRestore();
    }
  }, [location.state]);


  const fetchData = async (params = searchParams) => {
    try {
      const data = await getQuestions(role, params);
      const storage = isAuthenticated ? localStorage : sessionStorage;
      console.log('Fetched data:', data);

      // 検索結果が0件の場合の処理
      if (data.questions?.length === 0) {
        console.log('No questions found with current search parameters');
      }

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

      // 問題を章とセクションの順番でソート
      const sortedQuestions = data.questions ? [...data.questions].sort((a, b) => {
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
      }) : [];

      // ここからランダムモードの処理を修正
      const isRandomModeActive = storage.getItem('isRandomMode') === 'true';
      if (isRandomModeActive && !location.state?.fromRandomClear) { // クリア後のフラグをチェック
        let questionsToUse = sortedQuestions;
        const savedRandomQuestions = JSON.parse(storage.getItem('randomQuestions'));
        const savedRandomIds = JSON.parse(storage.getItem('randomQuestionIds'));

        if (savedRandomQuestions) {
          // 保存されているランダム問題のIDリストを取得
          const randomIds = savedRandomQuestions.map(q => q.id);
          // 最新のステータスを持つ問題から、ランダム選択された問題のみをフィルタリング
          const updatedRandomQuestions = sortedQuestions
            .filter(q => randomIds.includes(q.id))
            // 元の順序を維持
            .sort((a, b) => randomIds.indexOf(a.id) - randomIds.indexOf(b.id));

          setQuestions(updatedRandomQuestions);
          // 更新された問題リストを保存
          storage.setItem('randomQuestions', JSON.stringify(updatedRandomQuestions));
        } else if (savedRandomIds) {
          // 後方互換性のための処理
          const randomQuestions = sortedQuestions
            .filter(q => savedRandomIds.includes(q.id))
            .sort((a, b) => savedRandomIds.indexOf(a.id) - savedRandomIds.indexOf(b.id));
          setQuestions(randomQuestions);
          // 更新された問題リストを保存
          storage.setItem('randomQuestions', JSON.stringify(randomQuestions));
        } else {
          setQuestions(sortedQuestions);
        }
      } else {
        setQuestions(sortedQuestions);
      }

      setOriginalQuestions(sortedQuestions); // オリジナルの問題リストを保存
      setCategories(data.categories || []);
      setSubcategories(data.subcategories || []);
      // 初期表示時のフィルタリングされたサブカテゴリを設定
      setFilteredSubcategories(
        params.category
          ? (data.subcategories || []).filter(sub => sub.category_id === Number(params.category))
          : data.subcategories || []
      );
      setDifficulties(data.difficulties || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setQuestions([]);
      setOriginalQuestions([]);
      setCategories([]);
      setSubcategories([]);
      setFilteredSubcategories([]);
      setDifficulties([]);
    }
  };


  useEffect(() => {
    fetchData();
  }, [role]); // role が変更されたときだけ再取得4


  useEffect(() => {
    // ブラウザの戻るボタンで戻ってきた場合の処理
    const handlePopState = () => {
      const savedParams = localStorage.getItem('searchParams');
      if (savedParams) {
        const parsedParams = JSON.parse(savedParams);
        setSearchParams(parsedParams);
        fetchData(parsedParams);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSearchChange = async (e) => {
    const { name, value } = e.target;
    const newSearchParams = { ...searchParams, [name]: value };
    const storage = getStorage();  // 正しいストレージを取得

    // カテゴリが変更された場合
    if (name === 'category') {
      // カテゴリが選択されていない場合は全てのサブカテゴリを表示
      if (!value) {
        setFilteredSubcategories(subcategories);
      } else {
        // 選択されたカテゴリに関連するサブカテゴリをフィルタリング
        const filtered = subcategories.filter(sub => sub.category_id === Number(value));
        setFilteredSubcategories(filtered);
      }
      // カテゴリ変更時にサブカテゴリの選択をリセット
      newSearchParams.subcategory = '';
    }

    setSearchParams(newSearchParams);
    storage.setItem('searchParams', JSON.stringify(newSearchParams));

    // 即時検索を実行
    try {
      setCurrentPage(1); // ページを1に戻す
      await fetchData(newSearchParams);
    } catch (error) {
      console.error('Error searching questions:', error);
      setQuestions([]);
    }
  };


  const handleEditQuestion = (questionId) => {
    navigate(`/questions/${questionId}/edit`);
  };

  const handleDeleteQuestion = async (questionId) => {
    const isConfirmed = window.confirm('この問題を削除してもよろしいですか？');
    if (isConfirmed) {
      try {
        await deleteQuestion(questionId);
        await fetchData();
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleReset = () => {
    const storage = isAuthenticated ? localStorage : sessionStorage;
    const defaultParams = {
      category: '',
      subcategory: '',
      difficulty: '',
      status: ''
    };
    setSearchParams(defaultParams);
    storage.setItem('searchParams', JSON.stringify(defaultParams));
    setQuestions(originalQuestions); // オリジナルの問題リストに戻す
    fetchData(defaultParams);
  };

  const handleSearch = async () => {
    try {
      const storage = getStorage();  // 正しいストレージを取得
      storage.setItem('searchParams', JSON.stringify(searchParams));  // localStorage を変更
      setCurrentPage(1); // ページを1に戻す
      await fetchData(searchParams);
      // const data = await getQuestions(role, searchParams);
      // console.log('Search results:', data);  // デバッグ用
      // setQuestions(data.questions || []);
      // setCategories(data.categories || []);
      // setSubcategories(data.subcategories || []);
      // setDifficulties(data.difficulties || []);
    } catch (error) {
      console.error('Error searching questions:', error);
      setQuestions([]);
    }
  };

  // ページ移動処理
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // ページ上部にスクロール
  };




  // ランダム問題選択のハンドラー
  const handleRandomQuestions = () => {
    const storage = isAuthenticated ? localStorage : sessionStorage;
    const randomlySelectedQuestions = [...originalQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, randomQuestionCount);

    // ランダムに選択された問題を現在の問題リストとして設定
    setQuestions(randomlySelectedQuestions);
    setCurrentPage(1); // ページを1に戻す


    // ランダムモードの状態を保存
    setIsRandomMode(true);
    storage.setItem('isRandomMode', 'true');
    storage.setItem('randomQuestionCount', randomQuestionCount.toString());
    // ランダムに選択された問題のIDを保存
    storage.setItem('randomQuestionIds', JSON.stringify(randomlySelectedQuestions.map(q => q.id)));
    // ランダムな問題の完全な状態を保存
    storage.setItem('randomQuestions', JSON.stringify(randomlySelectedQuestions));
  };


  // 既存のコードに以下の関数を追加
  const handleRandomClear = () => {
    const storage = isAuthenticated ? localStorage : sessionStorage; // storage変数を定義
    // オリジナルの問題リストに戻す（検索条件は維持）
    setQuestions(originalQuestions);
    setCurrentPage(1);
    setIsRandomMode(false);
    storage.removeItem('isRandomMode');
    storage.removeItem('randomQuestionIds');
    storage.removeItem('randomQuestionCount');
    storage.removeItem('randomQuestions');
    // 現在の問題リストをオリジナルの状態で保存
    storage.setItem('currentQuestions', JSON.stringify(originalQuestions));
    // クリアフラグを追加
    storage.setItem('fromRandomClear', 'true'); // 追加
  };

  // 検索パラメータが設定されているかチェックする関数を追加
  const hasActiveFilters = () => {
    return searchParams.category !== '' ||
      searchParams.subcategory !== '' ||
      searchParams.difficulty !== '' ||
      searchParams.status !== '';
  };


  // ページネーションコントロールのレンダリング
  const renderPaginationControls = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    // 最大5ページ分のボタンを表示
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }


    return (
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ≪
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ＜
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          ＞
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          ≫
        </button>
      </div>
    );
  };

  return (
    <div className="question-page">
      <h1 className="question-page-title">問題一覧</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="search-form">
        <select name="category" onChange={handleSearchChange} value={searchParams.category}>
          <option value="">全てのカテゴリ</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <select name="subcategory" onChange={handleSearchChange} value={searchParams.subcategory}>
          <option value="">全てのサブカテゴリ</option>
          {filteredSubcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
        <select name="difficulty" onChange={handleSearchChange} value={searchParams.difficulty}>
          <option value="">全ての難易度</option>
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
        <select name="status" onChange={handleSearchChange} value={searchParams.status}>
          <option value="">全ての状態</option>
          <option value="correct">正解</option>
          <option value="incorrect">不正解</option>
          <option value="unattempted">未着手</option>
        </select>
        <button
          onClick={handleReset}
          className={`${hasActiveFilters() ? 'active' : ''}`}
        >
          リセット
        </button>
        <div className="random-select-controls">
          <select
            value={randomQuestionCount}
            onChange={(e) => {
              const newCount = Number(e.target.value);
              setRandomQuestionCount(newCount);
              localStorage.setItem('randomQuestionCount', newCount.toString());
              if (isRandomMode) {
                // ランダムモード中に問題数が変更された場合は、新しい数でランダム選択を実行
                const newRandomQuestions = [...originalQuestions]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, newCount);
                setQuestions(newRandomQuestions);
                localStorage.setItem('randomQuestionIds', JSON.stringify(newRandomQuestions.map(q => q.id)));
              }
            }}
          >
            <option value={10}>10問</option>
            <option value={20}>20問</option>
            <option value={30}>30問</option>
            <option value={40}>40問</option>
            <option value={50}>50問</option>
          </select>
          <button onClick={handleRandomQuestions}>ランダム出題</button>
          <button
            onClick={handleRandomClear}
            className={`${isRandomMode ? 'active' : ''}`}
          >クリア
          </button>
        </div>
      </div>






      {renderPaginationControls()}
      <div className="pagination-info">
        全{totalQuestions}件中 {indexOfFirstQuestion + 1}-
        {Math.min(indexOfLastQuestion, totalQuestions)}件を表示
      </div>


      <div className="question-list">
        {currentQuestions.length > 0 ? (
          <>
            {currentQuestions.map((question, index) => (
              <div
                key={question.id}
                id={`question-${question.id}`}
                className="question-item"
              >
                <h2 className="question-title">{question.title}</h2>
                <div className="question-details">
                  <p className="question-category">カテゴリ: {question.category}</p>
                  <p className="question-subcategory">サブカテゴリ: {question.subcategory}</p>
                  <p className="question-difficulty">難易度: {question.difficulty}</p>
                  {isAuthenticated && (
                    <p className={`question-status ${question.status === '正解' ? 'status-correct' :
                      question.status === '不正解' ? 'status-incorrect' :
                        'status-unattempted'
                      }`}>
                      {question.status || '未着手'}
                    </p>
                  )}
                </div>
                <Link
                  to={`/questions/${question.id}`}
                  state={{
                    searchParams,
                    filteredQuestions: questions,
                    currentIndex: index,
                    currentPage: currentPage
                  }}
                  className="question-start-btn"
                >
                  スタート
                </Link>
                {isAuthenticated && role === 'admin' && (
                  <div className="question-actions">
                    <button className="question-edit-btn" onClick={() => handleEditQuestion(question.id)}>
                      編集
                    </button>
                    <button className="question-delete-btn" onClick={() => handleDeleteQuestion(question.id)}>
                      削除
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="no-results">
            <p>検索条件に一致する問題が見つかりませんでした。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
