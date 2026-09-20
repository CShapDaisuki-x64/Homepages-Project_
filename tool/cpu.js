self.onmessage = (e) => {
		let a = 0;

		for (let i = 0; i < 100000000; i++) {
				a += Math.sqrt(
						Math.sqrt(i * Math.random()) *
						Math.sqrt(i * Math.random()) *
						Math.sqrt(i * Math.random()) *
						Math.sqrt(i * Math.random()) *
						Math.sqrt(i * Math.random()) *
						Math.random()
				);
		}

		self.postMessage(a);
};