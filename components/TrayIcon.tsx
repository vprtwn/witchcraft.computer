import { Link, Box, Flex } from 'theme-ui';

const TrayIcon = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        alignItems: 'stretch',
        alignContent: 'stretch',
        // background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
        // backgroundSize: '400% 400%',
        // animation: 'gradient 10s ease infinite',
      }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Link href="/">
        <svg width="60" height="90" viewBox="0 0 110 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d)">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="19" y="14" width="72" height="72">
              <rect x="19" y="14" width="72" height="72" fill="#F7FAFC" />
            </mask>
            <g mask="url(#mask0)">
              <path d="M33.4783 21.5H75.4457L85 62H25L33.4783 21.5Z" fill="white" />
              <path d="M33.4783 21.5H75.4457L85 62H25L33.4783 21.5Z" fill="url(#paint0_linear)" />
              <path
                d="M25 62H85V71C85 75.1421 81.6421 78.5 77.5 78.5H32.5C28.3579 78.5 25 75.1421 25 71V62Z"
                fill="white"
              />
              <path
                d="M25 62H85V71C85 75.1421 81.6421 78.5 77.5 78.5H32.5C28.3579 78.5 25 75.1421 25 71V62Z"
                fill="url(#paint1_linear)"
              />
              <g filter="url(#filter1_i)">
                <path d="M39.0707 27.5H71.5954L79 62H32.5L39.0707 27.5Z" fill="#C3DAFE" />
                <circle cx="55" cy="56" r="12" fill="#C3DAFE" />
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0.5"
              width="110"
              height="107"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="12.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <filter
              id="filter1_i"
              x="32.5"
              y="7.5"
              width="76.5"
              height="60.5"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="30" dy="-20" />
              <feGaussianBlur stdDeviation="30" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
            <linearGradient id="paint0_linear" x1="55" y1="62" x2="55" y2="78.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="55" y1="62" x2="55" y2="78.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
      <Box sx={{ flexGrow: 1 }} />
    </Flex>
  );
};
export default TrayIcon;
