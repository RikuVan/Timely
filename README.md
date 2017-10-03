# Exercise 4: Reusable functionality with HoCs/rendering of child components as functions

## TASK: We have a `<SecreteMessage message="secret" />` component which should only show for a limited number of seconds. We want to create
a generic way to hide any component we need to hide in this way.

- One way to handle this is with a Higher Order Component which takes any component and wraps it in the desired functionality:
```javascript
const HoC = WrappedComponent => {
  return class Wrapper extends Component {
    render() {
      return (
        <div>
           I have wrapped you!
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
}
```
- Another option is to handle the hiding with a custom prop to a render function as a child:
```javascript
class Parent extends Component {
  render() {
    return (
      <div>
        {this.props.children('Here is some info')}
      </div>
    )
  }
}

class Child extends Component {
  render() {
    return(
      <Parent>
        {message => (
          <div>
            {message}
          </div>
      )}
      </Parent>
    )
  }
}
```
