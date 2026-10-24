// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DeCredPassport
 * @notice Non-Transferable Soulbound Token (SBT) for Decentralized Work & Skill Credentials.
 */
contract DeCredPassport is ERC721, Ownable {
    uint256 private _nextTokenId;

    struct Credential {
        string skillCategory;
        string ipfsMetadataHash; // Hash containing off-chain proof & ZK commitment
        address issuer;
        uint64 issuedAt;
        uint64 expiresAt;
        bool isValid;
    }

    // Token ID => Credential Metadata
    mapping(uint256 => Credential) public credentials;

    // Authorized NGO / Verifier Issuers
    mapping(address => bool) public authorizedIssuers;

    // Events
    event IssuerStatusUpdated(address indexed issuer, bool status);
    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed worker,
        address indexed issuer,
        string skillCategory,
        string ipfsMetadataHash
    );
    event CredentialRevoked(uint256 indexed tokenId);

    modifier onlyIssuer() {
        require(authorizedIssuers[msg.sender] || owner() == msg.sender, "DeCred: Caller not authorized issuer");
        _;
    }

    constructor() ERC721("DeCred Skill Passport", "DECRED") Ownable(msg.sender) {
        authorizedIssuers[msg.sender] = true;
    }

    function setIssuerStatus(address issuer, bool status) external onlyOwner {
        authorizedIssuers[issuer] = status;
        emit IssuerStatusUpdated(issuer, status);
    }

    function issueCredential(
        address worker,
        string calldata skillCategory,
        string calldata ipfsMetadataHash,
        uint64 expiresAt
    ) external onlyIssuer returns (uint256) {
        require(worker != address(0), "DeCred: Invalid worker address");

        uint256 tokenId = ++_nextTokenId;
        _safeMint(worker, tokenId);

        credentials[tokenId] = Credential({
            skillCategory: skillCategory,
            ipfsMetadataHash: ipfsMetadataHash,
            issuer: msg.sender,
            issuedAt: uint64(block.timestamp),
            expiresAt: expiresAt,
            isValid: true
        });

        emit CredentialIssued(tokenId, worker, msg.sender, skillCategory, ipfsMetadataHash);
        return tokenId;
    }

    function revokeCredential(uint256 tokenId) external {
        require(
            msg.sender == credentials[tokenId].issuer || msg.sender == owner(),
            "DeCred: Unauthorized to revoke"
        );
        require(credentials[tokenId].isValid, "DeCred: Already revoked");

        credentials[tokenId].isValid = false;
        emit CredentialRevoked(tokenId);
    }

    function verifyCredential(uint256 tokenId)
        external
        view
        returns (
            bool valid,
            string memory skillCategory,
            string memory ipfsMetadataHash,
            address issuer,
            uint64 issuedAt,
            uint64 expiresAt
        )
    {
        Credential memory cred = credentials[tokenId];
        bool isNotExpired = cred.expiresAt == 0 || block.timestamp <= cred.expiresAt;
        bool isCurrentlyValid = cred.isValid && isNotExpired;

        return (isCurrentlyValid, cred.skillCategory, cred.ipfsMetadataHash, cred.issuer, cred.issuedAt, cred.expiresAt);
    }

    /**
     * @notice Enforce Soulbound Token (SBT) non-transferability.
     */
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);

        // Allow initial minting (from == address(0)), block subsequent transfers
        if (from != address(0) && to != address(0)) {
            revert("DeCred: Soulbound tokens cannot be transferred");
        }

        return super._update(to, tokenId, auth);
    }
}
