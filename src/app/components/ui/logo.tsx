export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 2"
      viewBox="0 0 301.75 269.74"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1={-5.5}
          x2={304.82}
          y1={271.23}
          y2={0.63}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#f20a0a" />
          <stop offset={1} stopColor="#f2195c" />
        </linearGradient>
      </defs>
      <path
        fill="url(#a)"
        strokeWidth={0}
        d="M301.75 0v269.74H180.67V98.59h91.71V43.37h-85.71c-10.26 0-20.2 3.78-27.88 10.6l-22.31 19.86a42.82 42.82 0 0 1-28.44 10.81c-5.24 0-10.41-.96-15.24-2.79-4.8-1.83-9.33-4.52-13.23-8.02L57.26 53.97a42 42 0 0 0-27.88-10.6v55.22h135.46c-.09 6.48-1.58 12.76-4.21 18.5a45.4 45.4 0 0 1-11.9 15.55l-10.1 8.52a45.41 45.41 0 0 0-16.11 34.67v93.91H0V0z"
        data-name="Layer 1"
      />
    </svg>
  );
}
