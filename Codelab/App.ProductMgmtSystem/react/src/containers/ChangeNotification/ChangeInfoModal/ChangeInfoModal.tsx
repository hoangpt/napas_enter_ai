import React, { useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'helpers/i18n';
import { relatedPartHooks } from 'hooks';
import { IPart } from 'interfaces';
import RelatedPartFilter from 'components/relatedPartFilter';
import { firestore } from '../../../firebase';
import { addDoc, collection } from '@firebase/firestore';
import moment from 'moment';
import { sendMailServices } from 'services';

const { useRelatedPartData } = relatedPartHooks;

interface ChangeInfoModalProps {
  selectedPart: IPart | null;
  isChangeInfoModalOpen: boolean;
  setIsChangeInfoModalOpen: (state: boolean) => void;
}

const ChangeInfoModal: React.FC<ChangeInfoModalProps> = props => {
  const {
    selectedPart,
    isChangeInfoModalOpen,
    setIsChangeInfoModalOpen,
  } = props;
  const {
    relatedParts,
    filters,
    setFilters,
    fetching,
    handleTableChange,
  } = useRelatedPartData({
    name: selectedPart?.name_en,
    page: 1,
    pageSize: 10,
  });

  const ref = collection(firestore, 'changeDesignHistory');

  const dataSource = relatedParts.map((part, index) => {
    return {
      ...part,
      key: index,
      pic: part.person?.name,
      email: part.person?.mail,
    };
  });

  const columns: ColumnsType<IPart> = [
    {
      title: t('Related Part'),
      dataIndex: 'name_en',
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
  const [loading] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleCancel = () => {
    setIsChangeInfoModalOpen(false);
  };

  const groupByEmail = (
    data: { name: string; email: string }[]
  ): { email: string; partNames: string[] }[] => {
    const groups: {
      [email: string]: { email: string; partNames: string[] };
    } = {};

    for (const item of data) {
      const { name, email } = item;

      if (groups[email]) {
        groups[email].partNames.push(name);
      } else {
        groups[email] = { email, partNames: [name] };
      }
    }

    return Object.values(groups);
  };

  const handleSendMail = () => {
    const filteredSendMailList = dataSource
      .filter(item => selectedRowKeys.includes(item.key))
      .map(item => {
        return {
          name: item.name_en,
          email: item.person?.mail ?? '',
        };
      });
    sendMailServices.sendMails(groupByEmail(filteredSendMailList));

    const part = {
      ...selectedPart,
      name: selectedPart?.name_en ?? '' + ' ' + filters?.relation ?? '',
      date: moment().format('YYYY-MM-DD HH:mm'),
    };
    const data = {
      part: part,
      relatedParts: dataSource.map(item => {
        return {
          ...item,
          mailStatus: selectedRowKeys.includes(item.key) ? true : false,
        };
      }),
    };

    try {
      addDoc(ref, data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsChangeInfoModalOpen(false);
    }
  };

  return (
    <Modal
      title={<div className="text-h1">{selectedPart?.name_en}</div>}
      open={isChangeInfoModalOpen}
      width={1200}
      footer={null}
      onCancel={handleCancel}
    >
      <RelatedPartFilter filters={filters} setFilters={setFilters} />

      <div className="my-base text-h2">
        {t('These related parts and impacts are expected to be')}
      </div>
      <Row>
        <Col span={18} className="mb-base">
          {/* <Input placeholder={t('Factor of Change')} /> */}
        </Col>
        <Col
          span={6}
          className="mb-base d-flex justify-content-end align-items-center"
        >
          <span style={{ marginRight: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <Button
            type="primary"
            disabled={!hasSelected}
            loading={loading}
            onClick={handleSendMail}
          >
            {t('Notify by email')}
          </Button>
        </Col>
      </Row>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        loading={fetching}
        dataSource={dataSource}
        pagination={false}
        onChange={handleTableChange}
      />
    </Modal>
  );
};

export default ChangeInfoModal;
