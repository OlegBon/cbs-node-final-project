module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-modules-commonjs',  // цей плагін перетворює імпорти
  ],
};
