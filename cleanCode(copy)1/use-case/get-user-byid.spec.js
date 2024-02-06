const {Given,When ,Then,After}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeGetuser = require('./getUserByIdUsecase');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    getuser:()=>{},
    idNotexisted:async ()=>{},
    getlabels:()=>{}
    // getUsersDetailByEmail: () => {},
}

const getUserStub = sandbox.stub(userDb,"getuser");
getUserStub.callsFake((id) => {
    expect(id).deep.equal({
      id:this.id,
});
    return {id: 1};
});

  const getlabelsStub = sandbox.stub(userDb,"getlabels");
getlabelsStub.callsFake(() => {

  });

  After(()=>{
    this.id=undefined;
    this.result=undefined;

    sandbox.resetHistory();
  })

  const idNotExistedStub = sandbox.stub(userDb,"idNotexisted");
idNotExistedStub.callsFake((id) => {
    expect(id).deep.equal({
      id:this.id,
    });
    if(id.id==2){
    return false;
    }
    return {id:1};
});

Given('User details id: {string} to get user',
(id) => {
  this.id = id || undefined;
});

When("Try to get user",async ()=>{
    try {
        const getUser = makeGetuser({Joi,getuserByIdDataAccess:userDb.getuser,idExistedUsecase:userDb.idNotexisted,getLabelsById:userDb.getlabels});
        this.result = await getUser({ id:this.id})
    } catch (error) {
        this.result  ={userData:error};
    }
})

Then('It will throw error with message: "{string}" while get user',(message)=>{
    // console.log(this.result);
    assert.equal(this.result['userData'],message);
});

Then("getuser function will call {int} time while get user",(count)=>{
    sinon.assert.callCount(getUserStub,count);
 });

 Then("getLabelbyid function will call {int} time while get user",(count)=>{
  sinon.assert.callCount(getlabelsStub,count);
});

 Then('It will get user with details: "{string}"',(newUserDetails) => {
    assert.deepEqual(this.result['userData'],JSON.parse(newUserDetails));
});
