const {Given,When ,Then,After}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeDeleteuser = require('./delete-label-Usecase');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    deletelabel:()=>{},
}

const deleteLabelStub = sandbox.stub(userDb,"deletelabel");
deleteLabelStub.callsFake(() => {

});

After(()=>{
    this.userId=undefined;
    this.result=undefined;

    sandbox.resetHistory();
  })

Given('User details id: {string},labelName: {string} to delete label',
(userId,labelName) => {
  this.userId =   userId || undefined;
  this.labelName = labelName || undefined
});

When("Try to delete label",async ()=>{
    try {
        const deleteLabel = makeDeleteuser({Joi,deleteLabels:userDb.deletelabel});
        this.result = await deleteLabel({ userId:this.userId , labelName:this.labelName})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while deleting label',(message)=>{
    // console.log(this.result);
    assert.equal(this.result.message,message);
});

Then("deletelabel function will call {int} time while deleting label",(count)=>{
    sinon.assert.callCount(deleteLabelStub,count);
 });
