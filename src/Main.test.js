import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Media2 from './main.js';


test('Media2 button changes the class when clicked', () => {
  const component = renderer.create(
    <Media2 page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// test example from create-react-app docs.
// it('renders without crashing', () => {
//   const root = document.createElement('root');
//   ReactDOM.render(<Media2/>, root); 
//   ReactDOM.unmountComponentAtNode(div);
// });
