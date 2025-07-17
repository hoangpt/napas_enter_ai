import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import commonConstants from 'constants/common';
import commonHelpers from 'helpers/common';
import { IRoute } from 'interfaces';

const { TABLET_WIDTH } = commonConstants;
const { getWindowDimensions } = commonHelpers;

const useAppMenu = (items: IRoute[]) => {
  const { location } = useHistory();
  let selectedKey = location.pathname;
  const selectedKeySplitArr = location.pathname.split('/');
  let i = 1;
  let newSelectedKey = '';

  const getParentKey = (key: string): IRoute | undefined => {
    const newParentKey = items.find(
      item => item.children && item.children.includes(key)
    );
    if (newParentKey) return newParentKey;
    else if (i < selectedKeySplitArr.length) {
      newSelectedKey += `/${selectedKeySplitArr[i++]}`;
      selectedKey = newSelectedKey;
      return getParentKey(selectedKey);
    }
  };

  const parentKey = getParentKey(selectedKey);
  const openKey = parentKey ? parentKey.path : '/';
  return { selectedKey, openKey };
};

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ...dimensions, isTabletView: dimensions.width <= TABLET_WIDTH };
};

export default {
  useAppMenu,
  useWindowDimensions,
};
