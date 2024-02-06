const {Given,When,Then}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makegetlabel = require('./getlabels-byid');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    getlabel:()=>{},
}

const getLabelStub = sandbox.stub(userDb,"getlabel");
getLabelStub.callsFake(({id}) => {
    expect([id]).deep.equal([
      this.id,
    ]);
    return ["INBOX","SENT","TRASH","STAR","DRAFT"];
  });
  
Given('User details id: {string} to get label',
(id) => {
  this.id = id || undefined;
});

When("Try to get label",async ()=>{
    try {
        const getLabels = makegetlabel({getLabelsById:userDb.getlabel,Joi});
        this.result = await getLabels({ id:this.id})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while getting label',(message)=>{
    assert.equal(this.result.message,message);
});

Then("getLabels function will call {int} time while getting label",(count)=>{
    sinon.assert.callCount(getLabelStub,count);
 });

Then('It will get new Folder with details: {string}',(FolderNames) => {
  assert.deepEqual(this.result,JSON.parse(FolderNames));
});



