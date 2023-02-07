# Resole production issue within vite.config.js file [May not not be required it is fixed]


## Solution 2 (preferred but not tested)

Problem [module not defined in redux-form after migrating to create react app to vite](https://github.com/FredKSchott/snowpack/discussions/2567)

Solution (replace import statement) [import {reduxForm} from "redux-form/dist/redux-form";](https://github.com/FredKSchott/snowpack/discussions/2567#discussioncomment-735653)
## solution 1

remove `module: undefined` definition from `vite.config.js`

```
define: {
  module: undefined,
}
```

With above configuration. it is working file in development but not working in production. This problem is caused by redux-form package.


