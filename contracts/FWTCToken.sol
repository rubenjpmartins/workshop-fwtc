//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FWTCToken is ERC20 {
  uint256 public constant MAX_SUPPLY = 1000000 ether;
  
  constructor(uint256 initialSupply) ERC20("Future Works", "FWTC") {
    _mint(msg.sender, initialSupply); 
  }

  function mint(address _to, uint256 _amount) public {
    uint256 amountAfterMint = totalSupply() + _amount;
    require(amountAfterMint <= MAX_SUPPLY, "_amount exceeds token availability");
    _mint(_to, _amount);
  }

  function burn(address _from, uint256 _amount) public {
    _burn(_from, _amount);
  }

  function specialMint(address _to, uint256 _amount) public payable {
    require(msg.value == _amount, "_amount needs to be the same as the ether sent");

    // Add some calculations so that the _amount that we mint can change
    _mint(_to, _amount);
  }
}
