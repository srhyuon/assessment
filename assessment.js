'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = function() {
    const userName = userNameInput.value;
    if(userName.length === 0) {
        return;
    }
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = result;
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.append(script);
}
const answers = [
    '{username}のいいところは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{username}のいいところはまなざしです。{username}に見つめられた人は、気になって仕方がないでしょう。',
    '{username}のいいとろこは情熱です。{username}の情熱に周りの人は感化されます。',
    '{username}のいいところは厳しさです。{username}の厳しさがものごとをいつも成功に導きます。',
    '{username}のいいところは知識です。博識な{username}を多くの人が頼りにしています。',
    '{username}のいいところはユニークさです。{username}だけのその特徴が皆を楽しくさせます。',
    '{username}のいいところは用心深さです。{username}の洞察に、多くの人が助けられます。',
    '{username}のいいところは見た目です。内側から溢れ出る{username}の良さに皆が気を惹かれます。',
    '{username}のいいところは決断力です。{username}がする決断にいつも助けられる人がいます。',
    '{username}のいいところは思いやりです。{username}に気をかけてもらった多くの人が感謝しています。',
    '{username}のいいところは感受性です。{username}fが感じたことに皆が共感し、わかりあうことができます。',
    '{username}のいいところは節度です。強引すぎない{username}の考えに皆が感謝しています。',
    '{username}のいいところは好奇心です。新しいことに向かっていく{username}の心構えが多くの人に魅力的に映ります。',
    '{username}のいいところは気配りです。{username}の配慮が多くの人を救っています。',
    '{username}のいいところはその全てです。ありのままの{username}自身がいいところなのです。',
    '{username}のいいところは自制心です。やばいと思った時にしっかりと衝動を抑えられる{username}が皆から評価されています。',
    '{username}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i=0; i<userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    // コード番号の合計を回答の数で割って添字の数値を決める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{username\}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
console.assert(
    assessment('太郎') === assessment('太郎'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)

