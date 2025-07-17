/*
 * You can mock AntD components in this file
 */
import React, { SyntheticEvent } from 'react';
import { DropDownProps, PaginationProps, SelectProps, TableProps } from 'antd';
import { OptionProps } from 'rc-select/lib/Option';

interface MockChangeEvent extends SyntheticEvent {
  target: SyntheticEvent['target'] & {
    value?: number | string;
    payload?: object;
  };
}

interface CommonTestProps {
  'data-testid': string;
  children: React.ReactNode;
}

interface MockType {
  dropdown: DropDownProps & CommonTestProps;
  select: SelectProps<number | string> & {
    onChange: (value: number | string) => void;
  } & CommonTestProps;
  table: TableProps<object> & {
    onChange: (pagination: PaginationProps) => void;
  } & CommonTestProps;
}

// Dropdown
jest.mock('antd/lib/dropdown', () => {
  const Dropdown = (props: MockType['dropdown']) => {
    const { overlay, children } = props;

    return (
      <div className="dropdown">
        <div className="dropdown-overlay">{overlay}</div>
        <div className="dropdown-content">{children}</div>
      </div>
    );
  };
  return Dropdown;
});

// Select
jest.mock('antd/lib/select', () => {
  const Select = (props: MockType['select']) => {
    const { 'data-testid': dataTestId, onChange, children } = props;

    return (
      <select data-testid={dataTestId} onChange={e => onChange(e.target.value)}>
        {children}
      </select>
    );
  };

  Select.Option = (props: OptionProps) => {
    const { children, ...rest } = props;

    return <option {...rest}>{children}</option>;
  };
  return Select;
});

// Table
jest.mock('antd/lib/table', () => {
  const OriginalTable = jest.requireActual('antd/lib/table').default;
  const Table = (props: MockType['table']) => {
    const { onChange, ...rest } = props;

    return (
      <div className="table">
        <OriginalTable {...rest} />
        <input
          data-testid="table-changer"
          onChange={(event: MockChangeEvent) => {
            const { pagination } = event.target.payload as {
              pagination: PaginationProps;
            };
            onChange(pagination);
          }}
        />
      </div>
    );
  };
  return Table;
});
