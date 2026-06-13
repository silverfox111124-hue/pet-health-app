(function () {
  if (typeof screens === "undefined" || typeof render !== "function") return;

  if (!screens.guide) {
    screens.guide = function () {
      return `
        ${topbar("使い方")}
        <main class="stack guide">
          <section class="section">
            <h2>このアプリについて</h2>
            <p>ペットの毎日の様子を記録して、動物病院で見せやすくするためのノートです。</p>
            <p>病気の診断や治療の判断はできません。気になることは動物病院に相談してください。</p>
          </section>
          <section class="section">
            <h2>今日の記録</h2>
            <p>ホームの「今日の記録をする」から、食事、おやつ、排泄、体重、お世話、体調メモを入力できます。</p>
            <p>入力したら「記録を保存する」を押してください。「記録しました ✓」と出れば保存できています。</p>
          </section>
          <section class="section">
            <h2>食事とおやつ</h2>
            <p>食事の時間は「＋ 食事時間を追加」で複数登録できます。直接入力を選ぶと、7:30、18:30、寝る前などを書けます。</p>
            <p>おやつは回数と量を記録できます。量は選択式で、必要な時だけ直接入力できます。</p>
          </section>
          <section class="section">
            <h2>記録を見る</h2>
            <p>ホームの「記録を見る」から、これまでの記録を見られます。間違えた時は「編集」で直せます。</p>
            <p>記録を消す時は確認が出ます。消すと元に戻せないため、心配な場合は先にバックアップを保存してください。</p>
          </section>
          <section class="section">
            <h2>体重グラフ</h2>
            <p>体重を2回以上記録すると、体重グラフが表示されます。</p>
          </section>
          <section class="section">
            <h2>病院で見せる</h2>
            <p>最近7日間の記録、最近30日間の体重、食事や排泄の変化、気になるメモをまとめて表示します。</p>
            <p>8日前より前の記録も消えていません。「記録を見る」から確認できます。</p>
          </section>
          <section class="section">
            <h2>設定</h2>
            <p>ペット基本情報、記録に出す項目、色、背景写真、バックアップを設定できます。</p>
            <p>背景写真はこのスマホの中だけで使われます。バックアップには入りません。</p>
          </section>
          <section class="section">
            <h2>バックアップ</h2>
            <p>大事な記録は、設定画面の「バックアップを保存する」で定期的に保存してください。</p>
            <p>機種変更前や、古い記録を消す前にも保存しておくと安心です。</p>
          </section>
        </main>
      `;
    };
  }

  const originalHome = screens.home;
  screens.home = function () {
    const html = originalHome();
    if (html.includes('data-go="guide"')) return html;
    return html.replace(
      "</div>\n      </main>",
      `${homeButton("guide", "使い方")}\n        </div>\n      </main>`
    );
  };

  if (currentScreen === "home") render("home");
})();
