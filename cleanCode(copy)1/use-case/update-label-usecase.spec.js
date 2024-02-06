const {Given,When ,Then,After}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeUpdateuser = require('./update-label-usecase');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    updatelabel:()=>{},
}

const updateLabelStub = sandbox.stub(userDb,"updatelabel");
updateLabelStub.callsFake(() => {

});

After(()=>{
    this.userId=undefined;
    this.result=undefined;

    sandbox.resetHistory();
  })

Given('User details id: {string},labelName: {string} to update label',
(userId,labelName) => {
  this.userId =   userId || undefined;
  this.labelName = labelName || undefined
});

When("Try to update label",async ()=>{
    try {
        const updateLabel = makeUpdateuser({Joi,updateLabels:userDb.updatelabel});
        this.result = await updateLabel({ userId:this.userId , labelName:this.labelName})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while updating label',(message)=>{
    // console.log(this.result);
    assert.equal(this.result.message,message);
});

Then("updatelabel function will call {int} time while updating label",(count)=>{
    sinon.assert.callCount(updateLabelStub,count);
 });

 