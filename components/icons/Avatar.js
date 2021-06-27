export default function Avatar({ className }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      className={className}
    >
      <mask
        id="mask__beam"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" fill="white" rx="72"></rect>
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="36" height="36" fill="#f2f26f"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(8 0) rotate(334 18 18) scale(1.1)"
          fill="#95cfb7"
          rx="6"
        ></rect>
        <g transform="translate(4 -1) rotate(-4 18 18)">
          <path
            d="M15 20c2 1 4 1 6 0"
            stroke="black"
            fill="none"
            strokeLinecap="round"
          ></path>
          <rect
            x="10"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="black"
          ></rect>
          <rect
            x="24"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="black"
          ></rect>
        </g>
      </g>
    </svg>
  );
}
