const {Given,When,Then}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeAddlabel = require('./add-labels');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    addlabel:()=>{},
}

const addLabelStub = sandbox.stub(userDb,"addlabel");
addLabelStub.callsFake(({id}) => {
    expect([id]).deep.equal([
      this.id,
    ]);
    return 5;
  });

Given('User details id: {string} to create new label',
(id) => {
  this.id = id || undefined;
});

When("Try to add new label",async ()=>{
    try {
        const addLabels = makeAddlabel({addLabels:userDb.addlabel,Joi});
        this.result = await addLabels({ id:this.id})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while adding new label',(message)=>{
    assert.equal(this.result.message,message);
});

Then("addLabels function will call {int} time while adding new label",(count)=>{
    sinon.assert.callCount(addLabelStub,count);
 });

//  Then("It will create new Folder with details: {int}",(count)=>{
//    sinon.assert.callCount(folderStub,count)
//  })

Then('It will create new Folder with details: {int}',(FolderCount) => {
  assert.deepEqual(this.result,JSON.parse(FolderCount));
});



