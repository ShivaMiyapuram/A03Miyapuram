QUnit.test("Number sign checker",function(assert){
	assert.strictEqual(checker.checkNumber(2),"right","Given number is positive");
	assert.strictEqual(checker.checkNumber(-2),"Number cannot be negative");
	assert.strictEqual(checker.checkNumber(""),"Number cannot be empty");
	assert.strictEqual(checker.checkNumber("ext"),"Number cannot be string");
	assert.strictEqual(checker.checkNumber("3"),"right","Given number is positive");
});