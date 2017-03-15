import PersonGroupsPage from 'components/pages/PersonGroupsPage'
import GroupPage from 'components/pages/GroupPage'
import CreateGroupPage from 'components/pages/CreateGroupPage'
import CreatePersonPage from 'components/pages/CreatePersonPage'
import PersonPage from 'components/pages/PersonPage'
import PersonGroupsIndexPage from 'components/pages/PersonGroupsIndexPage'
import GroupIndexPage from 'components/pages/GroupIndexPage'
import { requestListPersons, setPersons } from 'actions/person'
import { loadConfig } from 'actions/config'

const personFound = (persons, personId) => {
  // Assuming the personList of the group
  persons = !persons ? [] : persons
  return !!persons.find((person) => person.personId === personId)
}

// Sync route definition
export default (store) => {
  return {
    path: 'person-groups',
    component: PersonGroupsPage,
    indexRoute: {
      component: PersonGroupsIndexPage
    },
    childRoutes: [
      {
        path: '_create',
        component: CreateGroupPage
      },
      {
        path: ':groupId',
        component: GroupPage,
        indexRoute: {
          component: GroupIndexPage
        },
        onEnter: (props) => {
          const { dispatch } = store
          const { params } = props
          const { groupId } = params
          dispatch(loadConfig())
          dispatch(requestListPersons(groupId))
            .then((personsList) => dispatch(setPersons(groupId, personsList)))
        },
        childRoutes: [
          {
            path: '_create-person',
            component: CreatePersonPage
          },
          {
            path: ':personId',
            getComponent: (nextState, cb) => {
              const { groupId, personId } = nextState.params
              const { dispatch } = store
              const { persons } = store.getState()
              if (personFound(persons[groupId], personId)) {
                cb(null, PersonPage)
              } else {
                dispatch(loadConfig())
                dispatch(requestListPersons(groupId))
                  .then((personsList) => {
                    dispatch(setPersons(groupId, personsList))
                    return personsList
                  })
                  .then((personsList) => {
                    if (personFound(personsList, personId)) {
                      cb(null, PersonPage)
                    }
                    // TODO: implement a Not Found Page
                    cb('user Not Found')
                  })
              }
            }
          }
        ]
      }
    ]
  }
}
