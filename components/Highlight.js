import { RoughNotation } from 'react-rough-notation';

export default function Highlight({ children, delay, color }) {
  /** Change the animation duration depending on length of text
   *  we're animating (speed = distance / time)
   * const animationDuration = Math.floor(30 * children.length);
   */

  return (
    <RoughNotation
      type="highlight"
      show={true}
      color={color}
      animationDuration={1000}
      animationDelay={delay}
      padding={[2, 4]}
    >
      {children}
    </RoughNotation>
  );
}
