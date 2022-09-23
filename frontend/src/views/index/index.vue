<template>  
  <div class="parent">    
    <h1>King of the fools</h1>
    <h2 v-if="connected && isKing">You are the king of the fools</h2>
    <button @click="connect" v-if="!connected" class="connect">Connect Wallet</button>
    <div v-if="connected" class="line">already connected to your wallet</div>
    <div class="line">
      My Address: {{address}}
    </div>
    <div class="line">
      My Ether: {{balance}} ETH
    </div>
    <br>
    <h3>Deposit</h3>
    <div class="line">
      amount:<input type="number" v-model="amount"/> ETH
    </div>    
    <button @click="deposit" class="deposit">Deposit</button>
    <h3>King's Information</h3>
    <div class="line">
      king address: {{king_addr}}      
    </div>
    <div class="line">
      king balance: {{king_balance}} ETH
    </div>    
    <button @click="refresh" class="deposit">Refresh</button>
  </div>  
</template>

<script>
import { CONSTANT } from '../../utils/globals.js';
import Web3  from "web3"
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      address:'',
      balance: 0,
      connected: false,
      king_addr:'',
      king_balance: 0,
      amount:0.001,
      isKing:false,
    }  
  },
  mounted(){        
  },
  methods: {
    async connect(){
      if (window.ethereum != undefined) {   
        var acc = await window.ethereum.request(
            {method:'eth_requestAccounts'}).then(
                result => {                            
                        const www3 = new Web3(window.ethereum)
                        window.web3 = www3
                        return result[0]
                    })
        
        this.address = acc;        
        const netId = await this.getChainID();      
        console.log(netId);
        if(netId != 4) {
          alert("wrong network, please switch to Rinkeby Test Network");
          return;
        }
        this.connected = true;
        this.balance = await this.getBalance();
        this.refresh();
      }else{
          alert("please open this in Chrome with MetaMask");
          return false;
      }     
    },
    async getChainID() {
        try{
            const netId = await window.web3.eth.getChainId();
            return netId;
        }catch(error){
            console.log(error);
            return "error";
        }            
    },
    async getBalance() {
        try{
            const balance = await window.web3.eth.getBalance(this.address);
            return balance / 1000000000000000000;
        }catch(error){
            console.log(error);
            return "error";
        }            
    },
    async refresh() {
      if(!this.connected) {
        alert('please connect wallet first');
        return ;
      }
      try{
        const token_contract = new window.web3.eth.Contract(CONSTANT.abi, CONSTANT.contract_address);
        this.king_addr = await token_contract.methods.getKing().call();
        this.king_balance = await token_contract.methods.getKingBalance().call() / 1000000000000000000;
      }catch(error){
          console.log(error);
          return "error";
      }            
      if(this.address.toLowerCase() == this.king_addr.toLowerCase())
        this.isKing = true;
      else 
        this.isKing = false;
    },   
    async deposit() { 
      if(!this.connected) {
        alert('please connect wallet first');
        return ;
      }     
      try{
        const token_contract = new window.web3.eth.Contract(CONSTANT.abi, CONSTANT.contract_address);
        const gasPrice = await window.web3.eth.getGasPrice();
        token_contract.methods.deposit().send({
            from: this.address,
            value: this.amount * 1000000000000000000,
            gasPrice: gasPrice,
            gas: 100000,
        }, function (err, res) {
            
        })
      }catch(error){
          console.log(error);
          return "error";
      }
    },
  }
}
</script>

<style scoped>
.parent{
  width:100%;
  height: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  padding: 20px;
}
.deposit,.connect{
  margin-top: 20px;
}
@media (min-width: 750px) {
  .content {
    width: 500px;
  }
}
.line{
  margin-top:20px;
}
</style>
