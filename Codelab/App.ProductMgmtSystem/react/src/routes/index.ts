import { lazy } from 'react';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';

import { t } from 'helpers/i18n';
// App pages
const Home = lazy(() => import('containers/Home'));
// const PageUnderConstruction = lazy(() =>
//   import('containers/shared/PageUnderConstruction')
// );
const CheckChangeInfo = lazy(() =>
  import('containers/ChangeNotification/CheckChangeInfo')
);
const ConceptListing = lazy(() =>
  import('containers/ChangeNotification/ConceptListing')
);
const ConceptDetail = lazy(() =>
  import('containers/ChangeNotification/ConceptDetail')
);
/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */
const routes = [
  // This is a menu/route which has no children (sub-menu)
  {
    exact: true,
    path: '/',
    name: t('Home'),
    component: Home,
    icon: HomeOutlined,
  },
  // This is a parent menu which has children (sub-menu) and requires catalog:brand:X permission to display
  // X maybe read/create/update/delete...
  {
    path: '/automotive-insight',
    name: t('Change Design Notification'),
    icon: AppstoreOutlined,
    children: [
      '/automotive-insight',
      '/automotive-insight/search',
      '/automotive-insight/concept',
    ], // Specifies sub-menus/routes (sub-menu path)
  },
  // This is a sub-menu/route which requires catalog:brand:read permission to display/access
  {
    exact: true,
    path: '/automotive-insight/search',
    name: t('Search Part'),
    component: CheckChangeInfo,
  },
  // This is a sub-menu/route which requires catalog:brand:create permission to display/access
  {
    exact: true,
    path: '/automotive-insight/concept',
    name: t('Change Design History'),
    component: ConceptListing,
  },
  {
    exact: true,
    path: '/automotive-insight/concept/:id',
    name: t('Concept Detail'),
    component: ConceptDetail,
  },
  // {
  //   path: '/ai-lab',
  //   name: t('AI Lab'),
  //   icon: AppstoreOutlined,
  //   children: ['/ai-lab/report', '/ai-lab/graph', '/ai-lab/train'], // Specifies sub-menus/routes (sub-menu path)
  // },
  // // This is a sub-menu/route which requires catalog:brand:read permission to display/access
  // {
  //   exact: true,
  //   path: '/ai-lab/report',
  //   name: t('Report'),
  //   component: PageUnderConstruction,
  // },
  // {
  //   exact: true,
  //   path: '/ai-lab/graph',
  //   name: t('Graph Visualize'),
  //   component: PageUnderConstruction,
  // },
  // {
  //   exact: true,
  //   path: '/ai-lab/train',
  //   name: t('AI Training'),
  //   component: PageUnderConstruction,
  // },
];

export default routes;
