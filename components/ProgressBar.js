import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ProgressBar({ total, current }) {
  return (
    <Slider
      startPoint={0}
      max={total}
      value={current}
      trackStyle={{
        backgroundColor: '#A78BFA',
        height: 5,
        borderRadius: '5px',
      }}
      handleStyle={{
        display: 'none',
      }}
      railStyle={{
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        height: 5,
      }}
    />
  );
}
