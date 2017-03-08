import PersonGroupsPage from 'components/pages/PersonGroupsPage'
import GroupPage from 'components/pages/GroupPage'
import CreateGroupPage from 'components/pages/CreateGroupPage'
import CreatePersonPage from 'components/pages/CreatePersonPage'
import { requestListPersons, setPersons } from 'actions/person'

// Sync route definition
export default (store) => {
  return {
    path: 'person-groups',
    component: PersonGroupsPage,
    childRoutes: [
      {
        path: '_create',
        component: CreateGroupPage
      },
      {
        path: ':groupId',
        component: GroupPage,
        onEnter: (props) => {
          const { dispatch } = store
          const { params } = props
          const { groupId } = params
          dispatch(requestListPersons(groupId))
            .then((personsList) => dispatch(setPersons(groupId, personsList)))
        },
        childRoutes: [
          {
            path: '_create-person',
            component: CreatePersonPage
          }
        ]
      }
    ]
  }
}
