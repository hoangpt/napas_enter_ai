const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#eb1f3a',
              '@link-color': '#047fff',
              '@success-color': '#53c305',
              '@warning-color': '#f78212',
              '@error-color': '#ed1b23',
              '@font-family': "'Roboto', sans-serif",
              '@layout-body-background': '#ffffff',
              '@text-color': '#333333',
              '@border-radius-base': '4px',
              '@border-color-base': '#e0e0e0',
              '@input-placeholder-color': '#b4b4b4',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'sass-resources-loader',
                options: {
                  // Provide path to the file with resources
                  resources: './src/styles/variables.scss',
                },
              },
            ],
          },
        ],
      },
    },
  },
  jest: {
    configure: {
      setupFilesAfterEnv: ['<rootDir>/src/mockAntd.tsx'],
    },
  },
};
