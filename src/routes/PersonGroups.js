import PersonGroupsPage from 'components/pages/PersonGroupsPage'
import GroupPage from 'components/pages/GroupPage'
import CreateGroupPage from 'components/pages/CreateGroupPage'
import CreatePersonPage from 'components/pages/CreatePersonPage'
import PersonPage from 'components/pages/PersonPage'
import { requestListPersons, setPersons } from 'actions/person'

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
                dispatch(requestListPersons(groupId))
                  .then((personsList) => {
                    dispatch(setPersons(groupId, personsList))
                    return personsList
                  })
                  .then((personsList) => {
                    if (personFound(personsList, personId)) {
                      cb(null, PersonPage)
                    }

                    cb('user Not found')
                  })
              }
            }
          }
        ]
      }
    ]
  }
}
