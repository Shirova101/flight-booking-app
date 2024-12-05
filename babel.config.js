const { plugins } = require("./webpack.config");

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript', // Add this line
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
  
};
