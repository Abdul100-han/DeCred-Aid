// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/DeCredPassport.sol";

/**
 * @notice Deploy DeCredPassport to Base Sepolia (chain id 84532).
 * @dev    PRIVATE_KEY must be set. Then:
 *         forge script script/DeployDeCredPassport.s.sol --rpc-url base_sepolia --broadcast
 */
contract DeployDeCredPassport is Script {
    function run() external returns (DeCredPassport passport) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        passport = new DeCredPassport();
        vm.stopBroadcast();
    }
}
