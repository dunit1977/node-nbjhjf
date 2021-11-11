import React from 'react';
import ReactDOM from 'react-dom';

let container = document.createElement('div');

document.body.appendChild(container);

ReactDOM.render(
  <p>
    Go to the <a href="/playground">GraphQL Playground</a>
  </p>,
  container
);
