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
        <svg width="40" height="80" viewBox="0 0 231 224" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d)">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="7" y="0" width="217" height="217">
              <rect x="7" width="217" height="217" fill="#F7FAFC" />
            </mask>
            <g mask="url(#mask0)">
              <path d="M50.6359 22.6042H177.121L205.917 144.667H25.0833L50.6359 22.6042Z" fill="white" />
              <path d="M50.6359 22.6042H177.121L205.917 144.667H25.0833L50.6359 22.6042Z" fill="url(#paint0_linear)" />
              <path
                d="M25.0833 144.667H205.917V171.792C205.917 184.276 195.796 194.396 183.313 194.396H47.6875C35.2036 194.396 25.0833 184.276 25.0833 171.792V144.667Z"
                fill="white"
              />
              <path
                d="M25.0833 144.667H205.917V171.792C205.917 184.276 195.796 194.396 183.313 194.396H47.6875C35.2036 194.396 25.0833 184.276 25.0833 171.792V144.667Z"
                fill="url(#paint1_linear)"
              />
              <g filter="url(#filter1_i)">
                <path d="M67.4907 40.6875H165.517L187.833 144.667H47.6875L67.4907 40.6875Z" fill="#C3DAFE" />
                <circle cx="115.5" cy="126.583" r="36.1667" fill="#C3DAFE" />
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0.0833282"
              y="1.60425"
              width="230.833"
              height="221.792"
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
              x="47.6875"
              y="30.6875"
              width="150.146"
              height="132.063"
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
              <feOffset dx="10" dy="-10" />
              <feGaussianBlur stdDeviation="25" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
            <linearGradient
              id="paint0_linear"
              x1="115.5"
              y1="144.667"
              x2="115.5"
              y2="194.396"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="115.5"
              y1="144.667"
              x2="115.5"
              y2="194.396"
              gradientUnits="userSpaceOnUse"
            >
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
