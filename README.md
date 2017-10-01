# Exercise 1: React state, lifecycle hooks, & JSX

### Task 1: make your `<Clock />` component show the current time, updating in a given number of milliseconds.

- You will need to use at least two lifecycle hooks to add a setInterval when mounting and to remove it when unmounting the component.
Create a hook on the state of your component to the setInterval: `this.task = window.setInterval(...)` so you can use the same hook to clear it.

- You will also need to keep update a Date object on the state of your component on each tick of the setInterval. You will find
a helper, `formatTime` to format this date into a number (HH.MM.SS.MS) in `utils.js`.

## Resources
- [React state & lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

- [Props in JSX](https://reactjs.org/docs/jsx-in-depth.html#props-in-jsx)
