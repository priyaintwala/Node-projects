const {Given,When ,Then,After}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeDeleteuser = require('./deleteUserUsecase');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    deleteuser:()=>{},
    idNotexisted:async ()=>{}
    // getUsersDetailByEmail: () => {},
}

const deleteUserStub = sandbox.stub(userDb,"deleteuser");
deleteUserStub.callsFake((id) => {
    expect(id).deep.equal({
      id:this.id,
});
    return {id: 1};
  });

  After(()=>{
    this.id=undefined;
    this.result=undefined;

    sandbox.resetHistory();
  })

const idNotExistedStub = sandbox.stub(userDb,"idNotexisted");
idNotExistedStub.callsFake((id) => {
    // console.log("in stub", id);
    expect(id).deep.equal({
      id:this.id,
    });
    if(id.id==2){
        // console.log(id,"-----");
    return false;
    }
    return {id:1};
});

Given('User details id: {string} to delete user',
(id) => {
  this.id = id || undefined;
});

When("Try to delete new user",async ()=>{
    try {
        const deleteUser = makeDeleteuser({Joi,deleteuserByIdDataAccess:userDb.deleteuser,idExistedUsecase:userDb.idNotexisted});
        this.result = await deleteUser({ id:this.id})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while deleting new user',(message)=>{
    // console.log(this.result);
    assert.equal(this.result,message);
});

Then("deleteuser function will call {int} time while deleting new user",(count)=>{
    sinon.assert.callCount(deleteUserStub,count);
 });

 Then('It will delete new user with details: "{string}"',(newUserDetails) => {
    assert.deepEqual(this.result,JSON.parse(newUserDetails));
});
