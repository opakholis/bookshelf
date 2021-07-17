import emoji from 'react-easy-emoji';

export default function Twemoji(input) {
  const _emoji = emoji(input, {
    baseUrl: 'https://twemoji.maxcdn.com/2/svg',
    ext: '.svg',
    size: '',
  });

  return <span className="twemoji">{_emoji}</span>;
}
