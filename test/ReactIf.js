import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import { If, Then, Else, When, Unless } from '../src/ReactIf';

function setUpDomEnvironment() {
	const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
	const { window } = dom;

	global.window = window;
	global.document = window.document;
	global.navigator = {
			userAgent: 'node.js',
	};
	copyProps(window, global);
}

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
			.filter(prop => typeof target[prop] === 'undefined')
			.map(prop => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

setUpDomEnvironment();

configure({ adapter: new Adapter() });

describe("react-if", function(){
	context("<If /> element with true condition", function(){
		it("should render the child element of <Then />", function(){
			const wrapper = mount(
				<If condition={true}>
					<Then>
						<div>Then</div>
					</Then>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Then</div>)).to.equal(true);
		});

		it("should not render the child element of <Else />", function(){
			const wrapper = mount(
				<If condition={true}>
					<Then>
						<div>Then</div>
					</Then>
					<Else>
						<div>Else</div>
					</Else>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Else</div>)).to.equal(false);
		});

		context("multiple <Then /> blocks", function(){
			it("should only render the first <Then /> block", function(){
				const wrapper = mount(
					<If condition={true}>
						<Then>
							<div>Then1</div>
						</Then>
						<Then>
							<div>Then2</div>
						</Then>
					</If>
				);
				expect(wrapper.containsMatchingElement(<div>Then1</div>)).to.equal(true);
				expect(wrapper.containsMatchingElement(<div>Then2</div>)).to.equal(false);
			});
		});

		context("<Else /> before <Then />", function(){
			it("should only render the <Then /> block", function(){
				const wrapper = mount(
					<If condition={true}>
						<Else>
							<div>Else</div>
						</Else>
						<Then>
							<div>Then</div>
						</Then>
					</If>
				);
				expect(wrapper.containsMatchingElement(<div>Then</div>)).to.equal(true);
				expect(wrapper.containsMatchingElement(<div>Else</div>)).to.equal(false);
			});
		});
		
		context("content without <Then /> or <Else />", function(){
			it("should render the child", function(){
				const wrapper = mount(
					<If condition={true}>
						<div>Content</div>
					</If>
				);
				expect(wrapper.containsMatchingElement(<div>Content</div>)).to.equal(true);
			});
		});

		context("without blocks", function(){
			it("should render nothing", function(){
				const wrapper = mount(<If condition={true}></If>);
				
				expect(wrapper.html()).to.equal(null);
			});
		});
	});

	context("<If /> element with false condition", function(){
		it("should not render the child element of <Then />", function(){
			const wrapper = mount(
				<If condition={false}>
					<Then>
						<div>Then</div>
					</Then>
				</If>
			);
			expect(wrapper.containsMatchingElement(<div>Then</div>)).to.equal(false);
		});

		it("should render the child element of <Else />", function(){
			const wrapper = mount(
				<If condition={false}>
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
					<If condition={false}>
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
					<If condition={false}>
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
					<If condition={false}>
						<div>Content</div>
					</If>
				);
				expect(wrapper.containsMatchingElement(<div>Content</div>)).to.equal(false);
			});
		});

		context("without blocks", function(){
			it("should render nothing", function(){
				const wrapper = mount(<If condition={false}></If>);
				
				expect(wrapper.html()).to.equal(null);
			});
		});

		context("where a child is a function", function(){
			it("should render the component returned by the function", function(){
				const wrapper = mount(
					<If condition={false}>
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
					<If condition={false}>
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
	});

});
