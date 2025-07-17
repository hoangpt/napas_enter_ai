import { useState, useEffect } from 'react';
import { PaginationProps } from 'antd';
import { IUserFilters, IUser } from 'interfaces';
import { usersMockServices } from 'services';

const useUserData = (defaultFilters: IUserFilters) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    showSizeChanger: true,
  });

  const getUsers = async (params: IUserFilters) => {
    try {
      setFetching(true);
      const res = await usersMockServices.getUsers(params);
      if (res.data) {
        const { result } = res.data;
        const { currentPage, pageSize, totalRecords } = result;
        const newUsers = result.Users;
        setUsers(newUsers);
        setPagination({
          ...pagination,
          current: currentPage,
          pageSize,
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
    getUsers(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    users,
    filters,
    setFilters,
    fetching,
    pagination,
    handleTableChange,
  };
};

export default {
  useUserData,
};
