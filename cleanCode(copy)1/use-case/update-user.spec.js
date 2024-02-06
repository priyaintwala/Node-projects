const {Given,When ,Then,After}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeUpdateuser = require('./updateUserUsecase');

const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const userDb ={
    updateuser:()=>{},
    idNotexisted:async ()=>{}
    // getUsersDetailByEmail: () => {},
}

const updateUserStub = sandbox.stub(userDb,"updateuser");
updateUserStub.callsFake(({id,userName}) => {
    expect([id,userName]).deep.equal([
      this.id,
      this.username,
    ]);
    return {id: 1};
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

// const getUsersDetailByEmailStub = sandbox.stub(userDb,'getUsersDetailByEmail')

Given("User details id: {string}, username: {string} to update user",
(id,username) => {
  this.id = id || undefined;
  this.username = username || undefined;
  
});

// Given('Already existed user details: "{string}" with same email',
// (userDetailsByEmail)=>{
//     this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
// })

When("Try to update user",async ()=>{
    try {
        const updateUser = makeUpdateuser({Joi,updateuserDataAccess:userDb.updateuser,idExistedUsecase:userDb.idNotexisted});
        this.result = await updateUser({ userName:this.username, id:this.id})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while updating user',(message)=>{
    assert.equal(this.result,message);
});

Then("updateuser function will call {int} time while updating user",(count)=>{
    sinon.assert.callCount(updateUserStub,count);
 });
// Then('GetUsersDetailByEmail function will call {int} time while creating new user',
//     (getUsersDetailByEmailFunctionCallCount) => {
//       sinon.assert.callCount(getUsersDetailByEmailStub, getUsersDetailByEmailFunctionCallCount);
//     },
// );
Then('It will update user with details: "{string}"',(newUserDetails) => {
    assert.deepEqual(this.result,JSON.parse(newUserDetails));
});


