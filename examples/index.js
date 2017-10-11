import React from 'react';

import ToggleFlagExampleComponent from './ToggleFlagExampleComponent';
import {configure as configureToogleFlagExample} from './ToggleFlagExampleComponent';

import TodoExampleComponent from './TodoExampleComponent';
import {configure as configureTodoExample} from './TodoExampleComponent';


class ExamplesComponent extends React.Component{
	render(){
		return(
			<div>
				<h3>Examples</h3>
				<TodoExampleComponent/>
				<ToggleFlagExampleComponent/>
			</div>
			);
	}
}

export default {

	configure: (che) => {
		configureToogleFlagExample(che);
		configureTodoExample(che);
	},
	ExamplesComponent:ExamplesComponent

};


