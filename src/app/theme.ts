// theme.ts
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontWeightMedium: 500,
        fontFamily: 'var(--font-dm-sans)',
        h1: {
            fontSize: '2.5rem',
            lineHeight: 1.25,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        h2: {
            fontSize: '2rem',
            lineHeight: 1.25,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        h3: {
            fontSize: '1.75rem',
            lineHeight: 1.25,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        h4: {
            fontSize: '1.5rem',
            lineHeight: 1.2,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        h5: {
            fontSize: '1.25rem',
            lineHeight: 1.2,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        h6: {
            fontSize: '1rem',
            lineHeight: 1.2,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
        subtitle1:{
            fontSize: '1.25rem',
            lineHeight:1.5,
            fontWeight:400
        },
        subtitle2: {
            fontSize: '0.875rem',
            lineHeight: 1.2,
            fontWeight: 500,
            overflowWrap: 'break-word',
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    body1: 'p',
                    body2: 'p',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'DM Sans Variable';
          src: url('/fonts/DMSans[opsz,wght].woff2') format('woff2-variations');
          font-weight: 125 950;
          font-stretch: 75% 125%;
          font-style: normal;
          font-display: swap;
        }

        body {
          font-family: 'DM Sans Variable', 'DM Sans', Arial, sans-serif;
        }
      `,
        },
    },
});

export default theme;
