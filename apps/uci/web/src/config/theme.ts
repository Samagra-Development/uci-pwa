export const theme_styles = {
    textStyles: {
        small: {
            fontSize: '10px',
            lineHeight: '16px',
        },
        medium: {
            fontSize: '16px',
            lineHeight: '20px',
        },
        large: {
            fontSize: '20px',
            lineHeight: '24px',
        },
    },
    margin: {
        none: '0px',
        small: '4px',
        medium: '10px',
        large: '16px',
    },
    padding: {
        none: '0px',
        small: '4px',
        medium: '7px',
        large: '10px',
    },
    width: {
        none: '0px',
        small: '40px',
        medium: '95px',
        large: '299px',
    },
    modal: {
        bgColor: 'blackAlpha.300',
        backdropFilter: 'blur(10px) hue-rotate(90deg)',
    },
    image: {
        width: 220,
        height: 220,
    },
    case_image: {
        width: 290,
        height: 200,
    },
};

export const dark_theme = {
    name: 'dark',
    innerBackground: '#1A202C',
    background: '#2D3748',
    color: '#E5E7EB',
    fontSize: '18px',
    mainBackground:
        'radial-gradient(at left bottom, #374151, #111827, #000000)',
    iconColor: 'white',
    boxShadow: 'none',
};

export const light_theme = {
    name: 'light',
    innerBackground: '#e6ecf3',
    color: 'black',
    fontSize: '18px',
    background: '#e6ecf3',
    mainBackground: 'white',
    iconColor: '#121212',
    boxShadow: 'inset 0px 0px 10px 10px #D3D3D3',
};