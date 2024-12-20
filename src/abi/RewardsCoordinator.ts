export const ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_delegationManager",
        type: "address",
        internalType: "contract IDelegationManager",
      },
      {
        name: "_strategyManager",
        type: "address",
        internalType: "contract IStrategyManager",
      },
      {
        name: "_CALCULATION_INTERVAL_SECONDS",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "_MAX_REWARDS_DURATION", type: "uint32", internalType: "uint32" },
      {
        name: "_MAX_RETROACTIVE_LENGTH",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "_MAX_FUTURE_LENGTH", type: "uint32", internalType: "uint32" },
      {
        name: "__GENESIS_REWARDS_TIMESTAMP",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "CALCULATION_INTERVAL_SECONDS",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "GENESIS_REWARDS_TIMESTAMP",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_FUTURE_LENGTH",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_RETROACTIVE_LENGTH",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_REWARDS_DURATION",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "activationDelay",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "beaconChainETHStrategy",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IStrategy" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calculateEarnerLeafHash",
    inputs: [
      {
        name: "leaf",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.EarnerTreeMerkleLeaf",
        components: [
          { name: "earner", type: "address", internalType: "address" },
          { name: "earnerTokenRoot", type: "bytes32", internalType: "bytes32" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "calculateTokenLeafHash",
    inputs: [
      {
        name: "leaf",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.TokenTreeMerkleLeaf",
        components: [
          { name: "token", type: "address", internalType: "contract IERC20" },
          {
            name: "cumulativeEarnings",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "checkClaim",
    inputs: [
      {
        name: "claim",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.RewardsMerkleClaim",
        components: [
          { name: "rootIndex", type: "uint32", internalType: "uint32" },
          { name: "earnerIndex", type: "uint32", internalType: "uint32" },
          { name: "earnerTreeProof", type: "bytes", internalType: "bytes" },
          {
            name: "earnerLeaf",
            type: "tuple",
            internalType: "struct IRewardsCoordinator.EarnerTreeMerkleLeaf",
            components: [
              { name: "earner", type: "address", internalType: "address" },
              {
                name: "earnerTokenRoot",
                type: "bytes32",
                internalType: "bytes32",
              },
            ],
          },
          { name: "tokenIndices", type: "uint32[]", internalType: "uint32[]" },
          { name: "tokenTreeProofs", type: "bytes[]", internalType: "bytes[]" },
          {
            name: "tokenLeaves",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.TokenTreeMerkleLeaf[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "contract IERC20",
              },
              {
                name: "cumulativeEarnings",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimerFor",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAVSRewardsSubmission",
    inputs: [
      {
        name: "rewardsSubmissions",
        type: "tuple[]",
        internalType: "struct IRewardsCoordinator.RewardsSubmission[]",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createRewardsForAllEarners",
    inputs: [
      {
        name: "rewardsSubmissions",
        type: "tuple[]",
        internalType: "struct IRewardsCoordinator.RewardsSubmission[]",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createRewardsForAllSubmission",
    inputs: [
      {
        name: "rewardsSubmissions",
        type: "tuple[]",
        internalType: "struct IRewardsCoordinator.RewardsSubmission[]",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cumulativeClaimed",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "contract IERC20" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "currRewardsCalculationEndTimestamp",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "delegationManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IDelegationManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "disableRoot",
    inputs: [{ name: "rootIndex", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "domainSeparator",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentClaimableDistributionRoot",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.DistributionRoot",
        components: [
          { name: "root", type: "bytes32", internalType: "bytes32" },
          {
            name: "rewardsCalculationEndTimestamp",
            type: "uint32",
            internalType: "uint32",
          },
          { name: "activatedAt", type: "uint32", internalType: "uint32" },
          { name: "disabled", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentDistributionRoot",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.DistributionRoot",
        components: [
          { name: "root", type: "bytes32", internalType: "bytes32" },
          {
            name: "rewardsCalculationEndTimestamp",
            type: "uint32",
            internalType: "uint32",
          },
          { name: "activatedAt", type: "uint32", internalType: "uint32" },
          { name: "disabled", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDistributionRootAtIndex",
    inputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.DistributionRoot",
        components: [
          { name: "root", type: "bytes32", internalType: "bytes32" },
          {
            name: "rewardsCalculationEndTimestamp",
            type: "uint32",
            internalType: "uint32",
          },
          { name: "activatedAt", type: "uint32", internalType: "uint32" },
          { name: "disabled", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDistributionRootsLength",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRootIndexFromHash",
    inputs: [{ name: "rootHash", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "globalOperatorCommissionBips",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "initialOwner", type: "address", internalType: "address" },
      {
        name: "_pauserRegistry",
        type: "address",
        internalType: "contract IPauserRegistry",
      },
      { name: "initialPausedStatus", type: "uint256", internalType: "uint256" },
      { name: "_rewardsUpdater", type: "address", internalType: "address" },
      { name: "_activationDelay", type: "uint32", internalType: "uint32" },
      { name: "_globalCommissionBips", type: "uint16", internalType: "uint16" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAVSRewardsSubmissionHash",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRewardsForAllSubmitter",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRewardsSubmissionForAllEarnersHash",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRewardsSubmissionForAllHash",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "operatorCommissionBips",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [
      { name: "newPausedStatus", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "pauseAll",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [{ name: "index", type: "uint8", internalType: "uint8" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pauserRegistry",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IPauserRegistry" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "processClaim",
    inputs: [
      {
        name: "claim",
        type: "tuple",
        internalType: "struct IRewardsCoordinator.RewardsMerkleClaim",
        components: [
          { name: "rootIndex", type: "uint32", internalType: "uint32" },
          { name: "earnerIndex", type: "uint32", internalType: "uint32" },
          { name: "earnerTreeProof", type: "bytes", internalType: "bytes" },
          {
            name: "earnerLeaf",
            type: "tuple",
            internalType: "struct IRewardsCoordinator.EarnerTreeMerkleLeaf",
            components: [
              { name: "earner", type: "address", internalType: "address" },
              {
                name: "earnerTokenRoot",
                type: "bytes32",
                internalType: "bytes32",
              },
            ],
          },
          { name: "tokenIndices", type: "uint32[]", internalType: "uint32[]" },
          { name: "tokenTreeProofs", type: "bytes[]", internalType: "bytes[]" },
          {
            name: "tokenLeaves",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.TokenTreeMerkleLeaf[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "contract IERC20",
              },
              {
                name: "cumulativeEarnings",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
      { name: "recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rewardsUpdater",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setActivationDelay",
    inputs: [
      { name: "_activationDelay", type: "uint32", internalType: "uint32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setClaimerFor",
    inputs: [{ name: "claimer", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGlobalOperatorCommission",
    inputs: [
      { name: "_globalCommissionBips", type: "uint16", internalType: "uint16" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPauserRegistry",
    inputs: [
      {
        name: "newPauserRegistry",
        type: "address",
        internalType: "contract IPauserRegistry",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRewardsForAllSubmitter",
    inputs: [
      { name: "_submitter", type: "address", internalType: "address" },
      { name: "_newValue", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRewardsUpdater",
    inputs: [
      { name: "_rewardsUpdater", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "strategyManager",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IStrategyManager" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "submissionNonce",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "submitRoot",
    inputs: [
      { name: "root", type: "bytes32", internalType: "bytes32" },
      {
        name: "rewardsCalculationEndTimestamp",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpause",
    inputs: [
      { name: "newPausedStatus", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AVSRewardsSubmissionCreated",
    inputs: [
      { name: "avs", type: "address", indexed: true, internalType: "address" },
      {
        name: "submissionNonce",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "rewardsSubmissionHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "rewardsSubmission",
        type: "tuple",
        indexed: false,
        internalType: "struct IRewardsCoordinator.RewardsSubmission",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ActivationDelaySet",
    inputs: [
      {
        name: "oldActivationDelay",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "newActivationDelay",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ClaimerForSet",
    inputs: [
      {
        name: "earner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldClaimer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "claimer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DistributionRootDisabled",
    inputs: [
      {
        name: "rootIndex",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DistributionRootSubmitted",
    inputs: [
      {
        name: "rootIndex",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      { name: "root", type: "bytes32", indexed: true, internalType: "bytes32" },
      {
        name: "rewardsCalculationEndTimestamp",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "activatedAt",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GlobalCommissionBipsSet",
    inputs: [
      {
        name: "oldGlobalCommissionBips",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "newGlobalCommissionBips",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      { name: "version", type: "uint8", indexed: false, internalType: "uint8" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newPausedStatus",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PauserRegistrySet",
    inputs: [
      {
        name: "pauserRegistry",
        type: "address",
        indexed: false,
        internalType: "contract IPauserRegistry",
      },
      {
        name: "newPauserRegistry",
        type: "address",
        indexed: false,
        internalType: "contract IPauserRegistry",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsClaimed",
    inputs: [
      {
        name: "root",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "earner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "claimer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "contract IERC20",
      },
      {
        name: "claimedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsForAllSubmitterSet",
    inputs: [
      {
        name: "rewardsForAllSubmitter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "oldValue", type: "bool", indexed: true, internalType: "bool" },
      { name: "newValue", type: "bool", indexed: true, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsSubmissionForAllCreated",
    inputs: [
      {
        name: "submitter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "submissionNonce",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "rewardsSubmissionHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "rewardsSubmission",
        type: "tuple",
        indexed: false,
        internalType: "struct IRewardsCoordinator.RewardsSubmission",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsSubmissionForAllEarnersCreated",
    inputs: [
      {
        name: "tokenHopper",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "submissionNonce",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "rewardsSubmissionHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "rewardsSubmission",
        type: "tuple",
        indexed: false,
        internalType: "struct IRewardsCoordinator.RewardsSubmission",
        components: [
          {
            name: "strategiesAndMultipliers",
            type: "tuple[]",
            internalType: "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            components: [
              {
                name: "strategy",
                type: "address",
                internalType: "contract IStrategy",
              },
              { name: "multiplier", type: "uint96", internalType: "uint96" },
            ],
          },
          { name: "token", type: "address", internalType: "contract IERC20" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "startTimestamp", type: "uint32", internalType: "uint32" },
          { name: "duration", type: "uint32", internalType: "uint32" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsUpdaterSet",
    inputs: [
      {
        name: "oldRewardsUpdater",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newRewardsUpdater",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newPausedStatus",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
