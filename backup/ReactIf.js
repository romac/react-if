context("<Switch /> element", function(){
	it("should render the child element of <Case />", function(){
		const wrapper = mount(
			<Switch>
				<Case condition={true}>
					<div>Case</div>
				</Case>
				<Case condition={true}>
					<div>Case</div>
				</Case>
			</Switch>
	);
		expect(wrapper.containsMatchingElement(<div>Case</div>)).to.equal(true);
});

	it("should render the child element of <Case /> (with condition as a function)", function(){
		const wrapper = mount(
			<Switch>
				<Case condition={() => true}>
					<div>Case</div>
				</Case>
			</Switch>
		);
		expect(wrapper.containsMatchingElement(<div>Case</div>)).to.equal(true);
});

	it("should render the child element of <Case /> (with children render function)", function(){
		const wrapper = mount(
			<Switch>
				<Case condition={true}>
					{() => <div>Case</div>}
				</Case>
			</Switch>
		);
		expect(wrapper.containsMatchingElement(<div>Case</div>)).to.equal(true);
});

	it("should render the child element of <Default />", function(){
		const wrapper = mount(
			<Switch>
				<Default>
					<div>Case</div>
				</Default>
			</Switch>
		);
		expect(wrapper.containsMatchingElement(<div>Case</div>)).to.equal(true);
});

	it("should render the child element of <Default /> (with children render function)", function(){
		const wrapper = mount(
			<Switch>
				<Default>
					{() => <div>Case</div>}
				</Default>
			</Switch>
		);
		expect(wrapper.containsMatchingElement(<div>Case</div>)).to.equal(true);
});

	it("should render nothing", function(){
		const wrapper = mount(
	<Switch />
	);
		expect(wrapper.html()).to.equal(null);
});

it("should render nothing with not matching case", function(){
	const wrapper = mount(
	<Switch>
		<Case condition={false}>
		<div>Case</div>
		</Case>
	</Switch>
	);
	expect(wrapper.html()).to.equal(null);
});

context("multiple <Case /> blocks", function(){
	it("should only render the first <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={true}>
			<div>FirstCase</div>
		</Case>
		<Case condition={true}>
			<div>SecondCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(false);
	});

	it("should only render the second <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		<Case condition={true}>
			<div>SecondCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(true);
	});

	it("should render the second <Case /> block (direct condition + condition as a function)", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		<Case condition={() => true}>
			<div>SecondCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(true);
	});
})

context("multiple <Default /> blocks", function(){
	it("should only render the first <Default /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>FirstCase</div>
		</Default>
		<Default>
			<div>SecondCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(false);
	});
})

context("<Case /> + <Default /> blocks", function(){
	it("should only render the <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={true}>
			<div>FirstCase</div>
		</Case>
		<Default>
			<div>DefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(false);
	});

	it("should only render the <Case /> block (condition as a function)", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={() => true}>
			<div>FirstCase</div>
		</Case>
		<Default>
			<div>DefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(false);
	});

	it("should only render the <Default /> block", function(){
	const wrapper = mount(
		<Switch>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		<Default>
			<div>DefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(true);
	});
})

context("<Default /> before <Case /> blocks", function(){
	it("should only render the <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>DefaultCase</div>
		</Default>
		<Case condition={true}>
			<div>FirstCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(false);
	});

	it("should only render the <Case /> block (condition as a function)", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>DefaultCase</div>
		</Default>
		<Case condition={() => true}>
			<div>FirstCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(false);
	});

	it("should only render the <Default /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>DefaultCase</div>
		</Default>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>DefaultCase</div>)).to.equal(true);
	});
})

context("Multiple <Case /> and multiple <Default /> blocks", function(){
	it("should only render the first <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>FirstDefaultCase</div>
		</Default>
		<Case condition={true}>
			<div>FirstCase</div>
		</Case>
		<Case condition={false}>
			<div>SecondCase</div>
		</Case>
		<Default>
			<div>SecondDefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>FirstDefaultCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondDefaultCase</div>)).to.equal(false);
	});

	it("should only render the second <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>FirstDefaultCase</div>
		</Default>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		<Case condition={true}>
			<div>SecondCase</div>
		</Case>
		<Default>
			<div>SecondDefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>FirstDefaultCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondDefaultCase</div>)).to.equal(false);
	});

	it("should only render the first <Case /> block", function(){
	const wrapper = mount(
		<Switch>
		<Default>
			<div>FirstDefaultCase</div>
		</Default>
		<Case condition={false}>
			<div>FirstCase</div>
		</Case>
		<Case condition={false}>
			<div>SecondCase</div>
		</Case>
		<Default>
			<div>SecondDefaultCase</div>
		</Default>
		</Switch>
	);
	expect(wrapper.containsMatchingElement(<div>FirstCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>SecondCase</div>)).to.equal(false);
	expect(wrapper.containsMatchingElement(<div>FirstDefaultCase</div>)).to.equal(true);
	expect(wrapper.containsMatchingElement(<div>SecondDefaultCase</div>)).to.equal(false);
	});
})
});
