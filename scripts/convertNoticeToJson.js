const fs = require('fs');
const path = require('path');

// プロジェクトのルートディレクトリを取得
const projectRoot = path.resolve(__dirname, '..');

// noticeファイルのパスを指定（プロジェクトルートからの相対パス）
const noticePath = path.join(projectRoot, 'notice');

// 出力するJSONファイルのパスを指定
const outputPath = path.join(projectRoot, 'frontend', 'public', 'open-source-licenses.json');

// noticeファイルが存在するか確認
if (!fs.existsSync(noticePath)) {
  console.error(`Error: notice file not found at ${noticePath}`);
  process.exit(1);
}

// noticeファイルを読み込む
const noticeContent = fs.readFileSync(noticePath, 'utf8');

// ライセンス情報を抽出する正規表現
const licenseRegex = /------------------------\n([\s\S]*?)\n------------------------/g;

// ライセンス情報を解析する関数
function parseLicenseInfo(licenseText) {
  const lines = licenseText.split('\n');
  const info = {};

  lines.forEach(line => {
    if (line.startsWith('License:')) {
      info.license = line.replace('License:', '').trim();
    } else if (line.startsWith('Source:')) {
      info.source = line.replace('Source:', '').trim();
    } else if (line.startsWith('Copyright')) {
      info.copyright = line.trim();
    } else if (!info.name) {
      info.name = line.trim();
    }
  });

  // ライセンステキストを抽出
  info.licenseText = licenseText;

  return info;
}

// ライセンス情報を抽出してJSONに変換
const licenses = [];
let match;
while ((match = licenseRegex.exec(noticeContent)) !== null) {
  const licenseInfo = parseLicenseInfo(match[1]);
  licenses.push(licenseInfo);
}

// JSONファイルに書き込む
fs.writeFileSync(outputPath, JSON.stringify(licenses, null, 2));

console.log(`Converted ${licenses.length} licenses to JSON. Output saved to ${outputPath}`);
