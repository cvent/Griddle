/** @jsx React.DOM */
jest.dontMock('../gridTitle.jsx');

var React = require('react/addons');
var GridTitle = require('../gridTitle.jsx');
var TestUtils = React.addons.TestUtils;

describe('GridTitle', function() {
	var title; 
	var columns; 
	beforeEach(function(){
		columns = ["one", "two", "three"];
		columnMetadata = [{
			"columnName": "two",
			"allowSort": false
		}];
	  title = TestUtils.renderIntoDocument(<GridTitle columns={columns} columnMetadata={columnMetadata} />);
	});

	it('calls method when clicked', function(){
		var node = TestUtils.findRenderedDOMComponentWithTag(title, 'thead');
		var headings = TestUtils.scryRenderedDOMComponentsWithTag(node, 'th');

		var mock = jest.genMockFunction(); 
		title.props.changeSort = mock;

		expect(headings.length).toEqual(3);

		var first = headings[0];
		expect(TestUtils.isDOMComponent(first)).toBe(true);
		expect(title.props.sortColumn).toEqual("");

		//todo: can we just get this from jsdom?
		var someEvent = {
			"target":{
				"dataset":{
					"title": "one"
				}
			}
		};
		React.addons.TestUtils.Simulate.click(first, someEvent);
		expect(mock.mock.calls).toEqual([["one"]]);

	})

	it('does not call sort method when clicked', function(){
		var node = TestUtils.findRenderedDOMComponentWithTag(title, 'thead');
		var headings = TestUtils.scryRenderedDOMComponentsWithTag(node, 'th');

		var mock = jest.genMockFunction(); 
		title.props.changeSort = mock;

		expect(headings.length).toEqual(3);

		var second = headings[1];
		expect(TestUtils.isDOMComponent(second)).toBe(true);
		expect(title.props.sortColumn).toEqual("");

		var someEvent = {
			"target":{
				"dataset":{
					"title": "second"
				}
			}
		};
		React.addons.TestUtils.Simulate.click(second, someEvent);
		expect(mock.mock.calls).toEqual([]);

	})
});