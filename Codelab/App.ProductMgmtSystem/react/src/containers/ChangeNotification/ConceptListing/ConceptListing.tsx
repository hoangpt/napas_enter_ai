import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'helpers/i18n';
import { conceptListHooks } from 'hooks';
import { IConcept } from 'interfaces';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';
import { Link } from 'react-router-dom';

const { useConceptListData } = conceptListHooks;

const ConceptListing: React.FC = () => {
  const {
    conceptList,
    fetching,
    pagination,
    handleTableChange,
  } = useConceptListData({
    page: 1,
    pageSize: 10,
  });

  const columns: ColumnsType<IConcept> = [
    {
      title: 'ID',
      width: 70,
      render: (name, record, index) => {
        return (
          <>
            {index +
              1 +
              (pagination?.current ? pagination?.current - 1 : 0) *
                (pagination?.pageSize ? pagination?.pageSize : 1)}
          </>
        );
      },
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      render: (name: string, record) => {
        return (
          <Link to={`/automotive-insight/concept/${record.id}`}>{name}</Link>
        );
      },
    },
    {
      title: t('Related Part Count'),
      dataIndex: 'relatedPartCount',
    },
    {
      title: t('Author'),
      dataIndex: 'author',
    },
    {
      title: t('Email'),
      dataIndex: 'email',
    },
    {
      title: t('Date'),
      dataIndex: 'createdAt',
    },
  ];

  return (
    <AppContainer title={t('Change Design History')}>
      <ContentBlock
        title={
          <span className="text-h3">
            {t('TotalRecords')}: {pagination.total || 0}
          </span>
        }
      >
        <Table
          bordered
          rowKey="id"
          columns={columns}
          loading={fetching}
          dataSource={conceptList.map((concept, index) => {
            return {
              ...concept,
              key: index,
            };
          })}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </ContentBlock>
    </AppContainer>
  );
};

export default ConceptListing;
