import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ProgressBar({ total, current, color, height }) {
  return (
    <Slider
      startPoint={0}
      max={total}
      value={current}
      trackStyle={{
        backgroundColor: color ?? '#A78BFA',
        height: height ?? 5,
        borderRadius: '99px',
      }}
      handleStyle={{
        display: 'none',
      }}
      railStyle={{
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        height: height ?? 5,
      }}
    />
  );
}
