# Exercise 3: React-redux provider and connect to make life easier, together with React-thunk to make life asynchronous

## TASK: `<Countdown />` can be be refactored so that our actions are bound to props with `connect` props flow down from the `<Provider />`. Let's create a `startTimer` action which both handles initialization of the timer and starts the ticking. Use `callAtInterval` from the `utils.js`.
this setIntervals stuff out of your component. Notice the helper will dispatch an action for you at intervals.
```javascript
// in actions.js

export const startTimer = ({id, seconds, waitTime = 0}) => dispatch => {
  // you handle the rest
}
```
- At this point we probably want to put all our action types as constants in the actions file and export them to the reducer/wherever they are needed.

- use `export connect(mapStateToProps, mapDispatchToProps)(Coountdown)` to get action creator(s) and store state into the component. You may want to 
use `bindActionCreators` in together with `mapDispatchToProps` to wrap your get your actions to dispatch magically from your component.

### Resources:
  - [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)

  - [Connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
  
  - [Redux thunk middleware](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)
  
  - [Action creators](http://redux.js.org/docs/basics/Actions.html#action-creators)

  - [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html)