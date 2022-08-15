//SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

contract GiftCenter {

    uint public count;

    receive() external payable {  
    }

    event Gifted(uint count, address from, address to, string message, uint amount, uint time);
    event withDrawal(address from, uint amount);
    event currentAccount(address account);

    function sendGift(address _recipient, string memory _message) public payable {

        require(_recipient != msg.sender, "Can't gift yourself");
        require(msg.value > 0, "Add some gifting amount");
        
        count += 1;
        emit Gifted(count, msg.sender, _recipient, _message, msg.value, block.timestamp);
    }
    
    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function setAccount(address _account) external{
        emit currentAccount(_account);
    }

    function withdrawAmount(address _account, uint _amt) external {
        payable(_account).transfer(_amt);
        emit withDrawal(_account, _amt);
    }

    function resetCount() external{
        count = 0;
    }

}