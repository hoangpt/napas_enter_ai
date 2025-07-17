import { useState, useEffect, useRef } from 'react';
import { PaginationProps } from 'antd';
import { IPartFilters, IPart } from 'interfaces';
import { partServices } from 'services';

const usePartData = (defaultFilters: IPartFilters) => {
  const firstMounted = useRef(false);
  const [parts, setParts] = useState<IPart[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    showSizeChanger: true,
  });

  const getParts = async (params: IPartFilters) => {
    try {
      setFetching(true);
      const res = await partServices.getParts(params);
      if (res.data) {
        const result = res.data;
        const { page, pageSize, totalRecords } = result;
        const newParts = result.parts;
        setParts(newParts);
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
    if (!firstMounted.current) {
      firstMounted.current = true;
    } else {
      getParts(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    parts,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  };
};

export default {
  usePartData,
};
