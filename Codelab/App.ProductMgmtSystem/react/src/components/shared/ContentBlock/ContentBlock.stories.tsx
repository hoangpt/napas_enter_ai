import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ContentBlock, { ContentBlockProps } from './ContentBlock';

export default {
  title: 'Components/ContentBlock',
  component: ContentBlock,
  parameters: {
    docs: {
      description: {
        component:
          'Wrap content of each block inside this component. You can add title, extra, divider between title and content... for each block usage.',
      },
    },
  },
} as Meta;

const Template: Story<ContentBlockProps> = args => (
  <div style={{ padding: 16, background: '#f5f5f5' }}>
    <ContentBlock {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  extra: (
    <a
      href="https://storybook.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Extra link
    </a>
  ),
  children: 'This is Content Block',
};

export const HasDivider = Template.bind({});
HasDivider.args = {
  ...Default.args,
  hasDivider: true,
};
