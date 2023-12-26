// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'admins',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'memerrs',
    path: '/dashboard/memerr',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'memedd',
    path: '/dashboard/memedd',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Campaigns',
    path: '/dashboard/campaign',
    icon: getIcon('logos:active-campaign-icon')
  },
  {
    title: 'Platform',
    path: '/dashboard/social-platform',
    icon: getIcon('logos:google-marketing-platform')
  },
  {
    title: 'Tags',
    path: '/dashboard/tags',
    icon: getIcon('icon-park:tag')
  },
];

export default sidebarConfig;
