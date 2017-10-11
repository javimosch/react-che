export default {

	minimal: (che) => {
		che.reset();
		che.defineActions(['BACKEND_CALL'])
		che.defineStore('Backend', {
			called: false
		}, (action) => {
			action.on.BACKEND_CALL((state) => {
				state.called = true;
			});
		});
		che.start();
	}

};