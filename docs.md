---
theme: gaia
class: lead
---

# VOICEVOXは外部から叩けるAPIがある

<!--
VOICEVOXにはAPIがあります。
-->

---

# OpenAPIのドキュメントが用意されてる

<a href="http://localhost:50021/docs" target="_blank" rel="noopener">http://localhost:50021/docs</a>

※ VOICEVOXが起動している必要があります

<!--
しかも、オープンAPI形式のドキュメントが用意されています。
ドキュメントは、VOICEVOXが起動していればWebブラウザでも見れます。
-->

---

# APIクライアントが自動生成できる

<!--
オープンAPIドキュメントがあるということは、つまり、APIクライアントを自動生成できるのです。
-->

---

# TypeScriptでやってみる

<a href="https://github.com/tnantoka/voide" target="_blank" rel="noopener">Voide</a>で使ってる方法

<!--
ということで、タイプスクリプトでやってみます。いろいろな方法があると思いますが、ボイドではこの方法を使っています。
-->

---

# プロジェクトを作る

```
$ mkdir voicevox-openapi-ts
$ cd voicevox-openapi-ts 
$ npm init -y
```

<!--
それではやっていきます。まずはプロジェクトを作ります。
-->

---

# ライブラリを入れる

```
$ npm i -D \
    ts-node \
    typescript \
    @openapitools/openapi-generator-cli \
    axios
```

<!--
必要なライブラリを入れます。
-->

---

# OpenAPI Generatorのバージョン指定

<a href="https://github.com/VOICEVOX/voicevox/blob/main/openapitools.json" target="_blank" rel="noopener">本家</a>に合わせて5系を使う

```
$ npx openapi-generator-cli version-manager set 5.4.0
```

<!--
APIクライアントを生成する時に、ジェネレーターのバージョンが最新の6系だとエラーになったので、本家と合わせて5系にしています。
-->

---

# VOICEVOX起動

```
$ ~/path/to/VOICEVOX.app/Contents/MacOS/run
```

など

<!--
クライアントを生成するためにはオープンAPIドキュメントにアクセスできる必要があるので、VOICEVOXを起動します。
Macならこんな感じでGUIなしで起動できます。普通にアプリを起動してももちろんOKです。
-->

---

# クライアント生成 

```
$ npx openapi-generator-cli generate \
    -g typescript-axios \
    -o openapi \
    -i http://localhost:50021/openapi.json
```

<!--
では、生成します。
-->

---

# できた

```
$ tree openapi 
openapi
├── api.ts
├── base.ts
├── common.ts
├── configuration.ts
├── git_push.sh
└── index.ts
```

<!--
無事、生成されました。
-->

---

# クライアントを使ってみる

<!--
生成されたクライアントを使ってみます。
-->

---

# 音声ライブラリ一覧 (1)

```
// index.ts
import { DefaultApi } from './openapi';

const basePath = 'http://localhost:50021';
export const api = new DefaultApi(undefined, basePath);

(async () => {
  const { data: speakers } = await api.speakersSpeakersGet();
  const names = speakers
    .map(({ name }) => name)
    .join(', ');
  console.log(names);
})();
```

<!--
音声ライブラリの一覧を表示します。
-->

---

# 音声ライブラリ一覧 (2)

```
$ npx ts-node index.ts 
四国めたん, ずんだもん, 春日部つむぎ, 雨晴はう, 波音リツ,
玄野武宏, 白上虎太郎, 青山龍星, 冥鳴ひまり, 九州そら,
もち子さん, 剣崎雌雄, WhiteCUL, 後鬼, No.7
```

<!--
ちゃんと取得できていますね。
-->

---

# 動いた :tada:

<!--
というわけで動きました！
-->

---

# しゃべらせてみる (1)

```
// index.ts
import fs from 'fs';

import { DefaultApi } from './openapi';

const basePath = 'http://localhost:50021';
export const api = new DefaultApi(undefined, basePath);
```

<!--
最後に喋らせてみたいと思います。
-->

---


# しゃべらせてみる (2)

```
(async () => {
  const speakerId = 0; // 四国めたん (あまあま)
  const { data: query } = await api.audioQueryAudioQueryPost(
    'こんにちは',
    speakerId
  );

  const { data: wav } = await api.synthesisSynthesisPost(
    speakerId,
    query,
    undefined,
    undefined,
    { responseType: 'arraybuffer' }
  );
  fs.writeFileSync('test.wav', Buffer.from(wav));
})();
```

<!--
クエリーを作った後、シンセサイズに渡します。
-->

---

# しゃべってる

<audio controls src="test.wav"></audio>

<!--
ちゃんとしゃべってます！
-->

---

# VOICEVOX便利 :thumbsup:

<!--
VOICEVOX、便利ですね。
-->

---

# ありがとうございました

<!--
最後までお付き合い、ありがとうございました。
-->

---

# ソースコードはこちらです

<a href="https://github.com/tnantoka/voicevox-openapi-ts" target="_blank" rel="noopener">https://github.com/tnantoka/voicevox-openapi-ts</a>

<!--
ソースコードはこちらにあります。
-->
