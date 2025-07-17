import React, { useState } from 'react';
import { Form, Row, Col, Button, InputNumber, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { t } from 'helpers/i18n';
import { IRelatedPartFilters } from 'interfaces';
import commonConstants from 'constants/common';

const { LAYOUT_RELATED, DIMENSION_RELATED, MATERIAL_RELATED } = commonConstants;

interface RelatedPartFilterProps {
  filters: IRelatedPartFilters;
  setFilters: (filters: IRelatedPartFilters) => void;
}

const RelatedPartFilter: React.FC<RelatedPartFilterProps> = props => {
  const { filters, setFilters } = props;
  const [form] = Form.useForm();

  const [listRelation, setListRelation] = useState<string[]>([]);

  const relationValueMap = (relation: string) => {
    switch (relation) {
      case LAYOUT_RELATED:
        return ['dimensionValue', 'materialValue'];
      case DIMENSION_RELATED:
        return ['layoutValue', 'materialValue'];
      case MATERIAL_RELATED:
        return ['layoutValue', 'dimensionValue'];
      default:
        return ['layoutValue', 'materialValue', 'dimensionValue'];
    }
  };

  const onSelectRelation = (relation: string) => {
    if (listRelation.includes(relation)) {
      setListRelation(listRelation.filter(item => item !== relation));
      form.resetFields(relationValueMap(''));
    } else {
      setListRelation([relation]);
      form.resetFields(relationValueMap(relation));
    }
  };

  const onFinish = (values: IRelatedPartFilters) => {
    const { layoutValue, dimensionValue, materialValue } = values;
    const newFilters = {
      page: filters.page,
      pageSize: filters.pageSize,
      name: filters.name,
      relation: listRelation[0],
      ...(layoutValue && { layoutValue }),
      ...(dimensionValue && { dimensionValue }),
      ...(materialValue && { materialValue }),
    };
    setFilters(newFilters);
  };

  return (
    <Form
      data-testid="form-filter"
      form={form}
      onFinish={onFinish}
      className="py-base with-divider"
    >
      <Row gutter={16}>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8}>
              <Button
                type={
                  listRelation.includes(LAYOUT_RELATED) ? 'primary' : 'default'
                }
                onClick={() => onSelectRelation(LAYOUT_RELATED)}
              >
                {t('Position')}
              </Button>
            </Col>
            <Col span={16}>
              <Form.Item name="layoutValue">
                <InputNumber
                  placeholder={t('Reposition')}
                  addonAfter="mm"
                  disabled={
                    listRelation.includes(LAYOUT_RELATED) ? false : true
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type={
                  listRelation.includes(DIMENSION_RELATED)
                    ? 'primary'
                    : 'default'
                }
                onClick={() => onSelectRelation(DIMENSION_RELATED)}
              >
                {t('Dimension')}
              </Button>
            </Col>
            <Col span={15}>
              <Form.Item name="dimensionValue">
                <InputNumber
                  placeholder={t('Resize')}
                  addonAfter="mm"
                  disabled={
                    listRelation.includes(DIMENSION_RELATED) ? false : true
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8}>
              <Button
                type={
                  listRelation.includes(MATERIAL_RELATED)
                    ? 'primary'
                    : 'default'
                }
                onClick={() => onSelectRelation(MATERIAL_RELATED)}
              >
                {t('Material')}
              </Button>
            </Col>
            <Col span={16}>
              <Form.Item name="materialValue">
                <Select
                  placeholder={t('Select Material')}
                  style={{ width: '100%' }}
                  disabled={
                    listRelation.includes(MATERIAL_RELATED) ? false : true
                  }
                >
                  <Select.Option value="spc">SPC</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={6} className="d-flex justify-content-end">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="btnCustomize"
          >
            {t('Query Impact')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RelatedPartFilter;
