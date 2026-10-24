// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DeCredPassport.sol";

contract DeCredPassportTest is Test {
    DeCredPassport public passport;
    address public admin = address(1);
    address public ngoIssuer = address(2);
    address public worker = address(3);

    function setUp() public {
        vm.prank(admin);
        passport = new DeCredPassport();

        vm.prank(admin);
        passport.setIssuerStatus(ngoIssuer, true);
    }

    function test_IssueCredential() public {
        vm.prank(ngoIssuer);
        uint256 tokenId = passport.issueCredential(worker, "Carpentry", "QmHash123", 0);

        assertEq(passport.ownerOf(tokenId), worker);
        (bool valid, string memory category,,,,) = passport.verifyCredential(tokenId);
        assertTrue(valid);
        assertEq(category, "Carpentry");
    }

    function test_RevertOnTransfer() public {
        vm.prank(ngoIssuer);
        uint256 tokenId = passport.issueCredential(worker, "Carpentry", "QmHash123", 0);

        vm.prank(worker);
        vm.expectRevert("DeCred: Soulbound tokens cannot be transferred");
        passport.transferFrom(worker, address(4), tokenId);
    }

    function test_RevertWhenCallerIsNotIssuer() public {
        vm.expectRevert("DeCred: Caller not authorized issuer");
        passport.issueCredential(worker, "Carpentry", "QmHash123", 0);
    }

    function test_RevokeCredential() public {
        vm.prank(ngoIssuer);
        uint256 tokenId = passport.issueCredential(worker, "Solar", "QmHash456", 0);

        vm.prank(ngoIssuer);
        passport.revokeCredential(tokenId);

        (bool valid,,,,,) = passport.verifyCredential(tokenId);
        assertFalse(valid);
        assertEq(passport.ownerOf(tokenId), worker);
    }

    function test_ExpiredCredentialIsInvalid() public {
        uint64 expiresAt = uint64(block.timestamp + 1 days);
        vm.prank(ngoIssuer);
        uint256 tokenId = passport.issueCredential(worker, "Frontend", "QmHash789", expiresAt);

        vm.warp(block.timestamp + 2 days);
        (bool valid,,,,,) = passport.verifyCredential(tokenId);
        assertFalse(valid);
    }
}
