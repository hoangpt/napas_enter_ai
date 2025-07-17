module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-create-react-app',
      options: {
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
    {
      name: '@storybook/preset-ant-design',
      options: {
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
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: ['./src/styles/variables.scss', './src/App.scss'],
          },
        },
      ],
    });

    // Return the altered config
    return config;
  },
};
