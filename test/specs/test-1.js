const assert = require('chai').assert;
const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('TEST-1', () => {
	before(function () {
		browser.navigateTo('https://the-internet.herokuapp.com')
		$('=Add/Remove Elements').click()
	})

	it('should appear 3 buttons', function () {
		const add_button = $('button=Add Element')
		for (var i=0; i<3; i++){
			add_button.click()
		}
		assert.lengthOf($$('button=Delete'), 3)
	});

	it('should delete one button', function () {
		$('button=Delete').click()
		assert.lengthOf($$('button=Delete'), 2)
    });
})

describe('TEST-2', () => {
	before(function () {
		browser.navigateTo('https://the-internet.herokuapp.com')
		$('=JavaScript Alerts').click()
	})
	it('should show specific text on Alert', function () {
		$('button=Click for JS Alert').click()
		browser.acceptAlert()
		var doesTextExist = $('//*[text()="You successfuly clicked an alert"]').isExisting()
		assert.equal(doesTextExist, true)
	});

	it('should show specific text on Confirm', function () {
		$('button=Click for JS Confirm').click()
		browser.dismissAlert()
		var doesTextExist = $('//*[text()="You clicked: Cancel"]').isExisting()
		assert.equal(doesTextExist, true)
	});

	it('should show specific text on Prompt', function () {
		$('button=Click for JS Prompt').click()
		var sendedText = "Pricol"
		browser.sendAlertText(sendedText)
		browser.acceptAlert()

		var doesTextExist = $('//*[text()="You entered: '+sendedText+'"]').isExisting()
		assert.equal(doesTextExist, true)
	});
})

describe('TEST-3', () => {
	before(function () {
		browser.navigateTo('https://the-internet.herokuapp.com')
		$('=Frames').click()
		$('=iFrame').click()
	})

	var titles = [];
	it('should get response from request', () => {
		chai.request('jsonplaceholder.typicode.com')
			.get('/todos?_start=0&_limit=5')
			.end((err, res)  => {
				res.body.forEach(i => {
					titles.push(i.title)
				})
		});
	});

	it('should input values in body', function () {
		browser.switchToFrame(0)
		let inputField = $('body')
		browser.pause(10000)
		titles.forEach(i =>{
			inputField.addValue("\n"+i)
		});
		assert.equal($$('//p[text()]').length, titles.length+1)
	});
})

describe('TEST-4', () => {
	before(function () {
		browser.navigateTo('https://the-internet.herokuapp.com')
		$('=File Upload').click()
	})

	it('should upload file', function () {
		let filePath = path.join(__dirname, '../assets/heli.jpg')
		$('#file-upload').setValue(filePath)
		$('#file-submit').click()
		var doesTextExist = $('//*[text()="File Uploaded!"]').isExisting()
		assert.equal(doesTextExist, true)
	});
})
