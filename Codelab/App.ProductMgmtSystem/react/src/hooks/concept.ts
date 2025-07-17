import { useState, useEffect } from 'react';
import { PaginationProps } from 'antd';
import { IConcept, IBaseFilters } from 'interfaces';
import { conceptMockServices } from 'services';

const useConceptData = (defaultFilters: IBaseFilters) => {
  const [concept, setConcept] = useState<IConcept>();
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);

  const getConcept = async (params: IBaseFilters) => {
    try {
      setFetching(true);
      const res = await conceptMockServices.getConcept(params);
      if (res.data) {
        const result = res.data;
        const { concept } = result;
        setConcept(concept);
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
    getConcept(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    concept,
    filters,
    setFilters,
    fetching,
    handleTableChange,
  };
};

export default {
  useConceptData,
};
