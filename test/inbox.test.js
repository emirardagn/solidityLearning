const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ["Hi there!"]})
        .send({from: accounts[0], gas: "1000000"});
});

describe('Inbox', () => {
    it("deploys a contract", () =>  {
        assert.ok(inbox.options.address); //contract var mı?
    });
    it("has a initial message", async ()=> {
        const message = await inbox.methods.message().call(); //mesaj Hi there! e eşit mi?
        assert.equal(message, "Hi there!")
    });
    it("can change message", async ()=> {
        await inbox.methods.setMessage("changed!").send({from: accounts[0]}) //solidity kodunda yazdığımız setMessage'ı denedik
        const message = await inbox.methods.message().call();
        assert.equal(message, "changed!")
    });
   

});