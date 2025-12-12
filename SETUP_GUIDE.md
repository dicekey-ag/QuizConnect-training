## 必要なもの

- Windows PC（Windows 10/11）
- インターネット接続
- 管理者権限

## ステップ1：Docker Desktopのインストール
### 1-1. Docker Desktopをダウンロード

1. 以下のURLにアクセス：
```
   https://www.docker.com/products/docker-desktop/
```

2. 「Download for Windows(AMD64) 」ボタンをクリック

3. ダウンロードした `Docker Desktop Installer.exe` をダブルクリック

### 1-2. インストール

1. 「OK」をクリック（デフォルト設定でOK）
2. インストール完了後、「Close and restart」をクリック
3. PCが再起動します

### 1-3. Docker Desktopの起動

1. デスクトップの「Docker Desktop」アイコンをダブルクリック
2. 利用規約が表示されたら「Accept」をクリック
3. アンケートはスキップしてOK
4. Docker Desktopが起動するまで待つ（2-3分）

**確認方法**：
- 画面下部にアイコンが表示されればOK
- 「Docker Desktop running」と表示されていればOK

---

## ステップ2：QuizConnectのダウンロード

### 2-1. GitHubからダウンロード

1. 以下のURLにアクセス：
```
   https://github.com/dicekey-ag/QuizConnect-training
```
2. 緑色の「Code」ボタンをクリック

3. 「Download ZIP」をクリック

4. ダウンロードした `QuizConnect-training-main.zip` を確認

### 2-2. ZIPファイルを解凍

1. ダウンロードフォルダで `QuizConnect-training-main.zip` を右クリック

2. 「すべて展開」をクリック

3. 展開先を選択（例：`C:\Users\あなたの名前\Desktop\`）

4. 「展開」をクリック

5. `QuizConnect-training-main` フォルダができる

---

## ステップ3：アプリの起動

### 3-1. PowerShellを開く

1. `QuizConnect-training-main` フォルダを選択して「右クリック」

2. 「PowerShellウィンドウをここで開く」をクリック
   - または「ターミナルで開く」でもOK

### 3-2. Dockerで起動

PowerShellに以下をコピー＆貼り付けて Enter：
```powershell
docker-compose up -d
```

**初回は時間がかかります（5-10分）**
- イメージのダウンロードが始まります
- 「done」と表示されるまで待ちます

```powershell
docker-compose P
```
以下の3つがUPになっているか確認

quizconnect-training-main-backend-1    Up

quizconnect-training-main-db-1         Up

quizconnect-training-main-frontend-1   Up

### 3-3. データベースの初期設定

以下のコマンドを順番に実行：
powershell
### マイグレーション（テーブル作成）

### 全データ削除＆再構築
```powershell
docker-compose exec backend npx sequelize-cli db:migrate
---

```powershell

docker-compose exec backend npx sequelize-cli db:seed --seed 202411201956-create-users2.js
---

### 上手くいかない場合は、全削除してから再度作成
docker-compose exec backend npx sequelize-cli db:migrate:undo:all
docker-compose exec backend npx sequelize-cli db:migrate
docker-compose exec backend npx sequelize-cli db:seed --seed 202411201956-create-users2.js


### ステップ4：アプリにアクセス

1. ブラウザ（Chrome推奨）を開く

2. 以下のURLにアクセス：
   http://localhost:3000

3. ログイン画面が表示されればOK！


### ステップ5：Docker Desktopで起動確認（GUI）

### 5-1. Docker Desktopを開く

1. Docker Desktopのアイコンをクリック

2. 左メニューの「Containers」をクリック

3. 以下の3つのコンテナが「Running」になっていればOK：
   - ✅ `quizconnect-training-frontend`
   - ✅ `quizconnect-training-backend`
   - ✅ `quizconnect-training-db`

### 5-2. ログを確認（トラブルシューティング）

- コンテナ名をクリック
- 「Logs」タブでエラーメッセージを確認


### アプリの停止方法

### 方法1：PowerShellで停止
```powershell
docker-compose down
```

### 方法2：Docker Desktop GUIで停止

1. Docker Desktopを開く
2. 「Containers」タブ
3. `quizconnect-training` の横にある「停止」ボタン（⏹）をクリック

