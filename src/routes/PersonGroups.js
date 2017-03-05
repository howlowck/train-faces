import PersonGroupsPage from 'components/pages/PersonGroupsPage'
import GroupPage from 'components/pages/GroupPage'

// Sync route definition
export default (store) => {
  return {
    path: 'person-groups',
    component: PersonGroupsPage,
    childRoutes: [
      {
        path: ':name',
        component: GroupPage
      }
    ]
  }
}
