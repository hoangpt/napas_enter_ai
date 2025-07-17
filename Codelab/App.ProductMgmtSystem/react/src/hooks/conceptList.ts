import { useState, useEffect } from 'react';
import { PaginationProps } from 'antd';
import { IConcept, IBaseFilters } from 'interfaces';
import { conceptListMockServices } from 'services';

const useConceptListData = (defaultFilters: IBaseFilters) => {
  const [conceptList, setConceptList] = useState<IConcept[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    showSizeChanger: true,
  });

  const getConceptList = async (params: IBaseFilters) => {
    try {
      setFetching(true);
      const res = await conceptListMockServices.getConceptList(params);
      if (res.data) {
        const result = res.data;
        const { page, pageSize, totalRecords, concepts } = result;
        setConceptList(concepts);
        setPagination({
          ...pagination,
          current: page,
          pageSize: pageSize,
          total: totalRecords,
        });
      }
    } finally {
      setFetching(false);
    }
  };

  const handleTableChange = (pager: PaginationProps) => {
    const { current, pageSize } = pager;
    const newQueryParams = {
      ...filters,
      page: current,
      pageSize,
    };
    setFilters(newQueryParams);
  };

  useEffect(() => {
    getConceptList(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    conceptList,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  };
};

export default {
  useConceptListData,
};
