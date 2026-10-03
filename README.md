# Hatena PARKS Filter (Bookmarklet)

<img width="286" height="361" alt="filter" src="https://github.com/user-attachments/assets/f7d565fc-1815-4a51-a14a-84b223a850fc" />

「Hatena PARKS」向けのフィルタリング用ブックマークレットです。
ページ内のコンテンツを**パーク名**・**スレッド名**・**投稿者**で絞り込んだり、除外（ミュート）したりすることができます。

---

## ✨ 主な機能

- **3つの項目でフィルタリング**
  - **パーク名** (`_parkName_`)
  - **投稿者** (`_authorName_`)
  - **コンテキスト** (`_postContextRow_`)
- **柔軟な動作モード**
  - **OFF**: フィルタを適用しない
  - **絞り込み (include)**: 指定キーワードを含む項目のみ表示
  - **除外 (exclude)**: 指定キーワードを含む項目を非表示
- **複数キーワード対応**
  - カンマ（`,` または `，`）区切りで複数のキーワードを指定可能
- **動的コンテンツ（無限スクロール）対応**
  - `MutationObserver` により、スクロールして追加読み込みされたコンテンツにも自動でフィルタを適用
- **ドラッグ＆ドロップ対応**
  - ヘッダー部分をドラッグすることで、操作パネルを画面上の好きな位置へ移動可能
- **パネルの表示/非表示**: ブックマークレットを再度クリックするか、パネル右上の `✕` ボタンを押します。

---

## 📌 対応ページとフィルター項目

ページの種類によって利用可能なフィルターが異なります。

| フィルター項目 | 対応ページ | 備考・入力例 |
| :--- | :--- | :--- |
| **パーク名** | ・ホーム（注目のスレッド）<br>・新着スレッド | 特定のパーク名で絞り込み・除外を行います。 |
| **投稿者** | ・タイムライン | 投稿者のユーザー名で絞り込み・除外を行います。 |
| **コンテキスト** | ・タイムライン | **「パーク名」** や **「スレッド名」** を入力して使用します。 |

> 💡 **カンマ区切りでの複数指定**  
> キーワード入力欄にカンマ（`,` または `，`）を入れることで、複数のキーワードを同時に指定できます。

### 使用例
<table>
<tr>
<th></th><th>適用前</th><th>絞り込み</th><th>除外</th>
</tr>
<tr>
<td nowrap>ホーム<td><img width="1494" height="1010" alt="home2" src="https://github.com/user-attachments/assets/01b23c2f-c045-4d91-9d78-e42839845696" /></td><td><img width="1494" height="1010" alt="home3" src="https://github.com/user-attachments/assets/bbd7ef67-e227-4440-8859-5f3eda20e772" /></td><td><img width="1494" height="1010" alt="home4" src="https://github.com/user-attachments/assets/c8dd5aad-1838-47d6-afdb-fd5c59debc50" /></td>
</tr>
<tr>
<td nowrap>新着スレッド</td><td><img width="1494" height="1010" alt="new1" src="https://github.com/user-attachments/assets/f8308bcd-e237-40f1-a4a4-c512416b53df" /></td><td><img width="1494" height="1010" alt="new2" src="https://github.com/user-attachments/assets/5cef536a-6f5b-4d0a-bdd1-2e975ff09f87" /></td><td><img width="1494" height="1010" alt="new3" src="https://github.com/user-attachments/assets/b8981afd-0b2b-4634-87a9-467193e3536e" /></td>
</tr>
<tr>
<td nowrap>タイムライン</td><td><img width="1494" height="1010" alt="timeline1" src="https://github.com/user-attachments/assets/3a2c0048-d40e-40d8-b580-ce4dcfe26ab2" /></td><td><img width="1494" height="1010" alt="timeline2" src="https://github.com/user-attachments/assets/2b1c2b46-a2e5-44e2-a422-767b2c155c6c" /></td><td><img width="1494" height="1010" alt="timeline4" src="https://github.com/user-attachments/assets/bdf3626a-b0cf-4761-a18e-6efee24cfe13" /></td>
</tr>
</table>

---

## 🚀 使い方

### 1. ブックマークレットの登録

1. ブラウザのブックマークバーを表示します。
2. 新しいブックマークを追加し、名前を「`PARKS Filter`」（お好みの名前）に設定します。
3. URL欄に、以下のコード（または `filter-bookmarklet.js` の内容）をコピー＆ペーストして保存します。

```javascript
javascript:(async%20function()%7Bvar%20c=%60?t=$%7BDate.now()%7D%60,v=%60https://espio999.github.io/Hatena-PARKS-Filter/panel.html$%7Bc%7D%60,t=%60https://cdn.jsdelivr.net/gh/espio999/Hatena-PARKS-Filter@main/panel.css$%7Bc%7D%60,u=document.createElement(%22script%22);u.src=%60https://cdn.jsdelivr.net/gh/espio999/Hatena-PARKS-Filter@main/panel.js$%7Bc%7D%60;if(c=document.getElementById(%22parks-filter-panel%22))c.style.display=c.style.display===%22none%22?%22block%22:%22none%22;else%7Bdocument.querySelector(%60link%5Bhref=%22$%7Bt%7D%22%5D%60)%7C%7C(c=document.createElement(%22link%22),c.rel=%0A%22stylesheet%22,c.href=t,document.head.appendChild(c));try%7Blet%20g=await%20fetch(v);if(!g.ok)throw%20Error(%22HTML%5Cu306e%5Cu53d6%5Cu5f97%5Cu306b%5Cu5931%5Cu6557%5Cu3057%5Cu307e%5Cu3057%5Cu305f%22);let%20w=await%20g.text(),h=document.createElement(%22div%22);h.id=%22parks-filter-panel%22;h.innerHTML=w;document.body.appendChild(h);document.head.appendChild(u);function%20m(n,d,k)%7Bif(k===%22off%22)return!0;d=d.split(/%5B,%5Cuff0c%5D/).map(e=%3Ee.trim().toLowerCase()).filter(e=%3Ee.length%3E0);if(d.length===0)return!0;d=d.some(e=%3En.includes(e));return%20k===%22include%22?%0Ad:!d%7Dfunction%20p()%7Bvar%20n=document.getElementById(%22pf-park-kw%22).value,d=document.querySelector('input%5Bname=%22pf-park-mode%22%5D:checked').value,k=document.getElementById(%22pf-author-kw%22).value,e=document.querySelector('input%5Bname=%22pf-author-mode%22%5D:checked').value,x=document.getElementById(%22pf-context-kw%22).value,y=document.querySelector('input%5Bname=%22pf-context-mode%22%5D:checked').value,q=new%20Set;document.querySelectorAll('%5Bclass*=%22_parkName_%22%5D,%5Bclass*=%22_authorName_%22%5D,%20%5Bclass*=%22_postContextRow_%22%5D').forEach(b=%3E%0A%7Bvar%20f=q.add;a:%7Blet%20a=b;for(;a&&a!==document.body;)%7Bif(a.tagName===%22LI%22%7C%7Ca.tagName===%22ARTICLE%22%7C%7Ca.className&&typeof%20a.className===%22string%22&&(a.className.includes(%22item%22)%7C%7Ca.className.includes(%22Item%22)))%7Bb=a;break%20a%7Da=a.parentElement%7Db=b.parentElement%7Dreturn%20f.call(q,b)%7D);q.forEach(b=%3E%7Bif(b)%7Bvar%20f=b.querySelector('%5Bclass*=%22_parkName_%22%5D'),a=b.querySelector('%5Bclass*=%22_authorName_%22%5D'),l=b.querySelector('%5Bclass*=%22_postContextRow_%22%5D');a=a?a.textContent.trim().toLowerCase():%22%22;l=l?l.textContent.trim().toLowerCase():%0A%22%22;f=m(f?f.textContent.trim().toLowerCase():%22%22,n,d)&&m(a,k,e)&&m(l,x,y);b.style.display=f?%22%22:%22none%22%7D%7D)%7Dlet%20r=!1;document.getElementById(%22pf-close%22).onclick=()=%3Eh.style.display=%22none%22;document.getElementById(%22pf-apply%22).onclick=p;document.getElementById(%22pf-reset%22).onclick=()=%3E%7Bdocument.getElementById(%22pf-park-kw%22).value=%22%22;document.querySelector('input%5Bname=%22pf-park-mode%22%5D%5Bvalue=%22off%22%5D').checked=!0;document.getElementById(%22pf-author-kw%22).value=%22%22;document.querySelector('input%5Bname=%22pf-author-mode%22%5D%5Bvalue=%22off%22%5D').checked=%0A!0;document.getElementById(%22pf-context-kw%22).value=%22%22;document.querySelector('input%5Bname=%22pf-context-mode%22%5D%5Bvalue=%22off%22%5D').checked=!0;p()%7D;(new%20MutationObserver(()=%3E%7Br%7C%7C(r=!0,requestAnimationFrame(()=%3E%7Bp();r=!1%7D))%7D)).observe(document.body,%7BchildList:!0,subtree:!0%7D)%7Dcatch(g)%7Bconsole.error(%22%5Cu30d5%5Cu30a3%5Cu30eb%5Cu30bf%5Cu30fc%5Cu30d1%5Cu30cd%5Cu30eb%5Cu306e%5Cu30ed%5Cu30fc%5Cu30c9%5Cu30a8%5Cu30e9%5Cu30fc:%22,g)%7D%7D%7D)();
```

> **登録手順例 (Chromeの場合):**
> 1. ブックマークバーを右クリックし、「ページを追加...」を選択します。
> 2. **名前**: `Hatena PARKS フィルタ`（お好みの名前）
> 3. **URL**: 上記のコード（`javascript:...`）を貼り付けて保存します。

### 2. 起動と操作

1. Hatena PARKSのページを開いた状態で、登録したブックマークをクリックします。
2. 画面右上付近に設定パネルが表示されます。
3. 絞り込みたい／除外したいキーワードを入力し、モードを選択して **「適用」** ボタンを押してください。
4. 設定を元に戻す場合は **「リセット」** ボタンを押します。
5. パネルを閉じたい場合は右上の `✕` をクリックするか、再度ブックマークを押してトグル切り替えが可能です。

---

## 📁 リポジトリ構造

```text
.
├── README.md               # 本ドキュメント
├── filter.js               # 開発・可読性用メインロジック
├── filter-bookmarklet.js   # ブックマークレット用に難読化・ワンライナー化したスクリプト
├── panel.html              # 操作パネルのUIテンプレート
├── panel.css               # 操作パネルのスタイル（グラデーション、アニメーション）
└── panel.js                # 操作パネルのドラッグ＆ドロップ機能
```

---

## 📜 ライセンス (License)

本プロジェクトは **GNU General Public License (GPL-3.0)** のもとで公開されています。  
詳細は [LICENSE](./LICENSE) ファイルをご確認ください。
