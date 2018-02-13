exports.config = {
  serviceWorker: {
    swSrc: 'src/sw.js',
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpeg}'
    ],
    globIgnores: [
      'build/app/svg/*.js',
      'build/app/*.es5.js'
    ]
  },
  globalStyle: 'src/global/app.css'
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
