import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

import { If, Then, Else } from '../src/ReactIf';

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
		it("should not render the child element of  <Then />", function(){
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

		context("where the child of else is a function", function(){
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
		});
	});
});