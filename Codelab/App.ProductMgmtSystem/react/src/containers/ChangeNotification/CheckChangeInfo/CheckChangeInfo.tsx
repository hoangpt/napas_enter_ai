import React, { useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'helpers/i18n';
import { partHooks } from 'hooks';
import { IPart } from 'interfaces';
import AppContainer from 'containers/AppLayout/AppContainer';
import ContentBlock from 'components/shared/ContentBlock';
import PartFilter from 'components/PartFilter';
import ChangeInfoModal from '../ChangeInfoModal';
import ctp from 'assets/images/CTP.png';
import ctpStiff from 'assets/images/ctp-stiff.png';

const { usePartData } = partHooks;

const CheckChangeInfo: React.FC = () => {
  const {
    parts,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  } = usePartData({ page: 1, pageSize: 10 });

  const [isChangeInfoModalOpen, setIsChangeInfoModalOpen] = useState<boolean>(
    false
  );
  const [selectedPart, setSelectedPart] = useState<IPart | null>(null);

  const handleOpenChangeInfoModal = (record: IPart) => {
    setIsChangeInfoModalOpen(true);
    setSelectedPart(record);
  };

  const rowClassName = (record: IPart) => {
    return record.key === selectedPart?.key ? 'ant-table-row-selected' : '';
  };

  const columns: ColumnsType<IPart> = [
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
      dataIndex: 'name_en',
      render: (name: string, record) => {
        return (
          <div
            className="text-link cursor-pointer"
            onClick={() => setSelectedPart(record)}
          >
            {name}
          </div>
        );
      },
    },
    {
      title: t('Part Number'),
      dataIndex: 'code',
    },
    {
      title: t('Project'),
      render: () => {
        return <>{filters.project}</>;
      },
    },
  ];

  return (
    <AppContainer title={t('Search Part')}>
      <ContentBlock className="mb-base">
        <PartFilter filters={filters} setFilters={setFilters} />
      </ContentBlock>
      <Row gutter={16}>
        <Col span={12}>
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
              dataSource={parts.map((part, index) => {
                return {
                  ...part,
                  key: index,
                };
              })}
              pagination={pagination}
              onChange={handleTableChange}
              rowClassName={rowClassName}
            />
            {isChangeInfoModalOpen && (
              <ChangeInfoModal
                selectedPart={selectedPart}
                isChangeInfoModalOpen={isChangeInfoModalOpen}
                setIsChangeInfoModalOpen={setIsChangeInfoModalOpen}
              />
            )}
          </ContentBlock>
        </Col>
        <Col span={12}>
          <ContentBlock
            style={{ minHeight: 291 }}
            title={<span className="text-h2">{t('Part Details')}</span>}
          >
            <Row>
              <Col span={6} className="text-bold">
                {t('Name')}:
              </Col>
              <Col span={6}>
                {selectedPart?.name_en ? selectedPart.name_en : '-'}
              </Col>
            </Row>
            <Row>
              <Col span={6} className="text-bold">
                {t('Project')}:
              </Col>
              <Col span={6}>{selectedPart ? filters.project : '-'}</Col>
            </Row>
            <div className="text-bold">{t('Description')}</div>
            {selectedPart && (
              <img
                style={{
                  width: selectedPart?.name_en === 'CTR-PLR' ? 300 : 500,
                }}
                src={selectedPart?.name_en === 'CTR-PLR' ? ctp : ctpStiff}
                alt="detail"
              />
            )}
            {selectedPart && (
              <Row className="my-base">
                <Col span={24} className="d-flex justify-content-end">
                  <Button
                    type="primary"
                    className="btnCustomize mx-base"
                    onClick={() => handleOpenChangeInfoModal(selectedPart)}
                  >
                    {t('Change Design Notification')}
                  </Button>
                  {/* <Tooltip title="Under Connstruction">
                    <Button type="default" className="btnCustomize">
                      {t('Graph Visualize')}
                    </Button>
                  </Tooltip> */}
                </Col>
              </Row>
            )}
          </ContentBlock>
        </Col>
      </Row>
    </AppContainer>
  );
};

export default CheckChangeInfo;
