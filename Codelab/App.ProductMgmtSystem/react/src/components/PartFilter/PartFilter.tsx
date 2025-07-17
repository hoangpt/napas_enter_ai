import React from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { t } from 'helpers/i18n';
import { IPartFilters } from 'interfaces';

interface PartFilterProps {
  filters: IPartFilters;
  setFilters: (filters: IPartFilters) => void;
}

const PartFilter: React.FC<PartFilterProps> = props => {
  const { filters, setFilters } = props;
  const [form] = Form.useForm();
  const onFinish = (values: IPartFilters) => {
    const { name, project } = values;
    const newFilters = {
      page: 1,
      pageSize: filters.pageSize,
      ...(name && { name }),
      ...(project && { project }),
    };
    setFilters(newFilters);
  };

  return (
    <Form data-testid="form-filter" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="project">
            <Select placeholder={t('Select Project')}>
              <Select.Option value="3GJ">3GJ</Select.Option>
              <Select.Option value="9TF">9TF</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" className="mb-0">
            <Input
              data-testid="name"
              autoFocus
              allowClear
              placeholder={t('Search Part')}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="btnCustomize"
          >
            {t('Search')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PartFilter;
