context("<If /> element with false condition as a function", function(){
	it("should not render the child element of <Then />", function(){
		const wrapper = mount(
			<If condition={() => false}>
				<Then>
					<div>Then</div>
				</Then>
			</If>
		);
		expect(wrapper.containsMatchingElement(<div>Then</div>)).to.equal(false);
	});

	it("should render the child element of <Else />", function(){
		const wrapper = mount(
			<If condition={() => false}>
				<Then>
					<div>Then</div>
				</Then>
				<Else>
					<div>Else</div>
				</Else>
			</If>
		);
		expect(wrapper.containsMatchingElement(<div>Else</div>)).to.equal(true);
	});

	context("multiple <Else /> blocks", function(){
		it("should only render the first <Else /> block", function(){
			const wrapper = mount(
				<If condition={() => false}>
					<Else>
						<div>Else1</div>
					</Else>
					<Else>
						<div>Else2</div>
					</Else>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Else1</div>)).to.equal(true);
			expect(wrapper.containsMatchingElement(<div>Else2</div>)).to.equal(false);
		});
	});

	context("<Else /> before <Then />", function(){
		it("should only render the <Else /> block", function(){
			const wrapper = mount(
				<If condition={() => false}>
					<Else>
						<div>Else</div>
					</Else>
					<Then>
						<div>Then</div>
					</Then>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Then</div>)).to.equal(false);
			expect(wrapper.containsMatchingElement(<div>Else</div>)).to.equal(true);
		});
	});

	context("content without <Then /> or <Else />", function(){
		it("should not render the child", function(){
			const wrapper = mount(
				<If condition={() => false}>
					<div>Content</div>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Content</div>)).to.equal(false);
		});
	});

	context("without blocks", function(){
		it("should render nothing", function(){
			const wrapper = mount(<If condition={() => false}></If>);

			expect(wrapper.html()).to.equal(null);
		});
	});

	context("where a child is a function", function(){
		it("should render the component returned by the function", function(){
			const wrapper = mount(
				<If condition={() => false}>
					<Else>
						{ () => <div>Else</div> }
					</Else>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Else</div>)).to.equal(true);
		});

		it("should not evaluate the body of the function if not needed", function() {
			var called = false;

			const wrapper = mount(
				<If condition={() => false}>
					<Then>{() => {
						called = true;
						<div>Bad</div>
					}}</Then>
					<Else>
						<div>Ok</div>
					</Else>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Ok</div>)).to.equal(true);
			expect(wrapper.containsMatchingElement(<div>Bad</div>)).to.equal(false);
			expect(called).to.equal(false);
		});
	});
});

context("<When /> element", function(){
	it("should render the child element of <When />", function(){
		const wrapper = mount(
			<When condition={true}>
				<div>When</div>
			</When>
		);
		expect(wrapper.containsMatchingElement(<div>When</div>)).to.equal(true);
	});

	it("should not render the child element of <When />", function(){
		const wrapper = mount(
			<When condition={false}>
				<div>When</div>
			</When>
		);
		expect(wrapper.containsMatchingElement(<div>When</div>)).to.equal(false);
});

	it("should render nothing", function(){
		const wrapper = mount(<When condition={true}></When>);
		expect(wrapper.html()).to.equal(null);
	});

	it("should render the child element of <When /> with condition as a function", function(){
		const wrapper = mount(
			<When condition={() => true}>
				<div>When</div>
			</When>
		);
		expect(wrapper.containsMatchingElement(<div>When</div>)).to.equal(true);
	});

	it("should not render the child element of <When /> with condition as a function", function(){
		const wrapper = mount(
			<When condition={() => false}>
				<div>When</div>
			</When>
		);
		expect(wrapper.containsMatchingElement(<div>When</div>)).to.equal(false);
	});

	it("should render nothing with condition as a function", function(){
		const wrapper = mount(<When condition={() => true}></When>);
		expect(wrapper.html()).to.equal(null);
	});
});

context("<Unless /> element", function(){
	it("should not render the child element of <Unless />", function(){
		const wrapper = mount(
			<Unless condition={true}>
				<div>Unless</div>
			</Unless>
		);
		expect(wrapper.containsMatchingElement(<div>Unless</div>)).to.equal(false);
	});

	it("should render the child element of <Unless />", function(){
		const wrapper = mount(
			<Unless condition={false}>
				<div>Unless</div>
			</Unless>
		);
		expect(wrapper.containsMatchingElement(<div>Unless</div>)).to.equal(true);
	});

	it("should render nothing", function(){
		const wrapper = mount(<Unless condition={true}></Unless>);
		expect(wrapper.html()).to.equal(null);
});

	it("should not render the child element of <Unless />", function(){
		const wrapper = mount(
			<Unless condition={() => true}>
				<div>Unless</div>
			</Unless>
		);
		expect(wrapper.containsMatchingElement(<div>Unless</div>)).to.equal(false);
	});

	it("should render the child element of <Unless />", function(){
		const wrapper = mount(
			<Unless condition={() => false}>
				<div>Unless</div>
			</Unless>
		);
		expect(wrapper.containsMatchingElement(<div>Unless</div>)).to.equal(true);
	});

	it("should render nothing", function(){
		const wrapper = mount(<Unless condition={() => true}></Unless>);
		expect(wrapper.html()).to.equal(null);
	});
});

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
