var mkdirp = require('mkdirp')
var fs = require('fs')

function addDirectory (path, fs) {
  mkdirp.sync(path)
  return true
}

function getSubPath (path) {
  path = path.trim()
  if (path === '') return ''
  return path + '/'
}

function required (varName) {
  return function (value) {
    if ((/.+/).test(value)) { return true }
    return varName + ' is required'
  }
}

module.exports = function (plop) {
  plop.addHelper('subPath', function (text) {
    return getSubPath(text)
  })

  plop.addHelper('ifEqual', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this)
    }
    return options.inverse(this)
  })

  plop.setGenerator('Action', {
    description: 'add a new action (in src/actions)',
    prompts: [
      {
        type: 'input',
        name: 'group',
        message: 'What is this action part of? (user, group, etc)',
        validate: required('group')
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the action?',
        validate: required('name')
      }
    ],
    actions: function (answers) {
      var actions = []
      var filePath = plop.renderString('src/actions/{{ camelCase group}}.js', answers)

      if (!fs.existsSync(filePath)) {
        actions.push({
          type: 'add',
          path: filePath,
          templateFile: '.plop/blankAction.hbs'
        })
      }
      actions.push({
        type: 'modify',
        path: filePath,
        pattern: /(\/\/ Add Action String Constant Here)/gi,
        template: 'export const {{constantCase name}} = \'{{constantCase name}}\'\n$1'
      })
      actions.push({
        type: 'modify',
        path: filePath,
        pattern: /(\/\/ Add Action Creator Here)/gi,
        templateFile: '.plop/actionCreator.hbs'
      })
      return actions
    }
  })
  plop.setGenerator('Reducer', {
    description: 'add a new reducer (in src/reducers)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the property in the state tree?',
        validate: required('name')
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is the type of this property in the state?',
        choices: [
          'Object',
          'Array',
          'Primary'
        ]
      }
    ],
    actions: function (answers) {
      var actions = []
      actions.push({
        type: 'add',
        path: 'src/reducers/{{camelCase name}}.js',
        templateFile: '.plop/reducer.hbs'
      })
      actions.push({
        type: 'modify',
        path: 'src/store/reducers.js',
        pattern: /(\/\/ Import Reducers Here)/gi,
        template: 'import {{name}}Reducer from \'reducers/{{camelCase name}}\'\n$1'
      })
      actions.push({
        type: 'modify',
        path: 'src/store/reducers.js',
        pattern: /(\/\/ Add Reducers Here)/gi,
        template: '{{name}}: {{name}}Reducer,\n    $1'
      })
      return actions
    }
  })

  plop.setGenerator('Component', {
    description: 'add a component (in src/components)',
    prompts: [
      {
        type: 'input',
        name: 'subpath',
        message: 'What is the sub path of the component? example: core, content, views, forms',
        default: ''
      },
      {
        type: 'confirm',
        name: 'stateless',
        message: 'Is this a state-less functional component?',
        default: false
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
        validate: required('name')
      },
      {
        type: 'confirm',
        name: 'container',
        message: 'Do you want to create a container?',
        default: true
      }
    ],
    actions: function (answers) {
      var actions = []
      actions.push(function (answers) {
        process.chdir(plop.getPlopfilePath())
        var fs = require('fs')
        var path = plop.renderString('src/components/{{subPath subpath}}{{properCase name }}', answers)
        addDirectory(path, fs)
        return plop.renderString('{{name}} directory is created in src/component', answers)
      })

      if (answers.stateless) {
        actions.push({
          type: 'add',
          path: 'src/components/{{subPath subpath}}{{ properCase name }}/{{ properCase name }}.js',
          templateFile: '.plop/baseStatelessComponent.hbs'
        })
      } else {
        actions.push({
          type: 'add',
          path: 'src/components/{{subPath subpath}}{{ properCase name }}/{{ properCase name }}.js',
          templateFile: '.plop/baseComponent.hbs'
        })
      }

      if (answers.container) {
        actions.push({
          type: 'add',
          path: 'src/components/{{subPath subpath}}{{ properCase name }}/{{ properCase name }}Container.js',
          templateFile: '.plop/baseContainer.hbs'
        })
        actions.push({
          type: 'add',
          path: 'src/components/{{subPath subpath}}{{ properCase name }}/index.js',
          templateFile: '.plop/containerIndex.hbs'
        })
      } else {
        actions.push({
          type: 'add',
          path: 'src/components/{{subPath subpath}}{{ properCase name }}/index.js',
          templateFile: '.plop/componentIndex.hbs'
        })
      }

      actions.push({
        type: 'add',
        path: 'src/components/{{subPath subpath}}{{ properCase name}}/{{properCase name}}.scss',
        templateFile: '.plop/styles.txt'
      })

      return actions
    }
  })
}
