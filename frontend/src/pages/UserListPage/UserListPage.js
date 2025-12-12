import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUsers, changeUserRole, deleteUser } from '../../api/users';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        setError('ユーザー情報の取得に失敗しました');
        setLoading(false);
      }
    };

    if (role === 'admin') {
      fetchUsers();
    } else {
      setError('このページにアクセスする権限がありません');
      setLoading(false);
    }
  }, [role]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoading(true);
      await changeUserRole(userId, newRole);
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);

      setLoading(false);
    } catch (error) {
      console.error('Error changing user role:', error);
      setError('ロールの変更に失敗しました');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    // ユーザー情報を取得して確認メッセージに含める
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const isConfirmed = window.confirm(
      `ユーザー「${user.username}」を削除してもよろしいですか？\nこの操作は取り消せません。`
    );

    if (isConfirmed) {
      try {
        setLoading(true);
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        setLoading(false);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('ユーザーの削除に失敗しました');
        setLoading(false);
      }
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;
  if (role !== 'admin') return <div>アクセス権限がありません</div>;

  return (
    <div className="user-list-page">
      <h1>ユーザー一覧</h1>
      {error && <div className="error-message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>ロール</th>
            <th>作成日</th>
            <th>更新日</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td data-label="ID">{user.id}</td>
              <td data-label="ユーザー名">{user.username}</td>
              <td data-label="メールアドレス">{user.email}</td>
              <td data-label="ロール">{user.role}</td>
              <td data-label="作成日">{new Date(user.createdAt).toLocaleString()}</td>
              <td data-label="更新日">{new Date(user.updatedAt).toLocaleString()}</td>
              <td data-label="アクション">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => handleDeleteUser(user.id)} className="delete-button">削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
