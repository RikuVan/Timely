# Exercise 5: Creating custom middleware

## TASK: Whenever ANY timer in our app counts down lower than 11 seconds, we want the background of the app to slowly become a worryingly, darkening red color. We will create custom middleware to handle this. Our colorMiddleware we will detect any time any timer goes below 11 seconds and dispatch a new color for each second that ticks towards 0. It will also remove the color when the timer is reset.

- Middleware looks complicated at first but it is actually quite simple. Adding a simple logger first may help get the idea.

```javascript
/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
```

- Remember you will need to add the middleware to your `applyMiddleware` function that sets up your store. Notice that the order
of middleware is important--it runs in sequence.

### Resources

- [Redux middleware](http://redux.js.org/docs/advanced/Middleware.html)

