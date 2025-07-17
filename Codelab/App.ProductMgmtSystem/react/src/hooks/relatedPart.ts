import { useState, useEffect, useRef } from 'react';
import { PaginationProps } from 'antd';
import { IRelatedPartFilters, IPart } from 'interfaces';
import { relatedPartServices } from 'services';

const useRelatedPartData = (defaultFilters: IRelatedPartFilters) => {
  const firstMounted = useRef(false);
  const [relatedParts, setRelatedParts] = useState<IPart[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);

  const getRelatedParts = async (params: IRelatedPartFilters) => {
    try {
      setFetching(true);
      const res = await relatedPartServices.getRelatedParts(params);
      if (res.data) {
        const result = res.data;
        const newParts = result.parts;
        setRelatedParts(newParts);
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
      getRelatedParts(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    relatedParts,
    filters,
    setFilters,
    fetching,
    handleTableChange,
  };
};

export default {
  useRelatedPartData,
};
