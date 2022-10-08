import fs from 'fs';

import { DefaultApi } from './openapi';

const basePath = 'http://localhost:50021';
export const api = new DefaultApi(undefined, basePath);

(async () => {
  const { data: speakers } = await api.speakersSpeakersGet();
  const names = speakers
    .map(({ name }) => name)
    .join(', ');
  console.log(names);

  const speakerId = 0;
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