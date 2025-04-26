const webpack = require('webpack'); 
module.exports = function override(config) { 
    // Add aliases for browser polyfills
    config.resolve.alias = {
      ...config.resolve.alias,
      "crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url")
    };

    // Add plugins for process and Buffer
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]);

    // Make sure these packages get included
    config.resolve.modules = [...(config.resolve.modules || []), 'node_modules'];
    
    return config;
}