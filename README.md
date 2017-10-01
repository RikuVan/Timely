# Exercise 2: State to Redux store, dispatching actions, and working with lists in React

## TASK: `<Countdown />` should be able to display N number of countdown timers. When the time runs out
on any one timer, that timer should read "BOOM!" The state of our timers should be in the Redux store.

- In `index.js` you will need to wrap your `ReactDOM.render` in another render function. Give this function to the store's subscribe method.
You will need to call the render once to kick off the subscription.

- You will also need to create a reducer in `reducers.js` and give it to your `createStore` method in `index.js`. Our reducer should have at least two action types,
an INIT type to register a timer id (so we can have multiple timers) and a TICK type to countdown seconds.

- One the reducer and store is set up, we can pass the store state into our root component: `<Countdown {...store.getState()} />,`. Now,
we should have the state as props in our component.
 
- We can also import the store to the `<Countdown />` and use it's `dispatch` method to trigger actions and store updates.

- In `<Countdown />`, set up a method to start countdowns, something like:

```javascript
  startCountdown = i => {
      const int = window.setInterval(
        () => store.dispatch({type: 'TICK', payload: {id: `timer${i + 1}`}}),
        1000
      );
      this.timers.push(int);
    };

```
- You will also need to initialize your timers in the correct lifecycle method, something like:
```javascript
  // countdowns can be an Number[] defined where you like to define the length of the countdowns
  countdowns.forEach((c, i) =>
    store.dispatch({type: 'INIT', payload: {id: `timer${i + 1}`, seconds: c}})
  );
```

- You need to kick of the `setCountdown`, probably in the same lifecycle hook. If you want, you can wrap them
in a `delay` function from `utils.js` so you can start each at a different time.

- On state will now need to be an array into which you can push timers, one for each countdown timer (or you can put them in the store).
You can them use those in `componentWillReceiveProps` when checking if a countdown has hit zero in order to clear the interval you saved.

- Finally, to show all your timers in the UI by mapping over the timer keys from the store, you can use the `formatTimeFromSeconds` helper
from `utils.js` to display each one. `{seconds === 0 ? 'Boom!' : seconds}` type login in the render should be of help too.

- After we this all set up, we now have (most) of our countdown data in a global state object. But it will quickly
get very verbose and complex if you have to import the `store` anywhere you need to use `getState` or `dispatch` Also, at this point we
can only dispatch synchronous actions that return plain objects. The next task remedies this situation.

### Resources:
  - [Redux Store](http://redux.js.org/docs/api/Store.html)

  - [Redux Actions](http://redux.js.org/docs/basics/Actions.html)
  
  - [Redux Reducers](http://redux.js.org/docs/basics/Reducers.html)