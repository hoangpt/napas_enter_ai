import React from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';
import './ContentBlock.scss';

export interface ContentBlockProps extends CardProps {
  /**
   * Has divider between title and body?
   */
  hasDivider?: boolean;
}

const ContentBlock: React.FC<ContentBlockProps> = props => {
  const { className, hasDivider, children, ...rest } = props;

  return (
    <Card
      className={classNames({
        'content-block': true,
        'has-divider': hasDivider,
        ...(className && { [className]: true }),
      })}
      bordered={false}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default ContentBlock;
