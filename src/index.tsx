import * as React from 'react';
import {render} from 'react-dom';
import { Main } from './Main';

const root = document.createElement("div");

render(<Main />, root);

document.body.appendChild(root);