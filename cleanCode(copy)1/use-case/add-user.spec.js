const {Given,When ,Then}=require('cucumber');
const Joi = require('joi');
const assert = require("assert");
const expect = require('chai').expect;

const makeAdduser = require('./addUserUsecase');

const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const userDb ={
    adduser:()=>{},
    emailExists:()=>{},
    addlabel:()=>{}
    // getUsersDetailByEmail: () => {},
}

const addUserStub = sandbox.stub(userDb,"adduser");
addUserStub.callsFake(({fname,emailId}) => {
    expect([fname,emailId]).deep.equal([
      this.username,
      this.email,
    ]);
    return {"id": 1};
  });

const addLabelStub = sandbox.stub(userDb,"addlabel");
addLabelStub.callsFake(() => {
  });

const emailExistStub = sandbox.stub(userDb,"emailExists");
emailExistStub.callsFake(({emailId}) => {
    expect([emailId]).deep.equal([
      this.email,
    ]);
    if(emailId=='priya.intwala@rapidops.com'){
        return true;
    }
    return false;
    
  });


// const getUsersDetailByEmailStub = sandbox.stub(userDb,'getUsersDetailByEmail')

Given("User details username: {string}, email: {string} to create new user",
(username, email) => {
  this.username = username || undefined;
  this.email = email || undefined;
});

// Given('Already existed user details: "{string}" with same email',
// (userDetailsByEmail)=>{
//     this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
// })

When("Try to add new user",async ()=>{
    try {
        const addUser = makeAdduser({Joi,addusertoDataAccess:userDb.adduser,userExistUsecase:userDb.emailExists,addLabels:userDb.addlabel});
        this.result = await addUser({ fname:this.username, emailId:this.email})
    } catch (error) {
        this.result  =error;
    }
})

Then('It will throw error with message: "{string}" while creating new user',(message)=>{
    assert.equal(this.result.message,message);
});

Then("adduser function will call {int} time while creating new user",(count)=>{
    sinon.assert.callCount(addUserStub,count);
 });

//  Then("addlabel function will call {int} time while creating new user",(count)=>{
//   sinon.assert.callCount(addLabelStub,count);
// });

// Then('GetUsersDetailByEmail function will call {int} time while creating new user',
//     (getUsersDetailByEmailFunctionCallCount) => {
//       sinon.assert.callCount(getUsersDetailByEmailStub, getUsersDetailByEmailFunctionCallCount);
//     },
// );
Then('It will create new user with details: "{string}"',(newUserDetails) => {
    assert.deepEqual(this.result,JSON.parse(newUserDetails));
});





