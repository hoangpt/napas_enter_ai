import React from 'react';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'helpers/i18n';
import { conceptHooks } from 'hooks';
import { IPart } from 'interfaces';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';
import ctp from 'assets/images/CTP.png';

const { useConceptData } = conceptHooks;

const ConceptDetail: React.FC = () => {
  const { concept, fetching, handleTableChange } = useConceptData({
    page: 1,
    pageSize: 10,
  });

  const columns: ColumnsType<IPart> = [
    {
      title: t('Related Part'),
      dataIndex: 'name',
      render: (name: string, record) => {
        return <div className="text-link cursor-pointer">{name}</div>;
      },
    },
    {
      title: t('Person In Charge'),
      dataIndex: 'pic',
    },
    {
      title: t('Email'),
      dataIndex: 'email',
    },
    {
      title: t('Related Departments'),
      dataIndex: 'department',
    },
    {
      title: t('Related Design Guides'),
      dataIndex: 'document',
    },
  ];

  return (
    <AppContainer title={t('Concept Detail')}>
      <ContentBlock>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={6} className="text-bold">
                {t('Name')}:
              </Col>
              <Col span={18}>{concept?.name}</Col>
              <Col span={6} className="text-bold">
                {t('Related Part Count')}:
              </Col>
              <Col span={18}>{concept?.relatedPartCount}</Col>
              <Col span={6} className="text-bold">
                {t('Author')}:
              </Col>
              <Col span={18}>{concept?.author}</Col>
              <Col span={6} className="text-bold">
                {t('Date')}:
              </Col>
              <Col span={18}>{concept?.createdAt}</Col>
              <Col span={6} className="text-bold">
                {t('Description')}:
              </Col>
              <Col span={18}></Col>
            </Row>
          </Col>

          <Col span={12}>
            <img
              style={{
                width: 320,
              }}
              src={ctp}
              alt="detail"
            />
          </Col>
        </Row>
      </ContentBlock>
      <ContentBlock title={t('Related Parts')} className="my-base">
        <Table
          bordered
          rowKey="id"
          columns={columns}
          loading={fetching}
          dataSource={concept?.relatedParts?.map((part, index) => {
            return {
              ...part,
              key: index,
            };
          })}
          pagination={false}
          onChange={handleTableChange}
        />
      </ContentBlock>
    </AppContainer>
  );
};

export default ConceptDetail;
