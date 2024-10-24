export interface Asset {
  name: string,
  symbol: string;
  address: string,
  decimals: number,
  logoUrl?: string,
  strategyAddress?: string;
  balance?: any,
};


export const AssetMap: Record<string, Asset> = {
  WETH: {
    address: "0x94373a4919b3240d86ea41593d5eba789fef3848",
    strategyAddress: "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2",
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
  },
  stETH: {
    address: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    strategyAddress: "0x7D704507b76571a51d9caE8AdDAbBFd0ba0e63d3",
    name: "stETH",
    decimals: 18,
    symbol: "stETH",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  },
}

export const assets: Asset[] = [
  {
    address: "0x7322c24752f79c05ffd1e2a6fcb97020c1c264f1",
    strategyAddress: "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2",
    name: "rETH",
    symbol: "rETH",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/15060.png",
  },
  {
    address: "0x94373a4919b3240d86ea41593d5eba789fef3848",
    strategyAddress: "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2",
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
  },
  {
    address: "0x3f1c547b21f65e10480de3ad8e19faac46c95034",
    strategyAddress: "0x7D704507b76571a51d9caE8AdDAbBFd0ba0e63d3",
    name: "stETH",
    decimals: 18,
    symbol: "stETH",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  },
] 