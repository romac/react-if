module.exports = {
  plugins: [require('daisyui')],
  purge: [
    //
    './index.html',
    './index.css',
    './index.tsx',
    './components/**/*.tsx'
  ],
  darkMode: 'media',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: '#5865f2',
          'primary-focus': '#313ef2',
          'primary-content': '#ffffff',
          secondary: '#ed4245',
          'secondary-focus': '#f61e21',
          'secondary-content': '#000000',
          accent: '#57f287',
          'accent-focus': '#0bea52',
          'accent-content': '#000000',
          neutral: '#1f2123',
          'neutral-focus': '#0e0f10',
          'neutral-content': '#ffffff',
          'base-100': '#2c2f33',
          'base-200': '#212123',
          'base-300': '#0e0f10',
          'base-content': '#ffffff',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724'
        }
      }
    ]
  }
};
