import _ from "lodash"

const ret = [
    {
        "name": "Bitcoin",
        "symbol": "BTC",
        "icon": "https://static.crypto.com/token/icons/bitcoin/color_icon.png"
    },
    {
        "name": "Ethereum",
        "symbol": "ETH",
        "icon": "https://static.crypto.com/token/icons/ethereum/color_icon.png"
    },
    {
        "name": "Tether",
        "symbol": "USDT",
        "icon": "https://static.crypto.com/token/icons/tether/color_icon.png"
    },
    {
        "name": "BNB",
        "symbol": "BNB",
        "icon": "https://static.crypto.com/token/icons/bnb/color_icon.png"
    },
    {
        "name": "Solana",
        "symbol": "SOL",
        "icon": "https://static.crypto.com/token/icons/solana/color_icon.png"
    },
    {
        "name": "USD Coin",
        "symbol": "USDC",
        "icon": "https://static.crypto.com/token/icons/usd-coin/color_icon.png"
    },
    {
        "name": "XRP",
        "symbol": "XRP",
        "icon": "https://static.crypto.com/token/icons_v2/xrp/20-1712605310573.png"
    },
    {
        "name": "Toncoin",
        "symbol": "TON",
        "icon": "https://static.crypto.com/token/icons_v2/toncoin/6090-1712604993887.png"
    },
    {
        "name": "Dogecoin",
        "symbol": "DOGE",
        "icon": "https://static.crypto.com/token/icons/dogecoin/color_icon.png"
    },
    {
        "name": "Cardano",
        "symbol": "ADA",
        "icon": "https://static.crypto.com/token/icons/cardano/color_icon.png"
    },
    {
        "name": "TRON",
        "symbol": "TRX",
        "icon": "https://static.crypto.com/token/icons/tron/color_icon.png"
    },
    {
        "name": "Avalanche",
        "symbol": "AVAX",
        "icon": "https://static.crypto.com/token/icons/avalanche/color_icon.png"
    },
    {
        "name": "Wrapped Bitcoin",
        "symbol": "WBTC",
        "icon": "https://static.crypto.com/token/icons/wrapped-bitcoin/color_icon.png"
    },
    {
        "name": "Shiba Inu",
        "symbol": "SHIB",
        "icon": "https://static.crypto.com/token/icons_v2/shiba-inu/2283-1712604923561.png"
    },
    {
        "name": "Polkadot",
        "symbol": "DOT",
        "icon": "https://static.crypto.com/token/icons_v2/polkadot-new/2511-1712603986310.png"
    },
    {
        "name": "Chainlink",
        "symbol": "LINK",
        "icon": "https://static.crypto.com/token/icons_v2/chainlink/426-1712604244006.png"
    },
    {
        "name": "Bitcoin Cash",
        "symbol": "BCH",
        "icon": "https://static.crypto.com/token/icons/bitcoin-cash/color_icon.png"
    },
    {
        "name": "NEAR Protocol",
        "symbol": "NEAR",
        "icon": "https://static.crypto.com/token/icons_v2/near-protocol/2464-1712604406859.png"
    },
    {
        "name": "Dai",
        "symbol": "DAI",
        "icon": "https://static.crypto.com/token/icons/multi-collateral-dai/color_icon.png"
    },
    {
        "name": "UNUS SED LEO",
        "symbol": "LEO",
        "icon": "https://static.crypto.com/token/icons/unus-sed-leo/color_icon.png"
    },
    {
        "name": "Litecoin",
        "symbol": "LTC",
        "icon": "https://static.crypto.com/token/icons_v2/litecoin/2-1712604308326.png"
    },
    {
        "name": "Polygon",
        "symbol": "MATIC",
        "icon": "https://static.crypto.com/token/icons_v2/polygon/1381-1712604337267.png"
    },
    {
        "name": "Uniswap",
        "symbol": "UNI",
        "icon": "https://static.crypto.com/token/icons/uniswap/color_icon.png"
    },
    {
        "name": "Pepe",
        "symbol": "PEPE",
        "icon": "https://static.crypto.com/token/icons/pepe/color_icon.png"
    },
    {
        "name": "Kaspa",
        "symbol": "KAS",
        "icon": "https://static.crypto.com/token/icons/kaspa/color_icon.png"
    },
    {
        "name": "Internet Computer",
        "symbol": "ICP",
        "icon": "https://static.crypto.com/token/icons_v2/internet-computer/3251-1712604108977.png"
    },
    {
        "name": "Ethereum Classic",
        "symbol": "ETC",
        "icon": "https://static.crypto.com/token/icons/ethereum-classic/color_icon.png"
    },
    {
        "name": "Artificial Superintelligence Alliance",
        "symbol": "FET",
        "icon": "https://static.crypto.com/token/icons_v2/fetch/1307-1719972645606.png"
    },
    {
        "name": "Monero",
        "symbol": "XMR",
        "icon": "https://static.crypto.com/token/icons/monero/color_icon.png"
    },
    {
        "name": "Aptos",
        "symbol": "APT",
        "icon": "https://static.crypto.com/token/icons/aptos/color_icon.png"
    },
    {
        "name": "Render Token",
        "symbol": "RNDR",
        "icon": "https://static.crypto.com/token/icons_v2/render-token/2123-1708937408904.png"
    },
    {
        "name": "Stellar",
        "symbol": "XLM",
        "icon": "https://static.crypto.com/token/icons_v2/stellar/101-1712605249931.png"
    },
    {
        "name": "Hedera",
        "symbol": "HBAR",
        "icon": "https://static.crypto.com/token/icons/hedera/color_icon.png"
    },
    {
        "name": "OKB",
        "symbol": "OKB",
        "icon": "https://static.crypto.com/token/icons/okb/color_icon.png"
    },
    {
        "name": "Cosmos",
        "symbol": "ATOM",
        "icon": "https://static.crypto.com/token/icons_v2/cosmos/1322-1712603903733.png"
    },
    {
        "name": "Arbitrum",
        "symbol": "ARB",
        "icon": "https://static.crypto.com/token/icons/arbitrum/color_icon.png"
    },
    {
        "name": "Mantle",
        "symbol": "MNT",
        "icon": "https://static.crypto.com/token/icons/mantle/color_icon.png"
    },
    {
        "name": "Cronos",
        "symbol": "CRO",
        "icon": "https://static.crypto.com/token/icons_v2/crypto-com-coin/9855-1712603955281.png"
    },
    {
        "name": "Filecoin",
        "symbol": "FIL",
        "icon": "https://static.crypto.com/token/icons/filecoin/color_icon.png"
    },
    {
        "name": "Stacks",
        "symbol": "STX",
        "icon": "https://static.crypto.com/token/icons/stacks/color_icon.png"
    },
    {
        "name": "Immutable X",
        "symbol": "IMX",
        "icon": "https://static.crypto.com/token/icons_v2/immutable-x/4911-1712604144488.png"
    },
    {
        "name": "Maker",
        "symbol": "MKR",
        "icon": "https://static.crypto.com/token/icons_v2/maker/275-1712604355191.png"
    },
    {
        "name": "First Digital USD",
        "symbol": "FDUSD",
        "icon": "https://static.crypto.com/token/icons/first-digital-usd/color_icon.png"
    },
    {
        "name": "VeChain",
        "symbol": "VET",
        "icon": "https://static.crypto.com/token/icons/vechain/color_icon.png"
    },
    {
        "name": "Injective",
        "symbol": "INJ",
        "icon": "https://static.crypto.com/token/icons/injective-protocol/color_icon.png"
    },
    {
        "name": "Sui",
        "symbol": "SUI",
        "icon": "https://static.crypto.com/token/icons/sui/color_icon.png"
    },
    {
        "name": "dogwifhat",
        "symbol": "$WIF",
        "icon": "https://static.crypto.com/token/icons/dogwifhat/color_icon.png"
    },
    {
        "name": "The Graph",
        "symbol": "GRT",
        "icon": "https://static.crypto.com/token/icons_v2/the-graph/2552-1712604090072.png"
    },
    {
        "name": "Optimism",
        "symbol": "OP",
        "icon": "https://static.crypto.com/token/icons/optimism-ethereum/color_icon.png"
    },
    {
        "name": "Arweave",
        "symbol": "AR",
        "icon": "https://static.crypto.com/token/icons_v2/arweave/2099-1712603868121.png"
    },
    {
        "name": "Lido DAO Token",
        "symbol": "LDO",
        "icon": "https://static.crypto.com/token/icons/lido-dao/color_icon.png"
    },
    {
        "name": "Bitget Token",
        "symbol": "BGB",
        "icon": "https://static.crypto.com/token/icons/bitget-token-new/color_icon.png"
    },
    {
        "name": "Bonk",
        "symbol": "BONK",
        "icon": "https://static.crypto.com/token/icons/bonk1/color_icon.png"
    },
    {
        "name": "Ondo",
        "symbol": "ONDO",
        "icon": "https://static.crypto.com/token/icons_v2/ondo-finance/20227-1712604806251.png"
    },
    {
        "name": "Floki",
        "symbol": "FLOKI",
        "icon": "https://static.crypto.com/token/icons/floki-inu/color_icon.png"
    },
    {
        "name": "Theta Network",
        "symbol": "THETA",
        "icon": "https://static.crypto.com/token/icons/theta-network/color_icon.png"
    },
    {
        "name": "Fantom",
        "symbol": "FTM",
        "icon": "https://static.crypto.com/token/icons_v2/fantom/1175-1712604005885.png"
    },
    {
        "name": "WhiteBIT Token",
        "symbol": "WBT",
        "icon": "https://static.crypto.com/token/icons/whitebit-token/color_icon.png"
    },
    {
        "name": "THORChain",
        "symbol": "RUNE",
        "icon": "https://static.crypto.com/token/icons/thorchain/color_icon.png"
    },
    {
        "name": "Aave",
        "symbol": "AAVE",
        "icon": "https://static.crypto.com/token/icons/aave/color_icon.png"
    },
    {
        "name": "Notcoin",
        "symbol": "NOT",
        "icon": "https://static.crypto.com/token/icons/notcoin/color_icon.png"
    },
    {
        "name": "JasmyCoin",
        "symbol": "JASMY",
        "icon": "https://static.crypto.com/token/icons/jasmy/color_icon.png"
    },
    {
        "name": "Algorand",
        "symbol": "ALGO",
        "icon": "https://static.crypto.com/token/icons_v2/algorand/1464-1712603787034.png"
    },
    {
        "name": "Pyth Network",
        "symbol": "PYTH",
        "icon": "https://static.crypto.com/token/icons/pyth-network/color_icon.png"
    },
    {
        "name": "Jupiter",
        "symbol": "JUP",
        "icon": "https://static.crypto.com/token/icons/jupiter-ag/color_icon.png"
    },
    {
        "name": "Celestia",
        "symbol": "TIA",
        "icon": "https://static.crypto.com/token/icons/celestia/color_icon.png"
    },
    {
        "name": "FLARE",
        "symbol": "FLR",
        "icon": "https://static.crypto.com/token/icons/spark-flare/color_icon.png"
    },
    {
        "name": "Sei",
        "symbol": "SEI",
        "icon": "https://static.crypto.com/token/icons/sei/color_icon.png"
    },
    {
        "name": "KuCoin Token",
        "symbol": "KCS",
        "icon": "https://static.crypto.com/token/icons/kucoin-token/color_icon.png"
    },
    {
        "name": "Quant",
        "symbol": "QNT",
        "icon": "https://static.crypto.com/token/icons_v2/quant/996-1712604845357.png"
    },
    {
        "name": "StarkNet",
        "symbol": "STRK",
        "icon": "https://static.crypto.com/token/icons_v2/starknet-token/20611-1708433875467.png"
    },
    {
        "name": "Flow",
        "symbol": "FLOW",
        "icon": "https://static.crypto.com/token/icons/flow/color_icon.png"
    },
    {
        "name": "Ethereum Name Service",
        "symbol": "ENS",
        "icon": "https://static.crypto.com/token/icons/ethereum-name-service/color_icon.png"
    },
    {
        "name": "EOS",
        "symbol": "EOS",
        "icon": "https://static.crypto.com/token/icons/eos/color_icon.png"
    },
    {
        "name": "MultiversX",
        "symbol": "EGLD",
        "icon": "https://static.crypto.com/token/icons_v2/elrond-egld/3295-1698379482177.png"
    },
    {
        "name": "Axie Infinity",
        "symbol": "AXS",
        "icon": "https://static.crypto.com/token/icons/axie-infinity/color_icon.png"
    },
    {
        "name": "Tokenize Xchange",
        "symbol": "TKX",
        "icon": "https://static.crypto.com/token/icons/tokenize-xchange/color_icon.png"
    },
    {
        "name": "Bitcoin SV",
        "symbol": "BSV",
        "icon": "https://static.crypto.com/token/icons/bitcoin-sv/color_icon.png"
    },
    {
        "name": "Gala",
        "symbol": "GALA",
        "icon": "https://static.crypto.com/token/icons_v2/gala/3404-1712604025547.png"
    },
    {
        "name": "BitTorrent",
        "symbol": "BTT",
        "icon": "https://static.crypto.com/token/icons/bittorrent-new/color_icon.png"
    },
    {
        "name": "Akash Network",
        "symbol": "AKT",
        "icon": "https://static.crypto.com/token/icons/akash-network/color_icon.png"
    },
    {
        "name": "Beam",
        "symbol": "beam",
        "icon": "https://static.crypto.com/token/icons_v2/onbeam/19408-1700030568478.png"
    },
    {
        "name": "Ethena",
        "symbol": "ENA",
        "icon": "https://static.crypto.com/token/icons/ethena/color_icon.png"
    },
    {
        "name": "Neo",
        "symbol": "NEO",
        "icon": "https://static.crypto.com/token/icons/neo/color_icon.png"
    },
    {
        "name": "Tezos",
        "symbol": "XTZ",
        "icon": "https://static.crypto.com/token/icons/tezos/color_icon.png"
    },
    {
        "name": "USDD",
        "symbol": "USDD",
        "icon": "https://static.crypto.com/token/icons/usdd/color_icon.png"
    },
    {
        "name": "dYdX",
        "symbol": "DYDX",
        "icon": "https://static.crypto.com/token/icons/dydx-chain/color_icon.png"
    },
    {
        "name": "Ordinals",
        "symbol": "ORDI",
        "icon": "https://static.crypto.com/token/icons/ordinals/color_icon.png"
    },
    {
        "name": "The Sandbox",
        "symbol": "SAND",
        "icon": "https://static.crypto.com/token/icons/the-sandbox/color_icon.png"
    },
    {
        "name": "Gnosis",
        "symbol": "GNO",
        "icon": "https://static.crypto.com/token/icons/gnosis-gno/color_icon.png"
    },
    {
        "name": "GateToken",
        "symbol": "GT",
        "icon": "https://static.crypto.com/token/icons/gatetoken/color_icon.png"
    },
    {
        "name": "Fasttoken",
        "symbol": "FTN",
        "icon": "https://static.crypto.com/token/icons/fasttoken/color_icon.png"
    },
    {
        "name": "SingularityNET",
        "symbol": "AGIX",
        "icon": "https://static.crypto.com/token/icons_v2/singularitynet/623-1712548159588.png"
    },
    {
        "name": "Frax",
        "symbol": "FRAX",
        "icon": "https://static.crypto.com/token/icons/frax/color_icon.png"
    },
    {
        "name": "Pendle",
        "symbol": "PENDLE",
        "icon": "https://static.crypto.com/token/icons/pendle/color_icon.png"
    },
    {
        "name": "Nexo",
        "symbol": "NEXO",
        "icon": "https://static.crypto.com/token/icons/nexo/color_icon.png"
    },
    {
        "name": "Conflux",
        "symbol": "CFX",
        "icon": "https://static.crypto.com/token/icons/conflux-network/color_icon.png"
    },
    {
        "name": "Ronin",
        "symbol": "RON",
        "icon": "https://static.crypto.com/token/icons/ronin/color_icon.png"
    },
    {
        "name": "zkSync",
        "symbol": "ZK",
        "icon": "https://static.crypto.com/token/icons_v2/zksync-cdc/22842-1718612651470.png"
    },
    {
        "name": "Chiliz",
        "symbol": "CHZ",
        "icon": "https://static.crypto.com/token/icons/chiliz/color_icon.png"
    },
    {
        "name": "Oasis Network",
        "symbol": "ROSE",
        "icon": "https://static.crypto.com/token/icons/oasis-network/color_icon.png"
    },
    {
        "name": "Synthetix",
        "symbol": "SNX",
        "icon": "https://static.crypto.com/token/icons_v2/synthetix-network-token/725-1712604970904.png"
    },
    {
        "name": "Decentraland",
        "symbol": "MANA",
        "icon": "https://static.crypto.com/token/icons/decentraland/color_icon.png"
    },
    {
        "name": "Safe",
        "symbol": "SAFE",
        "icon": "https://static.crypto.com/token/icons/safe1/color_icon.png"
    },
    {
        "name": "Worldcoin",
        "symbol": "WLD",
        "icon": "https://static.crypto.com/token/icons_v2/worldcoin-org/18743-1712605175642.png"
    },
    {
        "name": "BOOK OF MEME",
        "symbol": "BOME",
        "icon": "https://static.crypto.com/token/icons/book-of-meme/color_icon.png"
    },
    {
        "name": "Tether Gold",
        "symbol": "XAUT",
        "icon": "https://static.crypto.com/token/icons/tether-gold/color_icon.png"
    },
    {
        "name": "eCash",
        "symbol": "XEC",
        "icon": "https://static.crypto.com/token/icons/ecash/color_icon.png"
    },
    {
        "name": "Wormhole",
        "symbol": "W",
        "icon": "https://static.crypto.com/token/icons/wormhole/color_icon.png"
    },
    {
        "name": "Mina",
        "symbol": "MINA",
        "icon": "https://static.crypto.com/token/icons/mina/color_icon.png"
    },
    {
        "name": "Helium",
        "symbol": "HNT",
        "icon": "https://static.crypto.com/token/icons/helium/color_icon.png"
    },
    {
        "name": "Klaytn",
        "symbol": "KLAY",
        "icon": "https://static.crypto.com/token/icons/klaytn/color_icon.png"
    },
    {
        "name": "AIOZ Network",
        "symbol": "AIOZ",
        "icon": "https://static.crypto.com/token/icons_v2/aioz-network/4047-1708940215680.png"
    },
    {
        "name": "IOTA",
        "symbol": "IOTA",
        "icon": "https://static.crypto.com/token/icons/iota/color_icon.png"
    },
    {
        "name": "MOG Coin",
        "symbol": "MOG",
        "icon": "https://static.crypto.com/token/icons_v2/mog-coin/18724-1717376885547.png"
    },
    {
        "name": "ApeCoin",
        "symbol": "APE",
        "icon": "https://static.crypto.com/token/icons/apecoin-ape/color_icon.png"
    },
    {
        "name": "PancakeSwap",
        "symbol": "CAKE",
        "icon": "https://static.crypto.com/token/icons/pancakeswap/color_icon.png"
    },
    {
        "name": "TrueUSD",
        "symbol": "TUSD",
        "icon": "https://static.crypto.com/token/icons_v2/trueusd/708-1712605089566.png"
    },
    {
        "name": "WEMIX",
        "symbol": "WEMIX",
        "icon": "https://static.crypto.com/token/icons_v2/wemix/3665-1719562167548.png"
    },
    {
        "name": "Livepeer",
        "symbol": "LPT",
        "icon": "https://static.crypto.com/token/icons_v2/livepeer/1217-1712604287280.png"
    },
    {
        "name": "Nervos Network",
        "symbol": "CKB",
        "icon": "https://static.crypto.com/token/icons/nervos-network/color_icon.png"
    },
    {
        "name": "Popcat",
        "symbol": "POPCAT",
        "icon": "https://static.crypto.com/token/icons/popcat-sol/color_icon.png"
    },
    {
        "name": "Theta Fuel",
        "symbol": "TFUEL",
        "icon": "https://static.crypto.com/token/icons/theta-fuel/color_icon.png"
    },
    {
        "name": "1inch Network",
        "symbol": "1INCH",
        "icon": "https://static.crypto.com/token/icons/1inch/color_icon.png"
    },
    {
        "name": "APENFT",
        "symbol": "NFT",
        "icon": "https://static.crypto.com/token/icons/apenft/color_icon.png"
    },
    {
        "name": "Raydium",
        "symbol": "RAY",
        "icon": "https://static.crypto.com/token/icons/raydium/color_icon.png"
    },
    {
        "name": "Axelar",
        "symbol": "AXL",
        "icon": "https://static.crypto.com/token/icons_v2/axelar/13669-1712603926129.png"
    },
    {
        "name": "PAX Gold",
        "symbol": "PAXG",
        "icon": "https://static.crypto.com/token/icons/pax-gold/color_icon.png"
    },
    {
        "name": "Trust Wallet Token",
        "symbol": "TWT",
        "icon": "https://static.crypto.com/token/icons/trust-wallet-token/color_icon.png"
    },
    {
        "name": "Bitcoin Gold",
        "symbol": "BTG",
        "icon": "https://static.crypto.com/token/icons/bitcoin-gold/color_icon.png"
    },
    {
        "name": "Kava",
        "symbol": "KAVA",
        "icon": "https://static.crypto.com/token/icons/kava/color_icon.png"
    },
    {
        "name": "Aevo",
        "symbol": "AEVO",
        "icon": "https://static.crypto.com/token/icons/aevo/color_icon.png"
    },
    {
        "name": "XDC Network",
        "symbol": "XDC",
        "icon": "https://static.crypto.com/token/icons/xinfin/color_icon.png"
    },
    {
        "name": "MX Token",
        "symbol": "MX",
        "icon": "https://static.crypto.com/token/icons/mx-token/color_icon.png"
    },
    {
        "name": "Astar",
        "symbol": "ASTR",
        "icon": "https://static.crypto.com/token/icons/astar/color_icon.png"
    },
    {
        "name": "Luna Classic",
        "symbol": "LUNC",
        "icon": "https://static.crypto.com/token/icons/terra-luna/color_icon.png"
    },
    {
        "name": "PayPal USD",
        "symbol": "PYUSD",
        "icon": "https://static.crypto.com/token/icons/paypal-usd/color_icon.png"
    },
    {
        "name": "Compound",
        "symbol": "COMP",
        "icon": "https://static.crypto.com/token/icons/compound/color_icon.png"
    },
    {
        "name": "LayerZero",
        "symbol": "ZRO",
        "icon": "https://static.crypto.com/token/icons_v2/layerzero/22929-1718887762646.png"
    },
    {
        "name": "WOO Network",
        "symbol": "WOO",
        "icon": "https://static.crypto.com/token/icons_v2/wootrade/3630-1712605230248.png"
    },
    {
        "name": "SSV Network",
        "symbol": "SSV",
        "icon": "https://static.crypto.com/token/icons/ssv-network/color_icon.png"
    },
    {
        "name": "Rocket Pool",
        "symbol": "RPL",
        "icon": "https://static.crypto.com/token/icons/rocket-pool/color_icon.png"
    },
    {
        "name": "SafePal",
        "symbol": "SFP",
        "icon": "https://static.crypto.com/token/icons/safepal/color_icon.png"
    },
    {
        "name": "IoTeX",
        "symbol": "IOTX",
        "icon": "https://static.crypto.com/token/icons/iotex/color_icon.png"
    },
    {
        "name": "Aragon",
        "symbol": "ANT",
        "icon": "https://static.crypto.com/token/icons/aragon/color_icon.png"
    },
    {
        "name": "CorgiAI",
        "symbol": "CORGIAI",
        "icon": "https://static.crypto.com/token/icons/corgiai/color_icon.png"
    },
    {
        "name": "Memecoin",
        "symbol": "MEME",
        "icon": "https://static.crypto.com/token/icons/memecoin/color_icon.png"
    },
    {
        "name": "Kusama",
        "symbol": "KSM",
        "icon": "https://static.crypto.com/token/icons/kusama/color_icon.png"
    },
    {
        "name": "Ocean Protocol",
        "symbol": "OCEAN",
        "icon": "https://static.crypto.com/token/icons_v2/ocean-protocol/1394-1712604429955.png"
    },
    {
        "name": "Curve DAO Token",
        "symbol": "CRV",
        "icon": "https://static.crypto.com/token/icons/curve-dao-token/color_icon.png"
    },
    {
        "name": "Osmosis",
        "symbol": "OSMO",
        "icon": "https://static.crypto.com/token/icons/osmosis/color_icon.png"
    },
    {
        "name": "Zcash",
        "symbol": "ZEC",
        "icon": "https://static.crypto.com/token/icons/zcash/color_icon.png"
    },
    {
        "name": "Arkham",
        "symbol": "ARKM",
        "icon": "https://static.crypto.com/token/icons/arkham/color_icon.png"
    },
    {
        "name": "Radix",
        "symbol": "XRD",
        "icon": "https://static.crypto.com/token/icons/radix-protocol/color_icon.png"
    },
    {
        "name": "Green Metaverse Token",
        "symbol": "GMT",
        "icon": "https://static.crypto.com/token/icons/green-metaverse-token/color_icon.png"
    },
    {
        "name": "Golem",
        "symbol": "GLM",
        "icon": "https://static.crypto.com/token/icons_v2/golem-network-tokens/259-1712604048784.png"
    },
    {
        "name": "Zilliqa",
        "symbol": "ZIL",
        "icon": "https://static.crypto.com/token/icons/zilliqa/color_icon.png"
    },
    {
        "name": "Blur",
        "symbol": "BLUR",
        "icon": "https://static.crypto.com/token/icons/blur-token/color_icon.png"
    },
    {
        "name": "Luna",
        "symbol": "LUNA",
        "icon": "https://static.crypto.com/token/icons/terra-luna-v2/color_icon.png"
    },
    {
        "name": "Blast",
        "symbol": "BLAST",
        "icon": "https://static.crypto.com/token/icons_v2/blast-io/23006-1719416784351.png"
    },
    {
        "name": "dYdX",
        "symbol": "DYDX",
        "icon": "https://static.crypto.com/token/icons/dydx/color_icon.png"
    },
    {
        "name": "Celo",
        "symbol": "CELO",
        "icon": "https://static.crypto.com/token/icons/celo/color_icon.png"
    },
    {
        "name": "Echelon Prime",
        "symbol": "PRIME",
        "icon": "https://static.crypto.com/token/icons/echelon-prime/color_icon.png"
    },
    {
        "name": "JUST",
        "symbol": "JST",
        "icon": "https://static.crypto.com/token/icons/just/color_icon.png"
    },
    {
        "name": "OriginTrail",
        "symbol": "TRAC",
        "icon": "https://static.crypto.com/token/icons_v2/origintrail/649-1702002236023.png"
    },
    {
        "name": "SuperFarm",
        "symbol": "SUPER",
        "icon": "https://static.crypto.com/token/icons_v2/superfarm/2805-1703748351844.png"
    },
    {
        "name": "Enjin Coin",
        "symbol": "ENJ",
        "icon": "https://static.crypto.com/token/icons/enjin-coin/color_icon.png"
    },
    {
        "name": "Aerodrome Finance",
        "symbol": "AERO",
        "icon": "https://static.crypto.com/token/icons/aerodrome-finance/color_icon.png"
    },
    {
        "name": "Ankr",
        "symbol": "ANKR",
        "icon": "https://static.crypto.com/token/icons/ankr/color_icon.png"
    },
    {
        "name": "Dash",
        "symbol": "DASH",
        "icon": "https://static.crypto.com/token/icons/dash/color_icon.png"
    },
    {
        "name": "Holo",
        "symbol": "HOT",
        "icon": "https://static.crypto.com/token/icons/holo/color_icon.png"
    },
    {
        "name": "0x",
        "symbol": "ZRX",
        "icon": "https://static.crypto.com/token/icons_v2/0x/398-1712605332155.png"
    },
    {
        "name": "Illuvium",
        "symbol": "ILV",
        "icon": "https://static.crypto.com/token/icons/illuvium/color_icon.png"
    },
    {
        "name": "Basic Attention Token",
        "symbol": "BAT",
        "icon": "https://static.crypto.com/token/icons/basic-attention-token/color_icon.png"
    },
    {
        "name": "ether.fi",
        "symbol": "ETHFI",
        "icon": "https://static.crypto.com/token/icons/ether-fi-ethfi/color_icon.png"
    },
    {
        "name": "Tribe",
        "symbol": "TRIBE",
        "icon": "https://static.crypto.com/token/icons/tribe/color_icon.png"
    },
    {
        "name": "JITO",
        "symbol": "JTO",
        "icon": "https://static.crypto.com/token/icons/jito/color_icon.png"
    },
    {
        "name": "GMX",
        "symbol": "GMX",
        "icon": "https://static.crypto.com/token/icons/gmx/color_icon.png"
    },
    {
        "name": "Convex Finance",
        "symbol": "CVX",
        "icon": "https://static.crypto.com/token/icons/convex-finance/color_icon.png"
    },
    {
        "name": "Aethir",
        "symbol": "ATH",
        "icon": "https://static.crypto.com/token/icons_v2/aethir/22777-1718251986751.png"
    },
    {
        "name": "ETHPoW",
        "symbol": "ETHW",
        "icon": "https://static.crypto.com/token/icons/ethereum-pow/color_icon.png"
    },
    {
        "name": "aelf",
        "symbol": "ELF",
        "icon": "https://static.crypto.com/token/icons/aelf/color_icon.png"
    },
    {
        "name": "io.net",
        "symbol": "IO",
        "icon": "https://static.crypto.com/token/icons/io-net/color_icon.png"
    },
    {
        "name": "Galxe",
        "symbol": "GAL",
        "icon": "https://static.crypto.com/token/icons/project-galaxy/color_icon.png"
    },
    {
        "name": "Dymension",
        "symbol": "DYM",
        "icon": "https://static.crypto.com/token/icons/dymension/color_icon.png"
    },
    {
        "name": "Ravencoin",
        "symbol": "RVN",
        "icon": "https://static.crypto.com/token/icons/ravencoin/color_icon.png"
    },
    {
        "name": "Qtum",
        "symbol": "QTUM",
        "icon": "https://static.crypto.com/token/icons/qtum/color_icon.png"
    },
    {
        "name": "SKALE Network",
        "symbol": "SKL",
        "icon": "https://static.crypto.com/token/icons/skale-network/color_icon.png"
    },
    {
        "name": "Metis",
        "symbol": "METIS",
        "icon": "https://static.crypto.com/token/icons_v2/metisdao/4408-1706098238076.png"
    },
    {
        "name": "Casper",
        "symbol": "CSPR",
        "icon": "https://static.crypto.com/token/icons/casper/color_icon.png"
    },
    {
        "name": "Siacoin",
        "symbol": "SC",
        "icon": "https://static.crypto.com/token/icons/siacoin/color_icon.png"
    },
    {
        "name": "Turbo",
        "symbol": "TURBO",
        "icon": "https://static.crypto.com/token/icons/turbo/color_icon.png"
    },
    {
        "name": "Reserve Rights",
        "symbol": "RSR",
        "icon": "https://static.crypto.com/token/icons/reserve-rights/color_icon.png"
    },
    {
        "name": "Beldex",
        "symbol": "BDX",
        "icon": "https://static.crypto.com/token/icons/beldex/color_icon.png"
    },
    {
        "name": "Biconomy",
        "symbol": "BICO",
        "icon": "https://static.crypto.com/token/icons/biconomy/color_icon.png"
    },
    {
        "name": "Mask Network",
        "symbol": "MASK",
        "icon": "https://static.crypto.com/token/icons/mask-network/color_icon.png"
    },
    {
        "name": "Chia Network",
        "symbol": "XCH",
        "icon": "https://static.crypto.com/token/icons/chia-network/color_icon.png"
    },
    {
        "name": "Tellor",
        "symbol": "TRB",
        "icon": "https://static.crypto.com/token/icons/tellor/color_icon.png"
    },
    {
        "name": "Gas",
        "symbol": "GAS",
        "icon": "https://static.crypto.com/token/icons/gas/color_icon.png"
    },
    {
        "name": "Loopring",
        "symbol": "LRC",
        "icon": "https://static.crypto.com/token/icons/loopring/color_icon.png"
    },
    {
        "name": "Lido stETH",
        "symbol": "STETH",
        "icon": "https://static.crypto.com/token/icons/steth/color_icon.png"
    },
    {
        "name": "Lido wstETH",
        "symbol": "WSTETH",
        "icon": "https://static.crypto.com/token/icons/lido-finance-wsteth/color_icon.png"
    },
    {
        "name": "Wrapped TRON",
        "symbol": "WTRX",
        "icon": "https://static.crypto.com/token/icons/wrapped-tron/color_icon.png"
    },
    {
        "name": "WETH",
        "symbol": "WETH",
        "icon": "https://static.crypto.com/token/icons/weth/color_icon.png"
    },
    {
        "name": "ether fi",
        "symbol": "EETH",
        "icon": "https://static.crypto.com/token/icons/ether-fi/color_icon.png"
    },
    {
        "name": "Wrapped eETH",
        "symbol": "weETH",
        "icon": "https://static.crypto.com/token/icons/wrapped-eeth/color_icon.png"
    },
    {
        "name": "Ethena USDe",
        "symbol": "USDe",
        "icon": "https://static.crypto.com/token/icons/ethena-usde/color_icon.png"
    },
    {
        "name": "Bitcoin BEP2",
        "symbol": "BTCB",
        "icon": "https://static.crypto.com/token/icons/bitcoin-bep2/color_icon.png"
    },
    {
        "name": "Wrapped Beacon ETH",
        "symbol": "WBETH",
        "icon": "https://static.crypto.com/token/icons/wrapped-beacon-eth/color_icon.png"
    },
    {
        "name": "Renzo Protocol",
        "symbol": "EZETH",
        "icon": "https://static.crypto.com/token/icons/renzo-protocol/color_icon.png"
    },
    {
        "name": "Wrapped EOS",
        "symbol": "WEOS",
        "icon": "https://static.crypto.com/token/icons/wrapped-eos/color_icon.png"
    },
    {
        "name": "Rocket Pool ETH",
        "symbol": "RETH",
        "icon": "https://static.crypto.com/token/icons/rocket-pool-eth/color_icon.png"
    },
    {
        "name": "Ethena Staked USDe",
        "symbol": "sUSDe",
        "icon": "https://static.crypto.com/token/icons/ethena-staked-usde/color_icon.png"
    },
    {
        "name": "bittensor",
        "symbol": "TAO",
        "icon": "https://static.crypto.com/token/icons/bittensor/color_icon.png"
    },
    {
        "name": "Jito Staked SOL",
        "symbol": "JITOSOL",
        "icon": "https://static.crypto.com/token/icons/jito-staked-sol/color_icon.png"
    },
    {
        "name": "Mantle Staked Ether",
        "symbol": "METH",
        "icon": "https://static.crypto.com/token/icons/mantle-staked-ether/color_icon.png"
    },
    {
        "name": "ZEEBU",
        "symbol": "ZBU",
        "icon": "https://static.crypto.com/token/icons/zeebu/color_icon.png"
    },
    {
        "name": "Brett",
        "symbol": "BRETT",
        "icon": "https://static.crypto.com/token/icons/based-brett/color_icon.png"
    },
    {
        "name": "Fellaz",
        "symbol": "FLZ",
        "icon": "https://static.crypto.com/token/icons/fellaz/color_icon.png"
    },
    {
        "name": "Cheelee",
        "symbol": "CHEEL",
        "icon": "https://static.crypto.com/token/icons/cheelee/color_icon.png"
    },
    {
        "name": "Core DAO",
        "symbol": "CORE",
        "icon": "https://static.crypto.com/token/icons/core-dao/color_icon.png"
    },
    {
        "name": "Kelp DAO Restaked ETH",
        "symbol": "RSETH",
        "icon": "https://static.crypto.com/token/icons/kelp-dao-restaked-eth/color_icon.png"
    },
    {
        "name": "Wrapped BNB",
        "symbol": "WBNB",
        "icon": "https://static.crypto.com/token/icons/wbnb/color_icon.png"
    },
    {
        "name": "MARINADE STAKED SOL",
        "symbol": "MSOL",
        "icon": "https://static.crypto.com/token/icons/marinade/color_icon.png"
    },
    {
        "name": "USD Coin Avalanche Bridged (USDC.e)",
        "symbol": "USDC",
        "icon": "https://static.crypto.com/token/icons/usd-coin-avalanche-bridged-usdc-e/color_icon.png"
    },
    {
        "name": "MANTRA",
        "symbol": "OM",
        "icon": "https://static.crypto.com/token/icons/mantra-dao/color_icon.png"
    },
    {
        "name": "Compound USD Coin",
        "symbol": "CUSDC",
        "icon": "https://static.crypto.com/token/icons/compound-usd-coin/color_icon.png"
    },
    {
        "name": "Coinbase Wrapped Staked ETH",
        "symbol": "CBETH",
        "icon": "https://static.crypto.com/token/icons/coinbase-wrapped-staked-eth/color_icon.png"
    },
    {
        "name": "swETH",
        "symbol": "SWETH",
        "icon": "https://static.crypto.com/token/icons/swell-sweth/color_icon.png"
    },
    {
        "name": "DeXe",
        "symbol": "DEXE",
        "icon": "https://static.crypto.com/token/icons/dexe/color_icon.png"
    },
    {
        "name": "Frax Staked Ether",
        "symbol": "SFRXETH",
        "icon": "https://static.crypto.com/token/icons/frax-staked-ether/color_icon.png"
    },
    {
        "name": "DOG•GO•TO•THE•MOON",
        "symbol": "DOG",
        "icon": "https://static.crypto.com/token/icons/dog-go-to-the-moon-rune/color_icon.png"
    },
    {
        "name": "FTX Token",
        "symbol": "FTT",
        "icon": "https://static.crypto.com/token/icons/ftx-token/color_icon.png"
    },
    {
        "name": "Stader ETHx",
        "symbol": "ETHX",
        "icon": "https://static.crypto.com/token/icons/stader-ethx/color_icon.png"
    },
    {
        "name": "Restaked Swell Ethereum",
        "symbol": "RSWETH",
        "icon": "https://static.crypto.com/token/icons/restaked-swell-ethereum/color_icon.png"
    },
    {
        "name": "ConstitutionDAO",
        "symbol": "PEOPLE",
        "icon": "https://static.crypto.com/token/icons/constitutiondao/color_icon.png"
    },
    {
        "name": "IPVERSE (ETH)",
        "symbol": "IPV",
        "icon": "https://static.crypto.com/token/icons/ipverse-eth/color_icon.png"
    },
    {
        "name": "USDB",
        "symbol": "USDB",
        "icon": "https://static.crypto.com/token/icons/usdb/color_icon.png"
    },
    {
        "name": "Wrapped Pulse",
        "symbol": "WPLS",
        "icon": "https://static.crypto.com/token/icons/wrapped-pulse/color_icon.png"
    },
    {
        "name": "BinaryX",
        "symbol": "BNX",
        "icon": "https://static.crypto.com/token/icons/binaryx-new/color_icon.png"
    },
    {
        "name": "NXM",
        "symbol": "NXM",
        "icon": "https://static.crypto.com/token/icons/nxm/color_icon.png"
    },
    {
        "name": "SATS",
        "symbol": "1000SATS",
        "icon": "https://static.crypto.com/token/icons/sats/color_icon.png"
    },
    {
        "name": "cat in a dogs world",
        "symbol": "MEW",
        "icon": "https://static.crypto.com/token/icons/mew/color_icon.png"
    },
    {
        "name": "Beacon ETH",
        "symbol": "BETH",
        "icon": "https://static.crypto.com/token/icons/beacon-eth/color_icon.png"
    },
    {
        "name": "PepeCoin Cryptocurrency",
        "symbol": "pepecoin",
        "icon": "https://static.crypto.com/token/icons/pepecoin-/color_icon.png"
    },
    {
        "name": "Manta Network",
        "symbol": "MANTA",
        "icon": "https://static.crypto.com/token/icons/manta-network/color_icon.png"
    },
    {
        "name": "BlazeStake Staked SOL",
        "symbol": "BSOL",
        "icon": "https://static.crypto.com/token/icons/blazestake-staked-sol/color_icon.png"
    },
    {
        "name": "Liquid Staked ETH",
        "symbol": "LSETH",
        "icon": "https://static.crypto.com/token/icons/liquid-staked-eth/color_icon.png"
    },
    {
        "name": "Socean Staked Sol",
        "symbol": "SCNSOL",
        "icon": "https://static.crypto.com/token/icons/socean-staked-sol/color_icon.png"
    },
    {
        "name": "H2O Dao",
        "symbol": "H2O",
        "icon": "https://static.crypto.com/token/icons/h2o-dao/color_icon.png"
    },
    {
        "name": "SPACE ID",
        "symbol": "ID",
        "icon": "https://static.crypto.com/token/icons/space-id/color_icon.png"
    },
    {
        "name": "Meta Games Coin",
        "symbol": "MGC",
        "icon": "https://static.crypto.com/token/icons/meta-games-coin/color_icon.png"
    },
    {
        "name": "MAGA",
        "symbol": "TRUMP",
        "icon": "https://static.crypto.com/token/icons/maga/color_icon.png"
    },
    {
        "name": "Bitcoin Avalanche Bridged",
        "symbol": "BTC.b",
        "icon": "https://static.crypto.com/token/icons/bitcoin-avalanche-bridged/color_icon.png"
    },
    {
        "name": "Orbler",
        "symbol": "ORBR",
        "icon": "https://static.crypto.com/token/icons/orbler/color_icon.png"
    },
    {
        "name": "Mirrored ProShares VIX",
        "symbol": "mVIXY",
        "icon": "https://static.crypto.com/token/icons/mirrored-proshares-vix-short-term-futures-etf/color_icon.png"
    },
    {
        "name": "Arcblock",
        "symbol": "ABT",
        "icon": "https://static.crypto.com/token/icons/arcblock/color_icon.png"
    },
    {
        "name": "Lollybomb Meme Coin",
        "symbol": "BOMB",
        "icon": "https://static.crypto.com/token/icons/lollybomb-meme-coin/color_icon.png"
    },
    {
        "name": "Synclub",
        "symbol": "SNBNB",
        "icon": "https://static.crypto.com/token/icons/synclub/color_icon.png"
    },
    {
        "name": "Mythos",
        "symbol": "MYTH",
        "icon": "https://static.crypto.com/token/icons/mythos/color_icon.png"
    },
    {
        "name": "ZetaChain",
        "symbol": "ZETA",
        "icon": "https://static.crypto.com/token/icons/zetachain/color_icon.png"
    },
    {
        "name": "Centrifuge",
        "symbol": "CFG",
        "icon": "https://static.crypto.com/token/icons/centrifuge/color_icon.png"
    },
    {
        "name": "Decred",
        "symbol": "DCR",
        "icon": "https://static.crypto.com/token/icons/decred/color_icon.png"
    },
    {
        "name": "Flux",
        "symbol": "FLUX",
        "icon": "https://static.crypto.com/token/icons/zel/color_icon.png"
    },
    {
        "name": "yearn.finance",
        "symbol": "YFI",
        "icon": "https://static.crypto.com/token/icons/yearn-finance/color_icon.png"
    },
    {
        "name": "BENQI Liquid Staked AVAX",
        "symbol": "SAVAX",
        "icon": "https://static.crypto.com/token/icons/benqi-liquid-staked-avax/color_icon.png"
    },
    {
        "name": "Polymesh",
        "symbol": "POLYX",
        "icon": "https://static.crypto.com/token/icons/polymesh/color_icon.png"
    },
    {
        "name": "Frax Share",
        "symbol": "FXS",
        "icon": "https://static.crypto.com/token/icons/frax-share/color_icon.png"
    },
    {
        "name": "tBTC",
        "symbol": "TBTC",
        "icon": "https://static.crypto.com/token/icons/tbtc-token/color_icon.png"
    },
    {
        "name": "Threshold",
        "symbol": "T",
        "icon": "https://static.crypto.com/token/icons/threshold/color_icon.png"
    },
    {
        "name": "SushiSwap",
        "symbol": "SUSHI",
        "icon": "https://static.crypto.com/token/icons/sushiswap/color_icon.png"
    },
    {
        "name": "Rollbit Coin",
        "symbol": "RLB",
        "icon": "https://static.crypto.com/token/icons/rollbit-coin/color_icon.png"
    },
    {
        "name": "Chromia",
        "symbol": "CHR",
        "icon": "https://static.crypto.com/token/icons/chromia/color_icon.png"
    },
    {
        "name": "Telcoin",
        "symbol": "TEL",
        "icon": "https://static.crypto.com/token/icons/telcoin/color_icon.png"
    },
    {
        "name": "RSS3",
        "symbol": "RSS3",
        "icon": "https://static.crypto.com/token/icons/rss3/color_icon.png"
    },
    {
        "name": "Yield Guild Games",
        "symbol": "YGG",
        "icon": "https://static.crypto.com/token/icons_v2/yield-guild-games/4945-1708939179601.png"
    },
    {
        "name": "Olympus",
        "symbol": "OHM",
        "icon": "https://static.crypto.com/token/icons/olympus/color_icon.png"
    },
    {
        "name": "Alchemy Pay",
        "symbol": "ACH",
        "icon": "https://static.crypto.com/token/icons/alchemy-pay/color_icon.png"
    },
    {
        "name": "Amp",
        "symbol": "AMP",
        "icon": "https://static.crypto.com/token/icons/amp/color_icon.png"
    },
    {
        "name": "Open Campus",
        "symbol": "EDU",
        "icon": "https://static.crypto.com/token/icons/open-campus/color_icon.png"
    },
    {
        "name": "PAAL AI",
        "symbol": "PAAL",
        "icon": "https://static.crypto.com/token/icons/paal-ai/color_icon.png"
    },
    {
        "name": "Harmony",
        "symbol": "ONE",
        "icon": "https://static.crypto.com/token/icons/harmony/color_icon.png"
    },
    {
        "name": "Baby Doge Coin",
        "symbol": "BabyDoge",
        "icon": "https://static.crypto.com/token/icons/baby-doge-coin/color_icon.png"
    },
    {
        "name": "Moonbeam",
        "symbol": "GLMR",
        "icon": "https://static.crypto.com/token/icons/moonbeam/color_icon.png"
    },
    {
        "name": "Ondo US Dollar Yield",
        "symbol": "USDY",
        "icon": "https://static.crypto.com/token/icons/ondo-us-dollar-yield/color_icon.png"
    },
    {
        "name": "MimbleWimbleCoin",
        "symbol": "MWC",
        "icon": "https://static.crypto.com/token/icons/mimblewimblecoin/color_icon.png"
    },
    {
        "name": "Ponke",
        "symbol": "PONKE",
        "icon": "https://static.crypto.com/token/icons/ponke/color_icon.png"
    },
    {
        "name": "Audius",
        "symbol": "AUDIO",
        "icon": "https://static.crypto.com/token/icons/audius/color_icon.png"
    },
    {
        "name": "UMA",
        "symbol": "UMA",
        "icon": "https://static.crypto.com/token/icons/uma/color_icon.png"
    },
    {
        "name": "EscoinToken",
        "symbol": "ELG",
        "icon": "https://static.crypto.com/token/icons/escointoken/color_icon.png"
    },
    {
        "name": "BounceBit",
        "symbol": "BB",
        "icon": "https://static.crypto.com/token/icons/bouncebit/color_icon.png"
    },
    {
        "name": "Ontology",
        "symbol": "ONT",
        "icon": "https://static.crypto.com/token/icons/ontology/color_icon.png"
    },
    {
        "name": "Vanar Chain",
        "symbol": "VANRY",
        "icon": "https://static.crypto.com/token/icons_v2/terra-virtua-kolect/2640-1701766994929.jpg"
    },
    {
        "name": "VeThor Token",
        "symbol": "VTHO",
        "icon": "https://static.crypto.com/token/icons/vethor-token/color_icon.png"
    },
    {
        "name": "Band Protocol",
        "symbol": "BAND",
        "icon": "https://static.crypto.com/token/icons/band-protocol/color_icon.png"
    },
    {
        "name": "API3",
        "symbol": "API3",
        "icon": "https://static.crypto.com/token/icons/api3/color_icon.png"
    },
    {
        "name": "Axelar Wrapped Frax Eth",
        "symbol": "AXLFRXETH",
        "icon": "https://static.crypto.com/token/icons/axelar-wrapped-frax-ether/color_icon.png"
    },
    {
        "name": "SwissBorg",
        "symbol": "CHSB",
        "icon": "https://static.crypto.com/token/icons/swissborg/color_icon.png"
    },
    {
        "name": "NetMind Token",
        "symbol": "NMT",
        "icon": "https://static.crypto.com/token/icons/netmind-token/color_icon.png"
    },
    {
        "name": "Altlayer",
        "symbol": "ALT",
        "icon": "https://static.crypto.com/token/icons/altlayer/color_icon.png"
    },
    {
        "name": "Alchemix USD",
        "symbol": "ALUSD",
        "icon": "https://static.crypto.com/token/icons/alchemix-usd/color_icon.png"
    },
    {
        "name": "USDJ",
        "symbol": "USDJ",
        "icon": "https://static.crypto.com/token/icons/usdj/color_icon.png"
    },
    {
        "name": "Wrapped Solana",
        "symbol": "SOL",
        "icon": "https://static.crypto.com/token/icons/wrapped-solana/color_icon.png"
    },
    {
        "name": "Bridge$",
        "symbol": "BRG.X",
        "icon": "https://static.crypto.com/token/icons/bridges/color_icon.png"
    },
    {
        "name": "Pixels",
        "symbol": "PIXEL",
        "icon": "https://static.crypto.com/token/icons/pixels/color_icon.png"
    },
    {
        "name": "Gekko HQ",
        "symbol": "GEKKO",
        "icon": "https://static.crypto.com/token/icons/gekko-hq/color_icon.png"
    },
    {
        "name": "Decentralized Social",
        "symbol": "DESO",
        "icon": "https://static.crypto.com/token/icons/deso/color_icon.png"
    },
    {
        "name": "Taiko",
        "symbol": "TAIKO",
        "icon": "https://static.crypto.com/token/icons/taiko/color_icon.png"
    },
    {
        "name": "Creditcoin",
        "symbol": "CTC",
        "icon": "https://static.crypto.com/token/icons/creditcoin/color_icon.png"
    },
    {
        "name": "0x0.ai: AI Smart Contract",
        "symbol": "0X0",
        "icon": "https://static.crypto.com/token/icons/0x0-ai-ai-smart-contract/color_icon.png"
    },
    {
        "name": "Hivemapper",
        "symbol": "HONEY",
        "icon": "https://static.crypto.com/token/icons/hivemapper/color_icon.png"
    },
    {
        "name": "Wrapped Centrifuge",
        "symbol": "WCFG",
        "icon": "https://static.crypto.com/token/icons/wrapped-centrifuge/color_icon.png"
    },
    {
        "name": "Kujira",
        "symbol": "KUJI",
        "icon": "https://static.crypto.com/token/icons/kujira/color_icon.png"
    },
    {
        "name": "Venus ETH",
        "symbol": "vETH",
        "icon": "https://static.crypto.com/token/icons/venus-eth/color_icon.png"
    },
    {
        "name": "Delysium",
        "symbol": "AGI",
        "icon": "https://static.crypto.com/token/icons/delysium/color_icon.png"
    },
    {
        "name": "QUAI DAO",
        "symbol": "QUAI",
        "icon": "https://static.crypto.com/token/icons/quai-dao/color_icon.png"
    },
    {
        "name": "Helium Mobile",
        "symbol": "MOBILE",
        "icon": "https://static.crypto.com/token/icons/helium-mobile/color_icon.png"
    },
    {
        "name": "Balancer",
        "symbol": "BAL",
        "icon": "https://static.crypto.com/token/icons/balancer/color_icon.png"
    },
    {
        "name": "Neutron",
        "symbol": "NTRN",
        "icon": "https://static.crypto.com/token/icons/neutron-ntrn/color_icon.png"
    },
    {
        "name": "Instadapp",
        "symbol": "INST",
        "icon": "https://static.crypto.com/token/icons/instadapp/color_icon.png"
    },
    {
        "name": "ECOMI",
        "symbol": "OMI",
        "icon": "https://static.crypto.com/token/icons/ecomi-new/color_icon.png"
    },
    {
        "name": "Marlin",
        "symbol": "POND",
        "icon": "https://static.crypto.com/token/icons/marlin/color_icon.png"
    },
    {
        "name": "Zigcoin",
        "symbol": "ZIG",
        "icon": "https://static.crypto.com/token/icons/zigcoin/color_icon.png"
    },
    {
        "name": "Kadena",
        "symbol": "KDA",
        "icon": "https://static.crypto.com/token/icons/kadena/color_icon.png"
    },
    {
        "name": "ICON",
        "symbol": "ICX",
        "icon": "https://static.crypto.com/token/icons/icon/color_icon.png"
    },
    {
        "name": "ANDY",
        "symbol": "ANDY",
        "icon": "https://static.crypto.com/token/icons/boysclubandy/color_icon.png"
    },
    {
        "name": "Aleph Zero",
        "symbol": "AZERO",
        "icon": "https://static.crypto.com/token/icons/aleph-zero/color_icon.png"
    },
    {
        "name": "SXP",
        "symbol": "SXP",
        "icon": "https://static.crypto.com/token/icons/sxp/color_icon.png"
    },
    {
        "name": "MAGIC",
        "symbol": "MAGIC",
        "icon": "https://static.crypto.com/token/icons/magic-token/color_icon.png"
    },
    {
        "name": "crvUSD",
        "symbol": "CRVUSD",
        "icon": "https://static.crypto.com/token/icons/crvusd/color_icon.png"
    },
    {
        "name": "iExec RLC",
        "symbol": "RLC",
        "icon": "https://static.crypto.com/token/icons/rlc/color_icon.png"
    },
    {
        "name": "TrueFi",
        "symbol": "TRU",
        "icon": "https://static.crypto.com/token/icons/truefi-token/color_icon.png"
    },
    {
        "name": "Nosana",
        "symbol": "NOS",
        "icon": "https://static.crypto.com/token/icons/nosana/color_icon.png"
    },
    {
        "name": "Songbird",
        "symbol": "SGB",
        "icon": "https://static.crypto.com/token/icons/songbird/color_icon.png"
    },
    {
        "name": "COTI",
        "symbol": "COTI",
        "icon": "https://static.crypto.com/token/icons/coti/color_icon.png"
    },
    {
        "name": "Lista DAO",
        "symbol": "LISTA",
        "icon": "https://static.crypto.com/token/icons/lista-dao/color_icon.png"
    },
    {
        "name": "Lisk",
        "symbol": "LSK",
        "icon": "https://static.crypto.com/token/icons/lisk/color_icon.png"
    },
    {
        "name": "Storj",
        "symbol": "STORJ",
        "icon": "https://static.crypto.com/token/icons/storj/color_icon.png"
    },
    {
        "name": "Apu Apustaja",
        "symbol": "APU",
        "icon": "https://static.crypto.com/token/icons/apu-apustaja/color_icon.png"
    },
    {
        "name": "STASIS EURO",
        "symbol": "EURS",
        "icon": "https://static.crypto.com/token/icons/stasis-euro/color_icon.png"
    },
    {
        "name": "inSure DeFi",
        "symbol": "SURE",
        "icon": "https://static.crypto.com/token/icons/insure/color_icon.png"
    },
    {
        "name": "Propy",
        "symbol": "PRO",
        "icon": "https://static.crypto.com/token/icons/propy/color_icon.png"
    },
    {
        "name": "Coin98",
        "symbol": "C98",
        "icon": "https://static.crypto.com/token/icons/coin98/color_icon.png"
    },
    {
        "name": "Venom",
        "symbol": "VENOM",
        "icon": "https://static.crypto.com/token/icons/venom/color_icon.png"
    },
    {
        "name": "WAX",
        "symbol": "WAXP",
        "icon": "https://static.crypto.com/token/icons_v2/wax/558-1697795888579.png"
    },
    {
        "name": "VVS Finance",
        "symbol": "VVS",
        "icon": "https://static.crypto.com/token/icons/vvs-finance/color_icon.png"
    },
    {
        "name": "NEM",
        "symbol": "XEM",
        "icon": "https://static.crypto.com/token/icons/nem/color_icon.png"
    },
    {
        "name": "DigiByte",
        "symbol": "DGB",
        "icon": "https://static.crypto.com/token/icons/digibyte/color_icon.png"
    },
    {
        "name": "IOST",
        "symbol": "IOST",
        "icon": "https://static.crypto.com/token/icons/iostoken/color_icon.png"
    },

    {
        "name": "DigiByte",
        "symbol": "DGB",
        "icon": "https://static.crypto.com/token/icons/digibyte/color_icon.png"
    },
    {
        "name": "IOST",
        "symbol": "IOST",
        "icon": "https://static.crypto.com/token/icons/iostoken/color_icon.png"
    },
    {
        "name": "Cartesi",
        "symbol": "CTSI",
        "icon": "https://static.crypto.com/token/icons/cartesi/color_icon.png"
    },
    {
        "name": "Metars Genesis",
        "symbol": "MRS",
        "icon": "https://static.crypto.com/token/icons/metars-genesis/color_icon.png"
    },
    {
        "name": "Pax Dollar",
        "symbol": "USDP",
        "icon": "https://static.crypto.com/token/icons/paxos-standard/color_icon.png"
    },
    {
        "name": "Horizen",
        "symbol": "ZEN",
        "icon": "https://static.crypto.com/token/icons/horizen/color_icon.png"
    },
    {
        "name": "Bitkub Coin",
        "symbol": "KUB",
        "icon": "https://static.crypto.com/token/icons/bitkub-coin/color_icon.png"
    },
    {
        "name": "Banana Gun",
        "symbol": "BANANA",
        "icon": "https://static.crypto.com/token/icons/banana-gun/color_icon.png"
    },
    {
        "name": "Prometeus",
        "symbol": "PROM",
        "icon": "https://static.crypto.com/token/icons/prometeus/color_icon.png"
    },
    {
        "name": "BitMart Token",
        "symbol": "BMX",
        "icon": "https://static.crypto.com/token/icons/bitmart-token/color_icon.png"
    },
    {
        "name": "Ontology Gas",
        "symbol": "ONG",
        "icon": "https://static.crypto.com/token/icons/ontology-gas/color_icon.png"
    },
    {
        "name": "Sleepless AI",
        "symbol": "AI",
        "icon": "https://static.crypto.com/token/icons/sleepless-ai/color_icon.png"
    },
    {
        "name": "Staked ETH",
        "symbol": "OSETH",
        "icon": "https://static.crypto.com/token/icons/staked-eth/color_icon.png"
    },
    {
        "name": "Saga",
        "symbol": "SAGA",
        "icon": "https://static.crypto.com/token/icons/saga/color_icon.png"
    },
    {
        "name": "SmarDex",
        "symbol": "SDEX",
        "icon": "https://static.crypto.com/token/icons/smardex/color_icon.png"
    },
    {
        "name": "Polygon Ecosystem Token",
        "symbol": "POL",
        "icon": "https://static.crypto.com/token/icons/polygon-ecosystem-token/color_icon.png"
    },
    {
        "name": "World Mobile Token",
        "symbol": "WMT",
        "icon": "https://static.crypto.com/token/icons/world-mobile-token/color_icon.png"
    },
    {
        "name": "JOE",
        "symbol": "JOE",
        "icon": "https://static.crypto.com/token/icons/joe/color_icon.png"
    },
    {
        "name": "LCX",
        "symbol": "LCX",
        "icon": "https://static.crypto.com/token/icons/lcx/color_icon.png"
    },
    {
        "name": "Gemini Dollar",
        "symbol": "GUSD",
        "icon": "https://static.crypto.com/token/icons/gemini-dollar/color_icon.png"
    },
    {
        "name": "Nano",
        "symbol": "XNO",
        "icon": "https://static.crypto.com/token/icons/nano/color_icon.png"
    },
    {
        "name": "Zentry",
        "symbol": "ZENT",
        "icon": "https://static.crypto.com/token/icons/zentry/color_icon.png"
    },
    {
        "name": "Stride",
        "symbol": "STRD",
        "icon": "https://static.crypto.com/token/icons/stride/color_icon.png"
    },
    {
        "name": "Non-Playable Coin",
        "symbol": "NPC",
        "icon": "https://static.crypto.com/token/icons/non-playable-coin/color_icon.png"
    },
    {
        "name": "GMT Token",
        "symbol": "GMT",
        "icon": "https://static.crypto.com/token/icons/gomining-token/color_icon.png"
    },
    {
        "name": "Covalent",
        "symbol": "CQT",
        "icon": "https://static.crypto.com/token/icons/covalent/color_icon.png"
    },
    {
        "name": "Sun (New)",
        "symbol": "SUN",
        "icon": "https://static.crypto.com/token/icons/sun-token/color_icon.png"
    },
    {
        "name": "Crypto.com Staked ETH",
        "symbol": "CDCETH",
        "icon": "https://static.crypto.com/token/icons_v2/CDCETH/19349-1699504532196.png"
    },
    {
        "name": "Decentral Games [Old]",
        "symbol": "DG",
        "icon": "https://static.crypto.com/token/icons/decentral-games-old/color_icon.png"
    },
    {
        "name": "Symbol",
        "symbol": "XYM",
        "icon": "https://static.crypto.com/token/icons/symbol/color_icon.png"
    },
    {
        "name": "Peseta Digital",
        "symbol": "PTD",
        "icon": "https://static.crypto.com/token/icons/pesetacoin/color_icon.png"
    },
    {
        "name": "Smooth Love Potion",
        "symbol": "SLP",
        "icon": "https://static.crypto.com/token/icons/smooth-love-potion/color_icon.png"
    },
    {
        "name": "Braintrust",
        "symbol": "BTRST",
        "icon": "https://static.crypto.com/token/icons/braintrust/color_icon.png"
    },
    {
        "name": "Oraichain Token",
        "symbol": "ORAI",
        "icon": "https://static.crypto.com/token/icons/oraichain-token/color_icon.png"
    },
    {
        "name": "Numeraire",
        "symbol": "NMR",
        "icon": "https://static.crypto.com/token/icons/numeraire/color_icon.png"
    },
    {
        "name": "ApeX Protocol",
        "symbol": "APEX",
        "icon": "https://static.crypto.com/token/icons/apex-token/color_icon.png"
    },
    {
        "name": "Celer Network",
        "symbol": "CELR",
        "icon": "https://static.crypto.com/token/icons/celer-network/color_icon.png"
    },
    {
        "name": "Tokenlon Network Token",
        "symbol": "LON",
        "icon": "https://static.crypto.com/token/icons/tokenlon-network-token/color_icon.png"
    },
    {
        "name": "Everscale",
        "symbol": "EVER",
        "icon": "https://static.crypto.com/token/icons/everscale/color_icon.png"
    },
    {
        "name": "Merlin Chain",
        "symbol": "MERL",
        "icon": "https://static.crypto.com/token/icons/merlin-chain/color_icon.png"
    },
    {
        "name": "Chintai",
        "symbol": "CHEX",
        "icon": "https://static.crypto.com/token/icons/chex-token/color_icon.png"
    },
    {
        "name": "Dusk",
        "symbol": "DUSK",
        "icon": "https://static.crypto.com/token/icons_v2/dusk-network/1498-1711356445504.png"
    },
    {
        "name": "Big Time",
        "symbol": "BIGTIME",
        "icon": "https://static.crypto.com/token/icons_v2/big-time/19323-1708939467446.png"
    },
    {
        "name": "Myro",
        "symbol": "$MYRO",
        "icon": "https://static.crypto.com/token/icons/myro/color_icon.png"
    },
    {
        "name": "Ozone Chain",
        "symbol": "OZO",
        "icon": "https://static.crypto.com/token/icons/ozone-chain/color_icon.png"
    },
    {
        "name": "Venus USDC",
        "symbol": "vUSDC",
        "icon": "https://static.crypto.com/token/icons/venus-usdc/color_icon.png"
    },
    {
        "name": "mCoin",
        "symbol": "MCOIN",
        "icon": "https://static.crypto.com/token/icons/mcoin1/color_icon.png"
    },
    {
        "name": "Bone ShibaSwap",
        "symbol": "BONE",
        "icon": "https://static.crypto.com/token/icons/bone-shibaswap/color_icon.png"
    },
    {
        "name": "CyberConnect",
        "symbol": "CYBER",
        "icon": "https://static.crypto.com/token/icons/cyberconnect/color_icon.png"
    },
    {
        "name": "Bazaars",
        "symbol": "BZR",
        "icon": "https://static.crypto.com/token/icons/bazaars/color_icon.png"
    },
    {
        "name": "Phala Network",
        "symbol": "PHA",
        "icon": "https://static.crypto.com/token/icons/phala-network/color_icon.png"
    },
    {
        "name": "Request",
        "symbol": "REQ",
        "icon": "https://static.crypto.com/token/icons/request/color_icon.png"
    },
    {
        "name": "Oasys",
        "symbol": "OAS",
        "icon": "https://static.crypto.com/token/icons_v2/oasys/14525-1716823134846.png"
    },
    {
        "name": "Hive",
        "symbol": "HIVE",
        "icon": "https://static.crypto.com/token/icons/hive-blockchain/color_icon.png"
    },
    {
        "name": "Everipedia",
        "symbol": "IQ",
        "icon": "https://static.crypto.com/token/icons/everipedia/color_icon.png"
    },
    {
        "name": "NYM",
        "symbol": "NYM",
        "icon": "https://static.crypto.com/token/icons/nym/color_icon.png"
    },
    {
        "name": "Powerledger",
        "symbol": "POWR",
        "icon": "https://static.crypto.com/token/icons/power-ledger/color_icon.png"
    },
    {
        "name": "MiL.k",
        "symbol": "MLK",
        "icon": "https://static.crypto.com/token/icons/milk-alliance/color_icon.png"
    },
    {
        "name": "Xai",
        "symbol": "XAI",
        "icon": "https://static.crypto.com/token/icons/xai-games/color_icon.png"
    },
    {
        "name": "SLERF",
        "symbol": "SLERF",
        "icon": "https://static.crypto.com/token/icons/slerf/color_icon.png"
    },
    {
        "name": "BORA",
        "symbol": "BORA",
        "icon": "https://static.crypto.com/token/icons/bora/color_icon.png"
    },
    {
        "name": "Keep Network",
        "symbol": "KEEP",
        "icon": "https://static.crypto.com/token/icons/keep-network/color_icon.png"
    },
    {
        "name": "Coq Inu",
        "symbol": "COQ",
        "icon": "https://static.crypto.com/token/icons/coq-inu/color_icon.png"
    },
    {
        "name": "Fusionist",
        "symbol": "ACE",
        "icon": "https://static.crypto.com/token/icons/fusionist/color_icon.png"
    },
    {
        "name": "Bounce Token",
        "symbol": "AUCTION",
        "icon": "https://static.crypto.com/token/icons/bounce-token/color_icon.png"
    },
    {
        "name": "Nakamoto Games",
        "symbol": "NAKA",
        "icon": "https://static.crypto.com/token/icons/nakamoto-games/color_icon.png"
    },
    {
        "name": "LimeWire",
        "symbol": "LMWR",
        "icon": "https://static.crypto.com/token/icons/limewire/color_icon.png"
    },
    {
        "name": "Daddy Tate",
        "symbol": "DADDY",
        "icon": "https://static.crypto.com/token/icons/daddy-tate/color_icon.png"
    },
    {
        "name": "Paycoin",
        "symbol": "PCI",
        "icon": "https://static.crypto.com/token/icons/payprotocol/color_icon.png"
    },
    {
        "name": "Civic",
        "symbol": "CVC",
        "icon": "https://static.crypto.com/token/icons/civic/color_icon.png"
    },
    {
        "name": "BTSE",
        "symbol": "BTSE",
        "icon": "https://static.crypto.com/token/icons/btse/color_icon.png"
    },
    {
        "name": "IX Swap",
        "symbol": "IXS",
        "icon": "https://static.crypto.com/token/icons/ix-swap/color_icon.png"
    },
    {
        "name": "Kyber Network Crystal v2",
        "symbol": "KNC",
        "icon": "https://static.crypto.com/token/icons/kyber-network-crystal-v2/color_icon.png"
    },
    {
        "name": "Lido Staked Matic",
        "symbol": "stMATIC",
        "icon": "https://static.crypto.com/token/icons/lido-staked-matic/color_icon.png"
    },
    {
        "name": "GenesysGo Shadow",
        "symbol": "SHDW",
        "icon": "https://static.crypto.com/token/icons_v2/genesysgo-shadow/8234-1711526350593.png"
    },
    {
        "name": "Wilder World",
        "symbol": "WILD",
        "icon": "https://static.crypto.com/token/icons/wilder-world/color_icon.png"
    },
    {
        "name": "Degen",
        "symbol": "DEGEN",
        "icon": "https://static.crypto.com/token/icons/degen-base/color_icon.png"
    },
    {
        "name": "Toshi",
        "symbol": "TOSHI",
        "icon": "https://static.crypto.com/token/icons/toshi-/color_icon.png"
    },
    {
        "name": "Spell Token",
        "symbol": "SPELL",
        "icon": "https://static.crypto.com/token/icons/spell-token/color_icon.png"
    },
    {
        "name": "Dent",
        "symbol": "DENT",
        "icon": "https://static.crypto.com/token/icons/dent/color_icon.png"
    },
    {
        "name": "Pocket Network",
        "symbol": "POKT",
        "icon": "https://static.crypto.com/token/icons/pocket-network/color_icon.png"
    },
    {
        "name": "Venus",
        "symbol": "XVS",
        "icon": "https://static.crypto.com/token/icons/venus/color_icon.png"
    },
    {
        "name": "Metaplex",
        "symbol": "MPLX",
        "icon": "https://static.crypto.com/token/icons/metaplex/color_icon.png"
    },
    {
        "name": "Polymath",
        "symbol": "POLY",
        "icon": "https://static.crypto.com/token/icons/polymath-network/color_icon.png"
    },
    {
        "name": "Alephium",
        "symbol": "ALPH",
        "icon": "https://static.crypto.com/token/icons/alephium/color_icon.png"
    },
    {
        "name": "MVL",
        "symbol": "MVL",
        "icon": "https://static.crypto.com/token/icons/mvl/color_icon.png"
    },
    {
        "name": "Gains Network",
        "symbol": "GNS",
        "icon": "https://static.crypto.com/token/icons/gains-network/color_icon.png"
    },
    {
        "name": "CertiK",
        "symbol": "CTK",
        "icon": "https://static.crypto.com/token/icons/certik/color_icon.png"
    },
    {
        "name": "TerraClassicUSD",
        "symbol": "USTC",
        "icon": "https://static.crypto.com/token/icons/terrausd/color_icon.png"
    },
    {
        "name": "Moonriver",
        "symbol": "MOVR",
        "icon": "https://static.crypto.com/token/icons/moonriver/color_icon.png"
    },
    {
        "name": "Constellation",
        "symbol": "DAG",
        "icon": "https://static.crypto.com/token/icons/constellation/color_icon.png"
    },
    {
        "name": "michi",
        "symbol": "$MICHI",
        "icon": "https://static.crypto.com/token/icons/michi/color_icon.png"
    },
    {
        "name": "Vulcan Forged PYR",
        "symbol": "PYR",
        "icon": "https://static.crypto.com/token/icons/vulcan-forged-pyr/color_icon.png"
    },
    {
        "name": "Inverse Finance DOLA Stablecoin",
        "symbol": "DOLA",
        "icon": "https://static.crypto.com/token/icons/inverse-finance-dola-stablecoin/color_icon.png"
    },
    {
        "name": "USDX [Kava]",
        "symbol": "USDX",
        "icon": "https://static.crypto.com/token/icons/usdx-kava/color_icon.png"
    },
    {
        "name": "Milady Meme Coin",
        "symbol": "LADYS",
        "icon": "https://static.crypto.com/token/icons/milady-meme-coin/color_icon.png"
    },
    {
        "name": "Locus Chain",
        "symbol": "LOCUS",
        "icon": "https://static.crypto.com/token/icons/locus-chain/color_icon.png"
    },
    {
        "name": "Pundi X[new]",
        "symbol": "PUNDIX",
        "icon": "https://static.crypto.com/token/icons/pundix-new/color_icon.png"
    },
    {
        "name": "Syscoin",
        "symbol": "SYS",
        "icon": "https://static.crypto.com/token/icons/syscoin/color_icon.png"
    },
    {
        "name": "HarryPotterObamaSonic10Inu",
        "symbol": "BITCOIN",
        "icon": "https://static.crypto.com/token/icons/harrypotterobamasonic10inu-eth/color_icon.png"
    },

    {
        "name": "Phoenix Global (new)",
        "symbol": "PHB",
        "icon": "https://static.crypto.com/token/icons/phoenix-global-new/color_icon.png"
    },
    {
        "name": "Synapse",
        "symbol": "SYN",
        "icon": "https://static.crypto.com/token/icons/synapse-2/color_icon.png"
    },
    {
        "name": "WINkLink",
        "symbol": "WIN",
        "icon": "https://static.crypto.com/token/icons/wink/color_icon.png"
    },
    {
        "name": "XYO",
        "symbol": "XYO",
        "icon": "https://static.crypto.com/token/icons/xyo/color_icon.png"
    },
    {
        "name": "VerusCoin",
        "symbol": "VRSC",
        "icon": "https://static.crypto.com/token/icons/veruscoin/color_icon.png"
    },
    {
        "name": "Status",
        "symbol": "SNT",
        "icon": "https://static.crypto.com/token/icons/status/color_icon.png"
    },
    {
        "name": "Portal",
        "symbol": "PORTAL",
        "icon": "https://static.crypto.com/token/icons/portal-gaming/color_icon.png"
    },
    {
        "name": "Renzo",
        "symbol": "REZ",
        "icon": "https://static.crypto.com/token/icons/renzo/color_icon.png"
    },
    {
        "name": "RSK Infrastructure Framework",
        "symbol": "RIF",
        "icon": "https://static.crypto.com/token/icons/rsk-infrastructure-framework/color_icon.png"
    },
    {
        "name": "Bluzelle",
        "symbol": "BLZ",
        "icon": "https://static.crypto.com/token/icons/bluzelle/color_icon.png"
    },
    {
        "name": "Steem",
        "symbol": "STEEM",
        "icon": "https://static.crypto.com/token/icons/steem/color_icon.png"
    },
    {
        "name": "Seedify.fund",
        "symbol": "SFUND",
        "icon": "https://static.crypto.com/token/icons/seedify-fund/color_icon.png"
    },
    {
        "name": "Clearpool",
        "symbol": "CPOOL",
        "icon": "https://static.crypto.com/token/icons/clearpool/color_icon.png"
    },
    {
        "name": "Hooked Protocol",
        "symbol": "HOOK",
        "icon": "https://static.crypto.com/token/icons/hooked-protocol/color_icon.png"
    },
    {
        "name": "Orca",
        "symbol": "ORCA",
        "icon": "https://static.crypto.com/token/icons/orca/color_icon.png"
    },
    {
        "name": "Stratis [New]",
        "symbol": "STRAX",
        "icon": "https://static.crypto.com/token/icons/stratis-new/color_icon.png"
    },
    {
        "name": "Highstreet",
        "symbol": "HIGH",
        "icon": "https://static.crypto.com/token/icons/highstreet/color_icon.png"
    },
    {
        "name": "Drift",
        "symbol": "DRIFT",
        "icon": "https://static.crypto.com/token/icons/drift/color_icon.png"
    },
    {
        "name": "Liquity USD",
        "symbol": "LUSD",
        "icon": "https://static.crypto.com/token/icons/liquity-usd/color_icon.png"
    },
    {
        "name": "Solidus Ai Tech",
        "symbol": "AITECH",
        "icon": "https://static.crypto.com/token/icons/solidus-ai-tech/color_icon.png"
    },
    {
        "name": "MEMETOON",
        "symbol": "MEME",
        "icon": "https://static.crypto.com/token/icons/memetoon/color_icon.png"
    },
    {
        "name": "Hashflow",
        "symbol": "HFT",
        "icon": "https://static.crypto.com/token/icons/hashflow/color_icon.png"
    },
    {
        "name": "Wrapped CRO",
        "symbol": "WCRO",
        "icon": "https://static.crypto.com/token/icons/wrapped-cro/color_icon.png"
    },
    {
        "name": "Wen",
        "symbol": "WEN",
        "icon": "https://static.crypto.com/token/icons/wen/color_icon.png"
    },
    {
        "name": "Stader MaticX",
        "symbol": "MATICX",
        "icon": "https://static.crypto.com/token/icons/stader-maticx/color_icon.png"
    },
    {
        "name": "LeverFi",
        "symbol": "LEVER",
        "icon": "https://static.crypto.com/token/icons/lever/color_icon.png"
    },
    {
        "name": "Dogelon Mars",
        "symbol": "ELON",
        "icon": "https://static.crypto.com/token/icons/dogelon/color_icon.png"
    },
    {
        "name": "Redacted",
        "symbol": "BTRFLY",
        "icon": "https://static.crypto.com/token/icons/redacted/color_icon.png"
    },
    {
        "name": "Cream Finance",
        "symbol": "CREAM",
        "icon": "https://static.crypto.com/token/icons/cream-finance/color_icon.png"
    },
    {
        "name": "Wrapped Matic",
        "symbol": "WMATIC",
        "icon": "https://static.crypto.com/token/icons/wmatic/color_icon.png"
    },
    {
        "name": "Ribbon Finance",
        "symbol": "RBN",
        "icon": "https://static.crypto.com/token/icons/ribbon-finance/color_icon.png"
    },
    {
        "name": "dKargo",
        "symbol": "DKA",
        "icon": "https://static.crypto.com/token/icons/dkargo/color_icon.png"
    },
    {
        "name": "BakeryToken",
        "symbol": "BAKE",
        "icon": "https://static.crypto.com/token/icons/bakerytoken/color_icon.png"
    },
    {
        "name": "Liquity",
        "symbol": "LQTY",
        "icon": "https://static.crypto.com/token/icons/liquity/color_icon.png"
    },
    {
        "name": "bemo staked TON",
        "symbol": "STTON",
        "icon": "https://static.crypto.com/token/icons/bemo-staked-ton/color_icon.png"
    },
    {
        "name": "Stargate Finance",
        "symbol": "STG",
        "icon": "https://static.crypto.com/token/icons/stargate-finance/color_icon.png"
    },
    {
        "name": "Standard Tokenization Protocol",
        "symbol": "STPT",
        "icon": "https://static.crypto.com/token/icons/standard-tokenization-protocol/color_icon.png"
    },
    {
        "name": "Secret",
        "symbol": "SCRT",
        "icon": "https://static.crypto.com/token/icons/secret/color_icon.png"
    },
    {
        "name": "Unizen",
        "symbol": "ZCX",
        "icon": "https://static.crypto.com/token/icons/unizen/color_icon.png"
    },
    {
        "name": "LUKSO",
        "symbol": "LYX",
        "icon": "https://static.crypto.com/token/icons/lukso-network/color_icon.png"
    },
    {
        "name": "Bitcoin Wizards",
        "symbol": "WZRD",
        "icon": "https://static.crypto.com/token/icons/bitcoin-wizards/color_icon.png"
    },
    {
        "name": "PeiPei",
        "symbol": "PEIPEI",
        "icon": "https://static.crypto.com/token/icons/peipei-coin/color_icon.png"
    },
    {
        "name": "Land Of Conquest",
        "symbol": "SLG",
        "icon": "https://static.crypto.com/token/icons/land-of-conquest/color_icon.png"
    },
    {
        "name": "Bancor",
        "symbol": "BNT",
        "icon": "https://static.crypto.com/token/icons/bancor/color_icon.png"
    },
    {
        "name": "Dione Protocol",
        "symbol": "DIONE",
        "icon": "https://static.crypto.com/token/icons/dione-protocol/color_icon.png"
    },
    {
        "name": "DAO Maker",
        "symbol": "DAO",
        "icon": "https://static.crypto.com/token/icons/dao-maker/color_icon.png"
    },
    {
        "name": "Telos",
        "symbol": "TLOS",
        "icon": "https://static.crypto.com/token/icons/telos/color_icon.png"
    },
    {
        "name": "MARBLEX",
        "symbol": "MBX",
        "icon": "https://static.crypto.com/token/icons/marblex/color_icon.png"
    },
    {
        "name": "Euler Finance",
        "symbol": "EUL",
        "icon": "https://static.crypto.com/token/icons/euler-finance/color_icon.png"
    },
    {
        "name": "Beta Finance",
        "symbol": "BETA",
        "icon": "https://static.crypto.com/token/icons/beta-finance/color_icon.png"
    },
    {
        "name": "TokenFi",
        "symbol": "TOKEN",
        "icon": "https://static.crypto.com/token/icons/tokenfi/color_icon.png"
    },
    {
        "name": "Global Currency Reserve",
        "symbol": "GCR",
        "icon": "https://static.crypto.com/token/icons/global-currency-reserve/color_icon.png"
    },
    {
        "name": "NFPrompt",
        "symbol": "NFP",
        "icon": "https://static.crypto.com/token/icons/nfprompt/color_icon.png"
    },
    {
        "name": "DODO",
        "symbol": "DODO",
        "icon": "https://static.crypto.com/token/icons/dodo/color_icon.png"
    },
    {
        "name": "Metal",
        "symbol": "MTL",
        "icon": "https://static.crypto.com/token/icons/metal/color_icon.png"
    },
    {
        "name": "Uquid Coin",
        "symbol": "UQC",
        "icon": "https://static.crypto.com/token/icons/uquid-coin/color_icon.png"
    },
    {
        "name": "Humans.ai",
        "symbol": "HEART",
        "icon": "https://static.crypto.com/token/icons/humans-ai/color_icon.png"
    },
    {
        "name": "MAGA",
        "symbol": "MAGA",
        "icon": "https://static.crypto.com/token/icons/maga-ethereum/color_icon.png"
    },
    {
        "name": "BTU Protocol",
        "symbol": "BTU",
        "icon": "https://static.crypto.com/token/icons/btu-protocol/color_icon.png"
    },
    {
        "name": "ZB Token",
        "symbol": "ZB",
        "icon": "https://static.crypto.com/token/icons/zb-token/color_icon.png"
    },
    {
        "name": "Polyhedra Network",
        "symbol": "ZKJ",
        "icon": "https://static.crypto.com/token/icons/polyhedra-network/color_icon.png"
    },
    {
        "name": "ChainGPT",
        "symbol": "CGPT",
        "icon": "https://static.crypto.com/token/icons/chaingpt/color_icon.png"
    },
    {
        "name": "Krypton DAO",
        "symbol": "KRD",
        "icon": "https://static.crypto.com/token/icons/krypton-dao/color_icon.png"
    },
    {
        "name": "Pangolin",
        "symbol": "PNG",
        "icon": "https://static.crypto.com/token/icons/pangolin/color_icon.png"
    },
    {
        "name": "FLEX",
        "symbol": "FLEX",
        "icon": "https://static.crypto.com/token/icons/flex/color_icon.png"
    },
    {
        "name": "Binance USD",
        "symbol": "BUSD",
        "icon": "https://static.crypto.com/token/icons/binance-usd/color_icon.png"
    },
    {
        "name": "Frontier",
        "symbol": "FRONT",
        "icon": "https://static.crypto.com/token/icons/frontier/color_icon.png"
    },
    {
        "name": "MyNeighborAlice",
        "symbol": "ALICE",
        "icon": "https://static.crypto.com/token/icons/myneighboralice/color_icon.png"
    },
    {
        "name": "Staked TRX",
        "symbol": "STRX",
        "icon": "https://static.crypto.com/token/icons/staked-trx/color_icon.png"
    },
    {
        "name": "Lendefi",
        "symbol": "LDFI",
        "icon": "https://static.crypto.com/token/icons/lendefi/color_icon.png"
    },
    {
        "name": "MOBOX",
        "symbol": "MBOX",
        "icon": "https://static.crypto.com/token/icons/mobox/color_icon.png"
    },
    {
        "name": "Aurora",
        "symbol": "AURORA",
        "icon": "https://static.crypto.com/token/icons/aurora-near/color_icon.png"
    },
    {
        "name": "Orbs",
        "symbol": "ORBS",
        "icon": "https://static.crypto.com/token/icons/orbs/color_icon.png"
    },
    {
        "name": "Ergo",
        "symbol": "ERG",
        "icon": "https://static.crypto.com/token/icons/ergo/color_icon.png"
    },
    {
        "name": "MediBloc",
        "symbol": "MED",
        "icon": "https://static.crypto.com/token/icons/medibloc/color_icon.png"
    },
    {
        "name": "Adventure Gold",
        "symbol": "AGLD",
        "icon": "https://static.crypto.com/token/icons/adventure-gold/color_icon.png"
    },
    {
        "name": "Ark",
        "symbol": "ARK",
        "icon": "https://static.crypto.com/token/icons/ark/color_icon.png"
    },
    {
        "name": "Wirex Token",
        "symbol": "WXT",
        "icon": "https://static.crypto.com/token/icons/wirex-token/color_icon.png"
    },
    {
        "name": "CUDOS",
        "symbol": "CUDOS",
        "icon": "https://static.crypto.com/token/icons/cudos/color_icon.png"
    },
    {
        "name": "Orchid",
        "symbol": "OXT",
        "icon": "https://static.crypto.com/token/icons/orchid/color_icon.png"
    },
    {
        "name": "Moonwell Artemis",
        "symbol": "WELL",
        "icon": "https://static.crypto.com/token/icons/moonwell-artemis/color_icon.png"
    },
    {
        "name": "Goldfinch",
        "symbol": "GFI",
        "icon": "https://static.crypto.com/token/icons/goldfinch-protocol/color_icon.png"
    },
    {
        "name": "Forta",
        "symbol": "FORT",
        "icon": "https://static.crypto.com/token/icons/forta/color_icon.png"
    },
    {
        "name": "Wrapped NXM",
        "symbol": "WNXM",
        "icon": "https://static.crypto.com/token/icons/wrapped-nxm/color_icon.png"
    },
    {
        "name": "Radicle",
        "symbol": "RAD",
        "icon": "https://static.crypto.com/token/icons/radicle/color_icon.png"
    },
    {
        "name": "Snek",
        "symbol": "SNEK",
        "icon": "https://static.crypto.com/token/icons/snek/color_icon.png"
    },
    {
        "name": "Myria",
        "symbol": "MYRIA",
        "icon": "https://static.crypto.com/token/icons/myria/color_icon.png"
    },
    {
        "name": "The Doge NFT",
        "symbol": "DOG",
        "icon": "https://static.crypto.com/token/icons/the-doge-nft/color_icon.png"
    },
    {
        "name": "Acala Token",
        "symbol": "ACA",
        "icon": "https://static.crypto.com/token/icons/acala/color_icon.png"
    },
    {
        "name": "Spectral",
        "symbol": "SPEC",
        "icon": "https://static.crypto.com/token/icons_v2/spec-cdc/22105-1716272488084.jpeg"
    },
    {
        "name": "Alpha Venture DAO",
        "symbol": "ALPHA",
        "icon": "https://static.crypto.com/token/icons/alpha-finance-lab/color_icon.png"
    },
    {
        "name": "Mines of Dalarnia",
        "symbol": "DAR",
        "icon": "https://static.crypto.com/token/icons/mines-of-dalarnia/color_icon.png"
    },
    {
        "name": "HashAI",
        "symbol": "HASHAI",
        "icon": "https://static.crypto.com/token/icons/hashai/color_icon.png"
    },
    {
        "name": "Velo",
        "symbol": "VELO",
        "icon": "https://static.crypto.com/token/icons/velo/color_icon.png"
    },
    {
        "name": "HyperCycle",
        "symbol": "HYPC",
        "icon": "https://static.crypto.com/token/icons/hypercycle/color_icon.png"
    },
    {
        "name": "Verge",
        "symbol": "XVG",
        "icon": "https://static.crypto.com/token/icons/verge/color_icon.png"
    },
    {
        "name": "Node AI",
        "symbol": "GPU",
        "icon": "https://static.crypto.com/token/icons/node-ai/color_icon.png"
    },
    {
        "name": "Dora Factory (new)",
        "symbol": "DORA",
        "icon": "https://static.crypto.com/token/icons/dora-factory-new/color_icon.png"
    },
    {
        "name": "Bifrost (BFC)",
        "symbol": "BFC",
        "icon": "https://static.crypto.com/token/icons/bifrost/color_icon.png"
    },
    {
        "name": "Access Protocol",
        "symbol": "ACS",
        "icon": "https://static.crypto.com/token/icons/access-protocol/color_icon.png"
    },
    {
        "name": "KARRAT",
        "symbol": "KARRAT",
        "icon": "https://static.crypto.com/token/icons/karrat/color_icon.png"
    },
    {
        "name": "Ardor",
        "symbol": "ARDR",
        "icon": "https://static.crypto.com/token/icons/ardor/color_icon.png"
    },
    {
        "name": "MANEKI",
        "symbol": "MANEKI",
        "icon": "https://static.crypto.com/token/icons/maneki-coin/color_icon.png"
    },
    {
        "name": "Loom Network",
        "symbol": "LOOM",
        "icon": "https://static.crypto.com/token/icons/loom-network/color_icon.png"
    },
    {
        "name": "BENQI",
        "symbol": "QI",
        "icon": "https://static.crypto.com/token/icons/benqi/color_icon.png"
    },
    {
        "name": "ARPA Chain",
        "symbol": "ARPA",
        "icon": "https://static.crypto.com/token/icons/arpa-chain/color_icon.png"
    },
    {
        "name": "Radiant Capital",
        "symbol": "RDNT",
        "icon": "https://static.crypto.com/token/icons/radiant-capital/color_icon.png"
    },
    {
        "name": "Anchored Coins AEUR",
        "symbol": "AEUR",
        "icon": "https://static.crypto.com/token/icons/anchored-coins-aeur/color_icon.png"
    },
    {
        "name": "SuperRare",
        "symbol": "RARE",
        "icon": "https://static.crypto.com/token/icons/superrare/color_icon.png"
    },
    {
        "name": "USD+",
        "symbol": "USD+",
        "icon": "https://static.crypto.com/token/icons/usd/color_icon.png"
    },
    {
        "name": "Tensor",
        "symbol": "TNSR",
        "icon": "https://static.crypto.com/token/icons/tensor/color_icon.png"
    },
    {
        "name": "Aavegotchi",
        "symbol": "GHST",
        "icon": "https://static.crypto.com/token/icons/aavegotchi/color_icon.png"
    },
    {
        "name": "Bitget Wallet Token",
        "symbol": "BWB",
        "icon": "https://static.crypto.com/token/icons/bitget-wallet-token/color_icon.png"
    },
    {
        "name": "Venus BUSD",
        "symbol": "vBUSD",
        "icon": "https://static.crypto.com/token/icons/venus-busd/color_icon.png"
    },
    {
        "name": "Energy Web Token",
        "symbol": "EWT",
        "icon": "https://static.crypto.com/token/icons/energy-web-token/color_icon.png"
    },
    {
        "name": "Heroes of Mavia",
        "symbol": "MAVIA",
        "icon": "https://static.crypto.com/token/icons/heroes-of-mavia/color_icon.png"
    },
    {
        "name": "Shardus",
        "symbol": "ULT",
        "icon": "https://static.crypto.com/token/icons/shardus/color_icon.png"
    },
    {
        "name": "Badger DAO",
        "symbol": "BADGER",
        "icon": "https://static.crypto.com/token/icons/badger-dao/color_icon.png"
    },
    {
        "name": "Radio Caca",
        "symbol": "RACA",
        "icon": "https://static.crypto.com/token/icons/radio-caca/color_icon.png"
    },
    {
        "name": "Maverick Protocol",
        "symbol": "MAV",
        "icon": "https://static.crypto.com/token/icons/maverick-protocol/color_icon.png"
    },
    {
        "name": "Gitcoin",
        "symbol": "GTC",
        "icon": "https://static.crypto.com/token/icons/gitcoin/color_icon.png"
    },
    {
        "name": "OctaSpace",
        "symbol": "OCTA",
        "icon": "https://static.crypto.com/token/icons/octaspace/color_icon.png"
    },
    {
        "name": "sETH2",
        "symbol": "SETH2",
        "icon": "https://static.crypto.com/token/icons/seth2/color_icon.png"
    },
    {
        "name": "Clash of Lilliput",
        "symbol": "COL",
        "icon": "https://static.crypto.com/token/icons/clash-of-lilliput/color_icon.png"
    },
    {
        "name": "TempleDAO",
        "symbol": "TEMPLE",
        "icon": "https://static.crypto.com/token/icons/templedao/color_icon.png"
    },
    {
        "name": "Staika",
        "symbol": "STIK",
        "icon": "https://static.crypto.com/token/icons/staika/color_icon.png"
    },
    {
        "name": "NKN",
        "symbol": "NKN",
        "icon": "https://static.crypto.com/token/icons/nkn/color_icon.png"
    },
    {
        "name": "Zebec Network",
        "symbol": "ZBCN",
        "icon": "https://static.crypto.com/token/icons/zebec-network/color_icon.png"
    },
    {
        "name": "WazirX",
        "symbol": "WRX",
        "icon": "https://static.crypto.com/token/icons/wazirx/color_icon.png"
    },
    {
        "name": "Hifi Finance",
        "symbol": "HIFI",
        "icon": "https://static.crypto.com/token/icons/hifi-finance-new/color_icon.png"
    },
    {
        "name": "Cannation",
        "symbol": "CNNC",
        "icon": "https://static.crypto.com/token/icons/cannation/color_icon.png"
    },
    {
        "name": "Ecoin",
        "symbol": "ECOIN",
        "icon": "https://static.crypto.com/token/icons/ecoin-2/color_icon.png"
    },
    {
        "name": "Compound Dai",
        "symbol": "CDAI",
        "icon": "https://static.crypto.com/token/icons/compound-dai/color_icon.png"
    },
    {
        "name": "Toko Token",
        "symbol": "TKO",
        "icon": "https://static.crypto.com/token/icons/tokocrypto/color_icon.png"
    },
    {
        "name": "Magic Internet Money",
        "symbol": "MIM",
        "icon": "https://static.crypto.com/token/icons/magic-internet-money/color_icon.png"
    },
    {
        "name": "Origin Protocol",
        "symbol": "OGN",
        "icon": "https://static.crypto.com/token/icons/origin-protocol/color_icon.png"
    },
    {
        "name": "ankrETH",
        "symbol": "aEth",
        "icon": "https://static.crypto.com/token/icons/ankreth/color_icon.png"
    },
    {
        "name": "XPLA",
        "symbol": "XPLA",
        "icon": "https://static.crypto.com/token/icons/xpla/color_icon.png"
    },
    {
        "name": "Velodrome Finance",
        "symbol": "VELO",
        "icon": "https://static.crypto.com/token/icons/velodrome-finance/color_icon.png"
    },
    {
        "name": "Gearbox Protocol",
        "symbol": "GEAR",
        "icon": "https://static.crypto.com/token/icons/gearbox-protocol/color_icon.png"
    },
    {
        "name": "GuildFi",
        "symbol": "GF",
        "icon": "https://static.crypto.com/token/icons/guildfi/color_icon.png"
    },
    {
        "name": "Eigenpie mstETH",
        "symbol": "MSTETH",
        "icon": "https://static.crypto.com/token/icons/eigenpie-msteth/color_icon.png"
    },
    {
        "name": "Hoppy",
        "symbol": "HOPPY",
        "icon": "https://static.crypto.com/token/icons/hoppy-coin/color_icon.png"
    },
    {
        "name": "CoW Protocol",
        "symbol": "COW",
        "icon": "https://static.crypto.com/token/icons/cow-protocol/color_icon.png"
    },
    {
        "name": "Syntropy",
        "symbol": "NOIA",
        "icon": "https://static.crypto.com/token/icons/syntropy/color_icon.png"
    },
    {
        "name": "LTO Network",
        "symbol": "LTO",
        "icon": "https://static.crypto.com/token/icons/lto-network/color_icon.png"
    },
    {
        "name": "Enzyme",
        "symbol": "MLN",
        "icon": "https://static.crypto.com/token/icons/enzyme/color_icon.png"
    },
    {
        "name": "Dynex",
        "symbol": "DNX",
        "icon": "https://static.crypto.com/token/icons/dynex/color_icon.png"
    },
    {
        "name": "Pirate Nation",
        "symbol": "PIRATE",
        "icon": "https://static.crypto.com/token/icons/pirate-nation/color_icon.png"
    },
    {
        "name": "AGORIC",
        "symbol": "BLD",
        "icon": "https://static.crypto.com/token/icons/agoric/color_icon.png"
    },
    {
        "name": "RAMP",
        "symbol": "RAMP",
        "icon": "https://static.crypto.com/token/icons/ramp/color_icon.png"
    },
    {
        "name": "Wrapped Fantom",
        "symbol": "WFTM",
        "icon": "https://static.crypto.com/token/icons/wrapped-fantom/color_icon.png"
    },
    {
        "name": "LooksRare",
        "symbol": "LOOKS",
        "icon": "https://static.crypto.com/token/icons/looksrare/color_icon.png"
    },
    {
        "name": "Tectum",
        "symbol": "TET",
        "icon": "https://static.crypto.com/token/icons/tectum/color_icon.png"
    },
    {
        "name": "ArbDoge AI",
        "symbol": "AIDOGE",
        "icon": "https://static.crypto.com/token/icons/arbdoge-ai/color_icon.png"
    },
    {
        "name": "DeFi Pulse Index",
        "symbol": "DPI",
        "icon": "https://static.crypto.com/token/icons/defi-pulse-index/color_icon.png"
    },
    {
        "name": "GameBuild",
        "symbol": "GAME",
        "icon": "https://static.crypto.com/token/icons/gamebuild/color_icon.png"
    },
    {
        "name": "QuarkChain",
        "symbol": "QKC",
        "icon": "https://static.crypto.com/token/icons/quarkchain/color_icon.png"
    },
    {
        "name": "Whiteheart",
        "symbol": "WHITE",
        "icon": "https://static.crypto.com/token/icons/whiteheart/color_icon.png"
    },
    {
        "name": "AllianceBlock Nexera",
        "symbol": "NXRA",
        "icon": "https://static.crypto.com/token/icons/allianceblock-nexera/color_icon.png"
    },
    {
        "name": "crow with knife",
        "symbol": "CAW",
        "icon": "https://static.crypto.com/token/icons/crow-with-knife/color_icon.png"
    },
    {
        "name": "CANTO",
        "symbol": "CANTO",
        "icon": "https://static.crypto.com/token/icons/canto/color_icon.png"
    },
    {
        "name": "ViciCoin",
        "symbol": "VCNT",
        "icon": "https://static.crypto.com/token/icons/vicicoin/color_icon.png"
    },
    {
        "name": "Maple",
        "symbol": "MPL",
        "icon": "https://static.crypto.com/token/icons/maple/color_icon.png"
    },
    {
        "name": "Netrum",
        "symbol": "NTR",
        "icon": "https://static.crypto.com/token/icons/netrum/color_icon.png"
    },
    {
        "name": "MetFi",
        "symbol": "MFI",
        "icon": "https://static.crypto.com/token/icons/metfi2/color_icon.png"
    },
    {
        "name": "Elastos",
        "symbol": "ELA",
        "icon": "https://static.crypto.com/token/icons/elastos/color_icon.png"
    },
    {
        "name": "Alien Worlds",
        "symbol": "TLM",
        "icon": "https://static.crypto.com/token/icons/alien-worlds/color_icon.png"
    },
    {
        "name": "smARTOFGIVING",
        "symbol": "AOG",
        "icon": "https://static.crypto.com/token/icons/smartofgiving/color_icon.png"
    },
    {
        "name": "QANplatform",
        "symbol": "QANX",
        "icon": "https://static.crypto.com/token/icons/qanplatform/color_icon.png"
    },
    {
        "name": "StormX",
        "symbol": "STMX",
        "icon": "https://static.crypto.com/token/icons/stormx/color_icon.png"
    },
    {
        "name": "Ethernity Chain",
        "symbol": "ERN",
        "icon": "https://static.crypto.com/token/icons/ethernity-chain/color_icon.png"
    },
    {
        "name": "Aleph.im",
        "symbol": "ALEPH",
        "icon": "https://static.crypto.com/token/icons/aleph-im/color_icon.png"
    },
    {
        "name": "ALEX Lab",
        "symbol": "ALEX",
        "icon": "https://static.crypto.com/token/icons/alex-lab/color_icon.png"
    },
    {
        "name": "CAW(A Hunters Dream)",
        "symbol": "CAW",
        "icon": "https://static.crypto.com/token/icons/caw/color_icon.png"
    },
    {
        "name": "REI Network",
        "symbol": "REI",
        "icon": "https://static.crypto.com/token/icons/rei-network/color_icon.png"
    },
    {
        "name": "Grok",
        "symbol": "GROK",
        "icon": "https://static.crypto.com/token/icons/grok-erc/color_icon.png"
    },
    {
        "name": "Trias Token (new)",
        "symbol": "TRIAS",
        "icon": "https://static.crypto.com/token/icons/trias-token/color_icon.png"
    },
    {
        "name": "GamerCoin",
        "symbol": "GHX",
        "icon": "https://static.crypto.com/token/icons/gamercoin/color_icon.png"
    },
    {
        "name": "ChainSwap",
        "symbol": "CSWAP",
        "icon": "https://static.crypto.com/token/icons/chain-swap/color_icon.png"
    },
    {
        "name": "Automata Network",
        "symbol": "ATA",
        "icon": "https://static.crypto.com/token/icons/automata-network/color_icon.png"
    },
    {
        "name": "Clover Finance",
        "symbol": "CLV",
        "icon": "https://static.crypto.com/token/icons/clover/color_icon.png"
    },
    {
        "name": "VitaDAO",
        "symbol": "VITA",
        "icon": "https://static.crypto.com/token/icons/vitadao/color_icon.png"
    },
    {
        "name": "Huobi Token",
        "symbol": "HT",
        "icon": "https://static.crypto.com/token/icons/huobi-token/color_icon.png"
    },
    {
        "name": "Tokamak Network",
        "symbol": "TON",
        "icon": "https://static.crypto.com/token/icons/tokamak-network/color_icon.png"
    },
    {
        "name": "Bitgert",
        "symbol": "BRISE",
        "icon": "https://static.crypto.com/token/icons/bitrise-token/color_icon.png"
    },
    {
        "name": "Orion Protocol",
        "symbol": "ORN",
        "icon": "https://static.crypto.com/token/icons/orion-protocol/color_icon.png"
    },
    {
        "name": "USD Base Coin",
        "symbol": "USDbC",
        "icon": "https://static.crypto.com/token/icons/usd-base-coin/color_icon.png"
    },
    {
        "name": "bZx Protocol",
        "symbol": "BZRX",
        "icon": "https://static.crypto.com/token/icons/bzx-protocol/color_icon.png"
    },
    {
        "name": "WHY",
        "symbol": "WHY",
        "icon": "https://static.crypto.com/token/icons/why/color_icon.png"
    },
    {
        "name": "GameFi",
        "symbol": "GAFI",
        "icon": "https://static.crypto.com/token/icons/gamefi/color_icon.png"
    },
    {
        "name": "pSTAKE Finance",
        "symbol": "PSTAKE",
        "icon": "https://static.crypto.com/token/icons/pstake-finance/color_icon.png"
    },
    {
        "name": "Guild of Guardians",
        "symbol": "GOG",
        "icon": "https://static.crypto.com/token/icons/guild-of-guardians/color_icon.png"
    },
    {
        "name": "Alethea Artificial Liquid Intelligence Token",
        "symbol": "ALI",
        "icon": "https://static.crypto.com/token/icons/alethea-artificial-liquid-intelligence-token/color_icon.png"
    },
    {
        "name": "Function X",
        "symbol": "FX",
        "icon": "https://static.crypto.com/token/icons/function-x/color_icon.png"
    },
    {
        "name": "DEXTools",
        "symbol": "DEXT",
        "icon": "https://static.crypto.com/token/icons/dextools/color_icon.png"
    },
    {
        "name": "Across Protocol",
        "symbol": "ACX",
        "icon": "https://static.crypto.com/token/icons/across-protocol/color_icon.png"
    },
    {
        "name": "Best Fintech Investment Coin",
        "symbol": "BFIC",
        "icon": "https://static.crypto.com/token/icons/best-fintech-investment-coin/color_icon.png"
    },
    {
        "name": "Bit2Me",
        "symbol": "B2M",
        "icon": "https://static.crypto.com/token/icons/bit2me/color_icon.png"
    },
    {
        "name": "JPool Staking Pool Token",
        "symbol": "JSOL",
        "icon": "https://static.crypto.com/token/icons/jpool/color_icon.png"
    },
    {
        "name": "LiteCoin Ultra",
        "symbol": "LTCU",
        "icon": "https://static.crypto.com/token/icons/litecoin-ultra/color_icon.png"
    },
    {
        "name": "Ren",
        "symbol": "REN",
        "icon": "https://static.crypto.com/token/icons/ren/color_icon.png"
    },
    {
        "name": "Gods Unchained",
        "symbol": "GODS",
        "icon": "https://static.crypto.com/token/icons/gods-unchained/color_icon.png"
    },
    {
        "name": "Victoria VR",
        "symbol": "VR",
        "icon": "https://static.crypto.com/token/icons/victoria-vr/color_icon.png"
    },
    {
        "name": "Matr1x Fire",
        "symbol": "FIRE",
        "icon": "https://static.crypto.com/token/icons/matr1x-fire/color_icon.png"
    },
    {
        "name": "CoinEx Token",
        "symbol": "CET",
        "icon": "https://static.crypto.com/token/icons/coinex-token/color_icon.png"
    },
    {
        "name": "Chain",
        "symbol": "CHN",
        "icon": "https://static.crypto.com/token/icons/chain/color_icon.png"
    },
    {
        "name": "Metacraft",
        "symbol": "MCT",
        "icon": "https://static.crypto.com/token/icons/metacraft/color_icon.png"
    },
    {
        "name": "PepeFork",
        "symbol": "PORK",
        "icon": "https://static.crypto.com/token/icons/pepefork/color_icon.png"
    },
    {
        "name": "Humanscape",
        "symbol": "HUM",
        "icon": "https://static.crypto.com/token/icons/humanscape/color_icon.png"
    },
    {
        "name": "MAP Protocol",
        "symbol": "MAP",
        "icon": "https://static.crypto.com/token/icons/map-protocol/color_icon.png"
    },
    {
        "name": "Eco",
        "symbol": "ECOX",
        "icon": "https://static.crypto.com/token/icons/ecox/color_icon.png"
    },
    {
        "name": "DIA",
        "symbol": "DIA",
        "icon": "https://static.crypto.com/token/icons/dia/color_icon.png"
    },
    {
        "name": "Streamr",
        "symbol": "DATA",
        "icon": "https://static.crypto.com/token/icons/streamr/color_icon.png"
    },
    {
        "name": "Perpetual Protocol",
        "symbol": "PERP",
        "icon": "https://static.crypto.com/token/icons/perpetual-protocol/color_icon.png"
    },
    {
        "name": "Ampleforth Governance Token",
        "symbol": "FORTH",
        "icon": "https://static.crypto.com/token/icons/ampleforth-governance-token/color_icon.png"
    },
    {
        "name": "Wrapped Islamic Coin",
        "symbol": "WISLM",
        "icon": "https://static.crypto.com/token/icons/wrapped-islamic-coin/color_icon.png"
    },
    {
        "name": "Boson Protocol",
        "symbol": "BOSON",
        "icon": "https://static.crypto.com/token/icons/boson-protocol/color_icon.png"
    },
    {
        "name": "AI Analysis Token",
        "symbol": "AIAT",
        "icon": "https://static.crypto.com/token/icons/ai-analysis-token/color_icon.png"
    },
    {
        "name": "MovieBloc",
        "symbol": "MBL",
        "icon": "https://static.crypto.com/token/icons/moviebloc/color_icon.png"
    },
    {
        "name": "Polkastarter",
        "symbol": "POLS",
        "icon": "https://static.crypto.com/token/icons/polkastarter/color_icon.png"
    },
    {
        "name": "PUPS (Ordinals)",
        "symbol": "PUPS",
        "icon": "https://static.crypto.com/token/icons/pups-ordinals/color_icon.png"
    },
    {
        "name": "Cobak Token",
        "symbol": "CBK",
        "icon": "https://static.crypto.com/token/icons/cobak-token/color_icon.png"
    },
    {
        "name": "Rarible",
        "symbol": "RARI",
        "icon": "https://static.crypto.com/token/icons/rarible/color_icon.png"
    },
    {
        "name": "PlatON",
        "symbol": "LAT",
        "icon": "https://static.crypto.com/token/icons/platon/color_icon.png"
    },
    {
        "name": "Contentos",
        "symbol": "COS",
        "icon": "https://static.crypto.com/token/icons/contentos/color_icon.png"
    },
    {
        "name": "Sovryn",
        "symbol": "SOV",
        "icon": "https://static.crypto.com/token/icons/sovryn/color_icon.png"
    },
    {
        "name": "Electroneum",
        "symbol": "ETN",
        "icon": "https://static.crypto.com/token/icons/electroneum/color_icon.png"
    },
    {
        "name": "StrikeX",
        "symbol": "STRX",
        "icon": "https://static.crypto.com/token/icons/strikecoin/color_icon.png"
    },
    {
        "name": "Cocos-BCX",
        "symbol": "COCOS",
        "icon": "https://static.crypto.com/token/icons/cocos-bcx/color_icon.png"
    },
    {
        "name": "Agoras",
        "symbol": "AGRS",
        "icon": "https://static.crypto.com/token/icons/agoras-tokens/color_icon.png"
    },
    {
        "name": "Metadium",
        "symbol": "META",
        "icon": "https://static.crypto.com/token/icons/metadium/color_icon.png"
    },
    {
        "name": "Boba Network",
        "symbol": "BOBA",
        "icon": "https://static.crypto.com/token/icons/boba-network/color_icon.png"
    },
    {
        "name": "Star Atlas DAO",
        "symbol": "POLIS",
        "icon": "https://static.crypto.com/token/icons/star-atlas-polis/color_icon.png"
    },
    {
        "name": "Saitama V2",
        "symbol": "SAITAMA",
        "icon": "https://static.crypto.com/token/icons/saitama-inu-new/color_icon.png"
    },
    {
        "name": "district0x",
        "symbol": "DNT",
        "icon": "https://static.crypto.com/token/icons/district0x/color_icon.png"
    },
    {
        "name": "Hifi Finance",
        "symbol": "MFT",
        "icon": "https://static.crypto.com/token/icons/mainframe/color_icon.png"
    },
    {
        "name": "Unifi Protocol DAO",
        "symbol": "UNFI",
        "icon": "https://static.crypto.com/token/icons/unifi-protocol-dao/color_icon.png"
    },
    {
        "name": "Coreum",
        "symbol": "CORE",
        "icon": "https://static.crypto.com/token/icons/coreum/color_icon.png"
    },
    {
        "name": "Komodo",
        "symbol": "KMD",
        "icon": "https://static.crypto.com/token/icons/komodo/color_icon.png"
    },
    {
        "name": "Litentry",
        "symbol": "LIT",
        "icon": "https://static.crypto.com/token/icons/litentry/color_icon.png"
    },
    {
        "name": "Ultima",
        "symbol": "ULTIMA",
        "icon": "https://static.crypto.com/token/icons/ultima/color_icon.png"
    },
    {
        "name": "Dimitra",
        "symbol": "DMTR",
        "icon": "https://static.crypto.com/token/icons/dimitra/color_icon.png"
    },
    {
        "name": "Router Protocol",
        "symbol": "ROUTE",
        "icon": "https://static.crypto.com/token/icons/router-protocol/color_icon.png"
    },
    {
        "name": "Chainge",
        "symbol": "CHNG",
        "icon": "https://static.crypto.com/token/icons/chainge/color_icon.png"
    },
    {
        "name": "Star Atlas",
        "symbol": "ATLAS",
        "icon": "https://static.crypto.com/token/icons/star-atlas/color_icon.png"
    },
    {
        "name": "GME",
        "symbol": "GME",
        "icon": "https://static.crypto.com/token/icons/gme/color_icon.png"
    },
    {
        "name": "sETH",
        "symbol": "SETH",
        "icon": "https://static.crypto.com/token/icons/seth/color_icon.png"
    },
    {
        "name": "Sologenic",
        "symbol": "SOLO",
        "icon": "https://static.crypto.com/token/icons/sologenic/color_icon.png"
    },
    {
        "name": "Stafi",
        "symbol": "FIS",
        "icon": "https://static.crypto.com/token/icons/stafi/color_icon.png"
    },
    {
        "name": "HAY",
        "symbol": "HAY",
        "icon": "https://static.crypto.com/token/icons/helio-money/color_icon.png"
    },
    {
        "name": "FUN Token",
        "symbol": "FUN",
        "icon": "https://static.crypto.com/token/icons/funtoken/color_icon.png"
    },
    {
        "name": "Vertex Protocol",
        "symbol": "VRTX",
        "icon": "https://static.crypto.com/token/icons/vertex-protocol/color_icon.png"
    },
    {
        "name": "Wrapped IoTeX",
        "symbol": "WIOTX",
        "icon": "https://static.crypto.com/token/icons/wrapped-iotex/color_icon.png"
    },
    {
        "name": "Magpie",
        "symbol": "MGP",
        "icon": "https://static.crypto.com/token/icons/magpie/color_icon.png"
    },
    {
        "name": "LUKSO",
        "symbol": "LYXe",
        "icon": "https://static.crypto.com/token/icons/lukso/color_icon.png"
    },
    {
        "name": "Aergo",
        "symbol": "AERGO",
        "icon": "https://static.crypto.com/token/icons/aergo/color_icon.png"
    },
    {
        "name": "DEAPcoin",
        "symbol": "DEP",
        "icon": "https://static.crypto.com/token/icons/deapcoin/color_icon.png"
    },
    {
        "name": "Kin",
        "symbol": "KIN",
        "icon": "https://static.crypto.com/token/icons_v2/kin/432-1710756948603.png"
    },
    {
        "name": "Euro Coin",
        "symbol": "EUROC",
        "icon": "https://static.crypto.com/token/icons/euro-coin/color_icon.png"
    },
    {
        "name": "Tether EURt",
        "symbol": "EURT",
        "icon": "https://static.crypto.com/token/icons/tether-eurt/color_icon.png"
    },
    {
        "name": "DeGate",
        "symbol": "DG",
        "icon": "https://static.crypto.com/token/icons/degate/color_icon.png"
    },
    {
        "name": "Rally",
        "symbol": "RLY",
        "icon": "https://static.crypto.com/token/icons/rally/color_icon.png"
    },
    {
        "name": "Railgun",
        "symbol": "RAIL",
        "icon": "https://static.crypto.com/token/icons/railgun/color_icon.png"
    },
    {
        "name": "Alchemix",
        "symbol": "ALCX",
        "icon": "https://static.crypto.com/token/icons/alchemix/color_icon.png"
    },
    {
        "name": "Ultra",
        "symbol": "UOS",
        "icon": "https://static.crypto.com/token/icons/ultra/color_icon.png"
    },
    {
        "name": "Crown by Third Time Games",
        "symbol": "CROWN",
        "icon": "https://static.crypto.com/token/icons/crown-by-third-time-games/color_icon.png"
    },
    {
        "name": "Flamingo",
        "symbol": "FLM",
        "icon": "https://static.crypto.com/token/icons/flamingo/color_icon.png"
    },
    {
        "name": "ArchLoot",
        "symbol": "ALT",
        "icon": "https://static.crypto.com/token/icons/archloot/color_icon.png"
    },
    {
        "name": "EverGrow Coin",
        "symbol": "EGC",
        "icon": "https://static.crypto.com/token/icons/evergrowcoin/color_icon.png"
    },
    {
        "name": "Apeiros",
        "symbol": "APRS",
        "icon": "https://static.crypto.com/token/icons/apeiron/color_icon.png"
    },
    {
        "name": "SaucerSwap",
        "symbol": "SAUCE",
        "icon": "https://static.crypto.com/token/icons/saucerswap/color_icon.png"
    },
    {
        "name": "Snowbank",
        "symbol": "SB",
        "icon": "https://static.crypto.com/token/icons/snowbank/color_icon.png"
    },
    {
        "name": "Multibit",
        "symbol": "MUBI",
        "icon": "https://static.crypto.com/token/icons/multibit/color_icon.png"
    },
    {
        "name": "BLOCKv",
        "symbol": "VEE",
        "icon": "https://static.crypto.com/token/icons/blockv/color_icon.png"
    },
    {
        "name": "Linear",
        "symbol": "LINA",
        "icon": "https://static.crypto.com/token/icons/linear/color_icon.png"
    },
    {
        "name": "Pirate Chain",
        "symbol": "ARRR",
        "icon": "https://static.crypto.com/token/icons/pirate-chain/color_icon.png"
    },
    {
        "name": "Venus USDT",
        "symbol": "vUSDT",
        "icon": "https://static.crypto.com/token/icons/venus-usdt/color_icon.png"
    },
    {
        "name": "Sweat Economy",
        "symbol": "SWEAT",
        "icon": "https://static.crypto.com/token/icons/sweat-economy/color_icon.png"
    },
    {
        "name": "Celo Dollar",
        "symbol": "CUSD",
        "icon": "https://static.crypto.com/token/icons/celo-dollar/color_icon.png"
    },
    {
        "name": "SIDUS",
        "symbol": "SIDUS",
        "icon": "https://static.crypto.com/token/icons/sidus/color_icon.png"
    },
    {
        "name": "Bella Protocol",
        "symbol": "BEL",
        "icon": "https://static.crypto.com/token/icons/bella-protocol/color_icon.png"
    },
    {
        "name": "Kishu Inu",
        "symbol": "KISHU",
        "icon": "https://static.crypto.com/token/icons/kishu-inu/color_icon.png"
    },
    {
        "name": "Dego Finance",
        "symbol": "DEGO",
        "icon": "https://static.crypto.com/token/icons/dego-finance/color_icon.png"
    },
    {
        "name": "Mdex",
        "symbol": "MDX",
        "icon": "https://static.crypto.com/token/icons/mdex/color_icon.png"
    },
    {
        "name": "Hive Dollar",
        "symbol": "HBD",
        "icon": "https://static.crypto.com/token/icons/hive-dollar/color_icon.png"
    },
    {
        "name": "Samoyedcoin",
        "symbol": "SAMO",
        "icon": "https://static.crypto.com/token/icons/samoyedcoin/color_icon.png"
    },
    {
        "name": "Ultiverse",
        "symbol": "ULTI",
        "icon": "https://static.crypto.com/token/icons/ultiverse/color_icon.png"
    },
    {
        "name": "Persistence",
        "symbol": "XPRT",
        "icon": "https://static.crypto.com/token/icons/persistence/color_icon.png"
    },
    {
        "name": "THORSwap",
        "symbol": "THOR",
        "icon": "https://static.crypto.com/token/icons/thorswap/color_icon.png"
    },
    {
        "name": "HUNT",
        "symbol": "HUNT",
        "icon": "https://static.crypto.com/token/icons/hunt/color_icon.png"
    },
    {
        "name": "VAIOT",
        "symbol": "VAI",
        "icon": "https://static.crypto.com/token/icons/vaiot/color_icon.png"
    },
    {
        "name": "NULS",
        "symbol": "NULS",
        "icon": "https://static.crypto.com/token/icons/nuls/color_icon.png"
    },
    {
        "name": "Wrapped TAO",
        "symbol": "WTAO",
        "icon": "https://static.crypto.com/token/icons/wrapped-tao/color_icon.png"
    },
    {
        "name": "Paris Saint-Germain Fan Token",
        "symbol": "PSG",
        "icon": "https://static.crypto.com/token/icons/paris-saint-germain-fan-token/color_icon.png"
    },
    {
        "name": "Bonfida",
        "symbol": "FIDA",
        "icon": "https://static.crypto.com/token/icons/bonfida/color_icon.png"
    },
    {
        "name": "The Root Network",
        "symbol": "ROOT",
        "icon": "https://static.crypto.com/token/icons/the-root-network/color_icon.png"
    },
    {
        "name": "PlayDapp",
        "symbol": "PDA",
        "icon": "https://static.crypto.com/token/icons_v2/playdapp/3605-1712721595147.png"
    },
    {
        "name": "RichQUACK.com",
        "symbol": "QUACK",
        "icon": "https://static.crypto.com/token/icons/richquack-com/color_icon.png"
    },
    {
        "name": "sUSD",
        "symbol": "SUSD",
        "icon": "https://static.crypto.com/token/icons/susd/color_icon.png"
    },
    {
        "name": "Entangle",
        "symbol": "NGL",
        "icon": "https://static.crypto.com/token/icons/entangle/color_icon.png"
    },
    {
        "name": "JPEG'd",
        "symbol": "JPEG",
        "icon": "https://static.crypto.com/token/icons/jpeg-d/color_icon.png"
    },
    {
        "name": "Verasity",
        "symbol": "VRA",
        "icon": "https://static.crypto.com/token/icons/verasity/color_icon.png"
    },
    {
        "name": "Wanchain",
        "symbol": "WAN",
        "icon": "https://static.crypto.com/token/icons/wanchain/color_icon.png"
    },
    {
        "name": "Doge Killer",
        "symbol": "LEASH",
        "icon": "https://static.crypto.com/token/icons/doge-killer/color_icon.png"
    },
    {
        "name": "Games for a living",
        "symbol": "GFAL",
        "icon": "https://static.crypto.com/token/icons/games-for-a-living/color_icon.png"
    },
    {
        "name": "OmniFlix Network",
        "symbol": "FLIX",
        "icon": "https://static.crypto.com/token/icons/omniflix-network/color_icon.png"
    },
    {
        "name": "Miracle Play",
        "symbol": "MPT",
        "icon": "https://static.crypto.com/token/icons/miracle-play/color_icon.png"
    },
    {
        "name": "Aura Finance",
        "symbol": "AURA",
        "icon": "https://static.crypto.com/token/icons/aura-finance/color_icon.png"
    },
    {
        "name": "Agora Defi",
        "symbol": "AGORA",
        "icon": "https://static.crypto.com/token/icons/agora-defi/color_icon.png"
    },
    {
        "name": "Assemble Protocol",
        "symbol": "ASM",
        "icon": "https://static.crypto.com/token/icons/assemble-protocol/color_icon.png"
    },
    {
        "name": "Numbers Protocol",
        "symbol": "NUM",
        "icon": "https://static.crypto.com/token/icons/numbers-protocol/color_icon.png"
    },
    {
        "name": "Travala.com",
        "symbol": "AVA",
        "icon": "https://static.crypto.com/token/icons/travala/color_icon.png"
    },
    {
        "name": "Measurable Data Token",
        "symbol": "MDT",
        "icon": "https://static.crypto.com/token/icons/measurable-data-token/color_icon.png"
    },
    {
        "name": "Steem Dollars",
        "symbol": "SBD",
        "icon": "https://static.crypto.com/token/icons/steem-dollars/color_icon.png"
    },
    {
        "name": "ThunderCore",
        "symbol": "TT",
        "icon": "https://static.crypto.com/token/icons/thundercore/color_icon.png"
    },
    {
        "name": "Student Coin",
        "symbol": "STC",
        "icon": "https://static.crypto.com/token/icons/student-coin/color_icon.png"
    },
    {
        "name": "IDEX",
        "symbol": "IDEX",
        "icon": "https://static.crypto.com/token/icons/idex/color_icon.png"
    },
    {
        "name": "Rome",
        "symbol": "ROME",
        "icon": "https://static.crypto.com/token/icons/rome/color_icon.png"
    },
    {
        "name": "TomoChain",
        "symbol": "TOMO",
        "icon": "https://static.crypto.com/token/icons/tomochain/color_icon.png"
    },
    {
        "name": "UXD Protocol",
        "symbol": "UXP",
        "icon": "https://static.crypto.com/token/icons/uxd-protocol/color_icon.png"
    },
    {
        "name": "Ultiledger",
        "symbol": "ULT",
        "icon": "https://static.crypto.com/token/icons/ultiledger/color_icon.png"
    },
    {
        "name": "Propchain",
        "symbol": "PROPC",
        "icon": "https://static.crypto.com/token/icons/propchain/color_icon.png"
    },
    {
        "name": "Isiklar Coin",
        "symbol": "ISIKC",
        "icon": "https://static.crypto.com/token/icons/isiklar-coin/color_icon.png"
    },
    {
        "name": "DIMO",
        "symbol": "DIMO",
        "icon": "https://static.crypto.com/token/icons/dimo/color_icon.png"
    },
    {
        "name": "SingularityDAO",
        "symbol": "SDAO",
        "icon": "https://static.crypto.com/token/icons/singularitydao/color_icon.png"
    },
    {
        "name": "Botto",
        "symbol": "BOTTO",
        "icon": "https://static.crypto.com/token/icons/botto/color_icon.png"
    },
    {
        "name": "Commune AI",
        "symbol": "COMAI",
        "icon": "https://static.crypto.com/token/icons/commune-ai/color_icon.png"
    },
    {
        "name": "Stargaze",
        "symbol": "STARS",
        "icon": "https://static.crypto.com/token/icons/stargaze/color_icon.png"
    },
    {
        "name": "Cornucopias",
        "symbol": "COPI",
        "icon": "https://static.crypto.com/token/icons/cornucopias/color_icon.png"
    },
    {
        "name": "Meter Governance",
        "symbol": "MTRG",
        "icon": "https://static.crypto.com/token/icons/meter-governance/color_icon.png"
    },
    {
        "name": "Compound Basic Attention Token",
        "symbol": "CBAT",
        "icon": "https://static.crypto.com/token/icons/compound-basic-attention-token/color_icon.png"
    },
    {
        "name": "Cortex",
        "symbol": "CTXC",
        "icon": "https://static.crypto.com/token/icons/cortex/color_icon.png"
    },
    {
        "name": "Harvest Finance",
        "symbol": "FARM",
        "icon": "https://static.crypto.com/token/icons/harvest-finance/color_icon.png"
    },
    {
        "name": "Merit Circle",
        "symbol": "MC",
        "icon": "https://static.crypto.com/token/icons/merit-circle/color_icon.png"
    },
    {
        "name": "Morpheus.Network",
        "symbol": "MNW",
        "icon": "https://static.crypto.com/token/icons/morpheus-network/color_icon.png"
    },
    {
        "name": "QuickSwap",
        "symbol": "QUICK",
        "icon": "https://static.crypto.com/token/icons/quickswap/color_icon.png"
    },
    {
        "name": "Marinade",
        "symbol": "MNDE",
        "icon": "https://static.crypto.com/token/icons/mnde/color_icon.png"
    },
    {
        "name": "League of Kingdoms Arena",
        "symbol": "LOKA",
        "icon": "https://static.crypto.com/token/icons/league-of-kingdoms/color_icon.png"
    },
    {
        "name": "Biswap",
        "symbol": "BSW",
        "icon": "https://static.crypto.com/token/icons/biswap/color_icon.png"
    },
    {
        "name": "Reef",
        "symbol": "REEF",
        "icon": "https://static.crypto.com/token/icons/reef/color_icon.png"
    },
    {
        "name": "Huobi BTC",
        "symbol": "HBTC",
        "icon": "https://static.crypto.com/token/icons/huobi-btc/color_icon.png"
    },
    {
        "name": "Celsius",
        "symbol": "CEL",
        "icon": "https://static.crypto.com/token/icons/celsius/color_icon.png"
    },
    {
        "name": "TRAC",
        "symbol": "TRAC",
        "icon": "https://static.crypto.com/token/icons/trac/color_icon.png"
    },
    {
        "name": "ZTX",
        "symbol": "ZTX",
        "icon": "https://static.crypto.com/token/icons/ztx/color_icon.png"
    },
    {
        "name": "Verum Coin",
        "symbol": "VERUM",
        "icon": "https://static.crypto.com/token/icons/verum-coin/color_icon.png"
    },
    {
        "name": "LUFFY",
        "symbol": "LUFFY",
        "icon": "https://static.crypto.com/token/icons/luffy/color_icon.png"
    },
    {
        "name": "Neopin",
        "symbol": "NPT",
        "icon": "https://static.crypto.com/token/icons/neopin/color_icon.png"
    },
    {
        "name": "Quickswap[New]",
        "symbol": "QUICK",
        "icon": "https://static.crypto.com/token/icons/quickswap-new/color_icon.png"
    },
    {
        "name": "Concordium",
        "symbol": "CCD",
        "icon": "https://static.crypto.com/token/icons/concordium/color_icon.png"
    },
    {
        "name": "IX Token",
        "symbol": "IXT",
        "icon": "https://static.crypto.com/token/icons/ix-token/color_icon.png"
    },
    {
        "name": "XSGD",
        "symbol": "XSGD",
        "icon": "https://static.crypto.com/token/icons/xsgd/color_icon.png"
    },
    {
        "name": "Dexalot",
        "symbol": "ALOT",
        "icon": "https://static.crypto.com/token/icons/dexalot/color_icon.png"
    },
    {
        "name": "Burnedfi",
        "symbol": "BURN",
        "icon": "https://static.crypto.com/token/icons/burnedfi-app/color_icon.png"
    },
    {
        "name": "BIM",
        "symbol": "BIM",
        "icon": "https://static.crypto.com/token/icons/bim/color_icon.png"
    },
    {
        "name": "Selfkey",
        "symbol": "KEY",
        "icon": "https://static.crypto.com/token/icons/selfkey/color_icon.png"
    },
    {
        "name": "Reserve",
        "symbol": "RSV",
        "icon": "https://static.crypto.com/token/icons/reserve/color_icon.png"
    },
    {
        "name": "ASD",
        "symbol": "ASD",
        "icon": "https://static.crypto.com/token/icons/bitmax-token/color_icon.png"
    },
    {
        "name": "KlimaDAO",
        "symbol": "KLIMA",
        "icon": "https://static.crypto.com/token/icons/klimadao/color_icon.png"
    },
    {
        "name": "FirmaChain",
        "symbol": "FCT",
        "icon": "https://static.crypto.com/token/icons/firmachain/color_icon.png"
    },
    {
        "name": "Stride Staked DYDX",
        "symbol": "stDYDX",
        "icon": "https://static.crypto.com/token/icons/stride-staked-dydx/color_icon.png"
    },
    {
        "name": "Hacken Token",
        "symbol": "HAI",
        "icon": "https://static.crypto.com/token/icons/hackenai/color_icon.png"
    },
    {
        "name": "Ice Network",
        "symbol": "ICE",
        "icon": "https://static.crypto.com/token/icons/ice-decentralized-future/color_icon.png"
    },
    {
        "name": "Ampleforth",
        "symbol": "AMPL",
        "icon": "https://static.crypto.com/token/icons/ampleforth/color_icon.png"
    },
    {
        "name": "LOBO•THE•WOLF•PUP",
        "symbol": "LOBO",
        "icon": "https://static.crypto.com/token/icons/lobo-the-wolf-pup/color_icon.png"
    },
    {
        "name": "BlackCardCoin",
        "symbol": "BCCOIN",
        "icon": "https://static.crypto.com/token/icons/blackcardcoin/color_icon.png"
    },
    {
        "name": "MobileCoin",
        "symbol": "MOB",
        "icon": "https://static.crypto.com/token/icons/mobilecoin/color_icon.png"
    },
    {
        "name": "CEEK VR",
        "symbol": "CEEK",
        "icon": "https://static.crypto.com/token/icons/ceek-vr/color_icon.png"
    },
    {
        "name": "Stronghold Token",
        "symbol": "SHX",
        "icon": "https://static.crypto.com/token/icons/stronghold-token/color_icon.png"
    },
    {
        "name": "L7 DEX",
        "symbol": "LSD",
        "icon": "https://static.crypto.com/token/icons/l7-dex/color_icon.png"
    },
    {
        "name": "Multiplier",
        "symbol": "MXX",
        "icon": "https://static.crypto.com/token/icons/multiplier/color_icon.png"
    },
    {
        "name": "Connex",
        "symbol": "CONX",
        "icon": "https://static.crypto.com/token/icons/connex/color_icon.png"
    },
    {
        "name": "Phoenix Global [old]",
        "symbol": "PHB",
        "icon": "https://static.crypto.com/token/icons/phoenix-global/color_icon.png"
    },
    {
        "name": "Decimal",
        "symbol": "DEL",
        "icon": "https://static.crypto.com/token/icons/decimal/color_icon.png"
    },
    {
        "name": "Koinos",
        "symbol": "KOIN",
        "icon": "https://static.crypto.com/token/icons/koinos/color_icon.png"
    },
    {
        "name": "Neon EVM",
        "symbol": "NEON",
        "icon": "https://static.crypto.com/token/icons/neon/color_icon.png"
    },
    {
        "name": "Virtual Protocol",
        "symbol": "VIRTUAL",
        "icon": "https://static.crypto.com/token/icons/virtual-protocol/color_icon.png"
    },
    {
        "name": "Zano",
        "symbol": "ZANO",
        "icon": "https://static.crypto.com/token/icons_v2/zano/1695-1713889298667.png"
    },
    {
        "name": "MXC",
        "symbol": "MXC",
        "icon": "https://static.crypto.com/token/icons/mxc/color_icon.png"
    },
    {
        "name": "RSK Smart Bitcoin",
        "symbol": "RBTC",
        "icon": "https://static.crypto.com/token/icons/rsk-smart-bitcoin/color_icon.png"
    },
    {
        "name": "DeFiChain",
        "symbol": "DFI",
        "icon": "https://static.crypto.com/token/icons/defichain/color_icon.png"
    },
    {
        "name": "Gelato",
        "symbol": "GEL",
        "icon": "https://static.crypto.com/token/icons/gelato/color_icon.png"
    },
    {
        "name": "Pepe Cash",
        "symbol": "PEPECASH",
        "icon": "https://static.crypto.com/token/icons/pepe-cash/color_icon.png"
    },
    {
        "name": "ETH 2x Flexible Leverage Index",
        "symbol": "ETH2X-FLI",
        "icon": "https://static.crypto.com/token/icons/eth-2x-flexible-leverage-index/color_icon.png"
    },
    {
        "name": "MCDEX Token",
        "symbol": "MCB",
        "icon": "https://static.crypto.com/token/icons/mcdex/color_icon.png"
    },
    {
        "name": "DEPO",
        "symbol": "DEPO",
        "icon": "https://static.crypto.com/token/icons/depo/color_icon.png"
    },
    {
        "name": "Voxies",
        "symbol": "VOXEL",
        "icon": "https://static.crypto.com/token/icons_v2/voxies/9149-1703670221719.png"
    },
    {
        "name": "Venus XVS",
        "symbol": "vXVS",
        "icon": "https://static.crypto.com/token/icons/venus-xvs/color_icon.png"
    },
    {
        "name": "Volo Staked SUI",
        "symbol": "VSUI",
        "icon": "https://static.crypto.com/token/icons/volo-staked-sui/color_icon.png"
    },
    {
        "name": "Clore.ai",
        "symbol": "CLORE",
        "icon": "https://static.crypto.com/token/icons/clore-ai/color_icon.png"
    },
    {
        "name": "GAMEE",
        "symbol": "GMEE",
        "icon": "https://static.crypto.com/token/icons/gamee/color_icon.png"
    },
    {
        "name": "Klever",
        "symbol": "KLV",
        "icon": "https://static.crypto.com/token/icons/klever/color_icon.png"
    },
    {
        "name": "Parcl",
        "symbol": "PRCL",
        "icon": "https://static.crypto.com/token/icons/parcl/color_icon.png"
    },
    {
        "name": "Compound Uni",
        "symbol": "CUNI",
        "icon": "https://static.crypto.com/token/icons/compound-uniswap/color_icon.png"
    },
    {
        "name": "Opulous",
        "symbol": "OPUL",
        "icon": "https://static.crypto.com/token/icons/opulous/color_icon.png"
    },
    {
        "name": "GXChain",
        "symbol": "GXC",
        "icon": "https://static.crypto.com/token/icons/gxchain/color_icon.png"
    },
    {
        "name": "PinkSale",
        "symbol": "PINKSALE",
        "icon": "https://static.crypto.com/token/icons/pinksale/color_icon.png"
    },
    {
        "name": "IAGON",
        "symbol": "IAG",
        "icon": "https://static.crypto.com/token/icons/iagon/color_icon.png"
    },
    {
        "name": "Impossible Decentralized Incubator Access",
        "symbol": "IDIA",
        "icon": "https://static.crypto.com/token/icons/impossible-decentralized-incubator-access/color_icon.png"
    },
    {
        "name": "Wrapped Sei",
        "symbol": "WSEI",
        "icon": "https://static.crypto.com/token/icons/wrapped-sei/color_icon.png"
    },
    {
        "name": "MATH",
        "symbol": "MATH",
        "icon": "https://static.crypto.com/token/icons/math/color_icon.png"
    },
    {
        "name": "Groestlcoin",
        "symbol": "GRS",
        "icon": "https://static.crypto.com/token/icons/groestlcoin/color_icon.png"
    },
    {
        "name": "Dero",
        "symbol": "DERO",
        "icon": "https://static.crypto.com/token/icons/dero/color_icon.png"
    },
    {
        "name": "Green Satoshi Token",
        "symbol": "GST",
        "icon": "https://static.crypto.com/token/icons/green-satoshi-token/color_icon.png"
    },
    {
        "name": "Wrapped Mantle",
        "symbol": "WMNT",
        "icon": "https://static.crypto.com/token/icons/wrapped-mantle/color_icon.png"
    },
    {
        "name": "Taraxa",
        "symbol": "TARA",
        "icon": "https://static.crypto.com/token/icons/taraxa/color_icon.png"
    },
    {
        "name": "GEODNET",
        "symbol": "GEOD",
        "icon": "https://static.crypto.com/token/icons/geodnet/color_icon.png"
    },
    {
        "name": "Crob Mob",
        "symbol": "CROB",
        "icon": "https://static.crypto.com/token/icons/crob-coin/color_icon.png"
    },
    {
        "name": "Akropolis",
        "symbol": "AKRO",
        "icon": "https://static.crypto.com/token/icons/akropolis/color_icon.png"
    },
    {
        "name": "Utrust",
        "symbol": "UTK",
        "icon": "https://static.crypto.com/token/icons/utrust/color_icon.png"
    },
    {
        "name": "Beefy Finance",
        "symbol": "BIFI",
        "icon": "https://static.crypto.com/token/icons/beefy-finance/color_icon.png"
    },
    {
        "name": "Cere Network",
        "symbol": "CERE",
        "icon": "https://static.crypto.com/token/icons/cere-network/color_icon.png"
    },
    {
        "name": "Stader",
        "symbol": "SD",
        "icon": "https://static.crypto.com/token/icons/stader/color_icon.png"
    },
    {
        "name": "ThetaDrop",
        "symbol": "TDROP",
        "icon": "https://static.crypto.com/token/icons/thetadrop/color_icon.png"
    },
    {
        "name": "Keep3rV1",
        "symbol": "KP3R",
        "icon": "https://static.crypto.com/token/icons/keep3rv1/color_icon.png"
    },
    {
        "name": "Cratos",
        "symbol": "CRTS",
        "icon": "https://static.crypto.com/token/icons/cratos/color_icon.png"
    },
    {
        "name": "SideShift Token",
        "symbol": "XAI",
        "icon": "https://static.crypto.com/token/icons/sideshift-token/color_icon.png"
    },
    {
        "name": "Zero",
        "symbol": "ZERO",
        "icon": "https://static.crypto.com/token/icons/zero-tech/color_icon.png"
    },
    {
        "name": "USDK",
        "symbol": "USDK",
        "icon": "https://static.crypto.com/token/icons/usdk/color_icon.png"
    },
    {
        "name": "Graphlinq Protocol",
        "symbol": "GLQ",
        "icon": "https://static.crypto.com/token/icons/graphlinq-protocol/color_icon.png"
    },
    {
        "name": "Manifold Finance",
        "symbol": "FOLD",
        "icon": "https://static.crypto.com/token/icons/manifold-finance/color_icon.png"
    },
    {
        "name": "Sentinel Protocol",
        "symbol": "UPP",
        "icon": "https://static.crypto.com/token/icons/sentinel-protocol/color_icon.png"
    },
    {
        "name": "Smog",
        "symbol": "SMOG",
        "icon": "https://static.crypto.com/token/icons/smog/color_icon.png"
    },
    {
        "name": "Aryacoin",
        "symbol": "AYA",
        "icon": "https://static.crypto.com/token/icons/aryacoin/color_icon.png"
    },
    {
        "name": "UniLend",
        "symbol": "UFT",
        "icon": "https://static.crypto.com/token/icons/unilend/color_icon.png"
    },
    {
        "name": "Mango Markets",
        "symbol": "MNGO",
        "icon": "https://static.crypto.com/token/icons/mango-markets/color_icon.png"
    },
    {
        "name": "PolySwarm",
        "symbol": "NCT",
        "icon": "https://static.crypto.com/token/icons/polyswarm/color_icon.png"
    },
    {
        "name": "Pandora",
        "symbol": "PANDORA",
        "icon": "https://static.crypto.com/token/icons/pandora-coin/color_icon.png"
    },
    {
        "name": "Shiba Predator",
        "symbol": "QOM",
        "icon": "https://static.crypto.com/token/icons/shiba-predator/color_icon.png"
    },
    {
        "name": "iMe Lab",
        "symbol": "LIME",
        "icon": "https://static.crypto.com/token/icons/ime-lab/color_icon.png"
    },
    {
        "name": "Crypto Asset Governance Alliance",
        "symbol": "CAGA",
        "icon": "https://static.crypto.com/token/icons/crypto-asset-governance-alliance/color_icon.png"
    },
    {
        "name": "BiLira",
        "symbol": "TRYB",
        "icon": "https://static.crypto.com/token/icons/bilira/color_icon.png"
    },
    {
        "name": "Cryptex Finance",
        "symbol": "CTX",
        "icon": "https://static.crypto.com/token/icons/cryptex-finance/color_icon.png"
    },
    {
        "name": "Dexpools",
        "symbol": "DXP",
        "icon": "https://static.crypto.com/token/icons/dexpools/color_icon.png"
    },
    {
        "name": "Bankera",
        "symbol": "BNK",
        "icon": "https://static.crypto.com/token/icons/bankera/color_icon.png"
    },
    {
        "name": "DeFinder Capital",
        "symbol": "DFC",
        "icon": "https://static.crypto.com/token/icons/definder-capital/color_icon.png"
    },
    {
        "name": "TerraClassicKRW",
        "symbol": "KRTC",
        "icon": "https://static.crypto.com/token/icons/terra-krw/color_icon.png"
    },
    {
        "name": "IRISnet",
        "symbol": "IRIS",
        "icon": "https://static.crypto.com/token/icons/irisnet/color_icon.png"
    },
    {
        "name": "XeniosCoin",
        "symbol": "XNC",
        "icon": "https://static.crypto.com/token/icons/xenioscoin/color_icon.png"
    },
    {
        "name": "BOB",
        "symbol": "BOB",
        "icon": "https://static.crypto.com/token/icons/bob1/color_icon.png"
    },
    {
        "name": "Moss Coin",
        "symbol": "MOC",
        "icon": "https://static.crypto.com/token/icons/moss-coin/color_icon.png"
    },
    {
        "name": "Propbase",
        "symbol": "PROPS",
        "icon": "https://static.crypto.com/token/icons/propbase/color_icon.png"
    },
    {
        "name": "Burger Swap",
        "symbol": "BURGER",
        "icon": "https://static.crypto.com/token/icons/burger-swap/color_icon.png"
    },
    {
        "name": "PaLM AI",
        "symbol": "PALM",
        "icon": "https://static.crypto.com/token/icons/palm-ai/color_icon.png"
    },
    {
        "name": "Aquarius",
        "symbol": "AQUA",
        "icon": "https://static.crypto.com/token/icons/aquarius/color_icon.png"
    },
    {
        "name": "cheqd",
        "symbol": "CHEQ",
        "icon": "https://static.crypto.com/token/icons/cheqd/color_icon.png"
    },
    {
        "name": "Yuan Chain Coin",
        "symbol": "YCC",
        "icon": "https://static.crypto.com/token/icons/yuan-chain-coin/color_icon.png"
    },
    {
        "name": "Angle Protocol",
        "symbol": "AGEUR",
        "icon": "https://static.crypto.com/token/icons/angle-protocol/color_icon.png"
    },
    {
        "name": "VeraOne",
        "symbol": "VRO",
        "icon": "https://static.crypto.com/token/icons/veraone/color_icon.png"
    },
    {
        "name": "Wrapped Everscale",
        "symbol": "WEVER",
        "icon": "https://static.crypto.com/token/icons/wrapped-everscale/color_icon.png"
    },
        {
            "name": "e-Radix",
            "symbol": "EXRD",
            "icon": "https://static.crypto.com/token/icons/radix/color_icon.png"
        },
        {
            "name": "Wrapped NCG (Nine Chronicles Gold)",
            "symbol": "WNCG",
            "icon": "https://static.crypto.com/token/icons/wrapped-ncg/color_icon.png"
        },
        {
            "name": "Statter Network",
            "symbol": "STT",
            "icon": "https://static.crypto.com/token/icons/statter-network/color_icon.png"
        },
        {
            "name": "Polytrade",
            "symbol": "TRADE",
            "icon": "https://static.crypto.com/token/icons/polytrade/color_icon.png"
        },
        {
            "name": "WigoSwap",
            "symbol": "WIGO",
            "icon": "https://static.crypto.com/token/icons/wigoswap/color_icon.png"
        },
        {
            "name": "Tether Avalanche Bridged",
            "symbol": "USDTE",
            "icon": "https://static.crypto.com/token/icons/tether-avalanche-bridged/color_icon.png"
        },
        {
            "name": "KYVE Network",
            "symbol": "KYVE",
            "icon": "https://static.crypto.com/token/icons/kyve-network/color_icon.png"
        },
        {
            "name": "Sipher",
            "symbol": "SIPHER",
            "icon": "https://static.crypto.com/token/icons/sipher/color_icon.png"
        },
        {
            "name": "XCAD Network",
            "symbol": "XCAD",
            "icon": "https://static.crypto.com/token/icons/xcad-network/color_icon.png"
        },
        {
            "name": "BFG Token",
            "symbol": "BFG",
            "icon": "https://static.crypto.com/token/icons/betfury/color_icon.png"
        },
        {
            "name": "AhaToken",
            "symbol": "AHT",
            "icon": "https://static.crypto.com/token/icons/ahatoken/color_icon.png"
        },
        {
            "name": "Index Cooperative",
            "symbol": "INDEX",
            "icon": "https://static.crypto.com/token/icons/index-cooperative/color_icon.png"
        },
        {
            "name": "Tranchess",
            "symbol": "CHESS",
            "icon": "https://static.crypto.com/token/icons/tranchess/color_icon.png"
        },
        {
            "name": "Zero1 Labs",
            "symbol": "DEAI",
            "icon": "https://static.crypto.com/token/icons/zero1-labs/color_icon.png"
        },
        {
            "name": "Proton",
            "symbol": "XPR",
            "icon": "https://static.crypto.com/token/icons/proton/color_icon.png"
        },
        {
            "name": "Ambire AdEx",
            "symbol": "ADX",
            "icon": "https://static.crypto.com/token/icons/adx-net/color_icon.png"
        },
        {
            "name": "TokenPocket",
            "symbol": "TPT",
            "icon": "https://static.crypto.com/token/icons/tokenpocket/color_icon.png"
        },
        {
            "name": "HOPR",
            "symbol": "HOPR",
            "icon": "https://static.crypto.com/token/icons/hopr/color_icon.png"
        },
        {
            "name": "Wing Finance",
            "symbol": "WING",
            "icon": "https://static.crypto.com/token/icons/wing/color_icon.png"
        },
        {
            "name": "MON Protocol",
            "symbol": "MON",
            "icon": "https://static.crypto.com/token/icons/mon/color_icon.png"
        },
        {
            "name": "zkRace",
            "symbol": "ZERC",
            "icon": "https://static.crypto.com/token/icons_v2/derace/4974-1716284250385.png"
        },
        {
            "name": "SIX",
            "symbol": "SIX",
            "icon": "https://static.crypto.com/token/icons/six/color_icon.png"
        },
        {
            "name": "PARSIQ",
            "symbol": "PRQ",
            "icon": "https://static.crypto.com/token/icons/parsiq/color_icon.png"
        },
        {
            "name": "Minswap",
            "symbol": "MIN",
            "icon": "https://static.crypto.com/token/icons/minswap/color_icon.png"
        },
        {
            "name": "XIDO FINANCE",
            "symbol": "XIDO",
            "icon": "https://static.crypto.com/token/icons/xido-finance/color_icon.png"
        },
        {
            "name": "School Hack Coin",
            "symbol": "SHC",
            "icon": "https://static.crypto.com/token/icons/school-hack-coin/color_icon.png"
        },
        {
            "name": "FC Barcelona Fan Token",
            "symbol": "BAR",
            "icon": "https://static.crypto.com/token/icons/fc-barcelona-fan-token/color_icon.png"
        },
        {
            "name": "Shuffle",
            "symbol": "SHFL",
            "icon": "https://static.crypto.com/token/icons/shuffle/color_icon.png"
        },
        {
            "name": "Solend",
            "symbol": "SLND",
            "icon": "https://static.crypto.com/token/icons/solend/color_icon.png"
        },
        {
            "name": "AXEL",
            "symbol": "AXEL",
            "icon": "https://static.crypto.com/token/icons/axel/color_icon.png"
        },
        {
            "name": "Alkimi",
            "symbol": "$ADS",
            "icon": "https://static.crypto.com/token/icons/alkimi/color_icon.png"
        },
        {
            "name": "PAID Network",
            "symbol": "PAID",
            "icon": "https://static.crypto.com/token/icons/paid-network/color_icon.png"
        },
        {
            "name": "Poollotto.finance",
            "symbol": "PLT",
            "icon": "https://static.crypto.com/token/icons/poollotto-finance/color_icon.png"
        },
        {
            "name": "XT.com Token",
            "symbol": "XT",
            "icon": "https://static.crypto.com/token/icons/xtcom-token/color_icon.png"
        },
        {
            "name": "Book.io",
            "symbol": "BOOK",
            "icon": "https://static.crypto.com/token/icons/book-io/color_icon.png"
        },
        {
            "name": "Haedal Staked SUI",
            "symbol": "HASUI",
            "icon": "https://static.crypto.com/token/icons/haedal-staked-sui/color_icon.png"
        },
        {
            "name": "NuNet",
            "symbol": "NTX",
            "icon": "https://static.crypto.com/token/icons/nunet/color_icon.png"
        },
        {
            "name": "PIVX",
            "symbol": "PIVX",
            "icon": "https://static.crypto.com/token/icons/pivx/color_icon.png"
        },
        {
            "name": "CargoX",
            "symbol": "CXO",
            "icon": "https://static.crypto.com/token/icons/cargox/color_icon.png"
        },
        {
            "name": "Frax Price Index Share",
            "symbol": "FPIS",
            "icon": "https://static.crypto.com/token/icons/frax-price-index-share/color_icon.png"
        },
        {
            "name": "Kleros",
            "symbol": "PNK",
            "icon": "https://static.crypto.com/token/icons/kleros/color_icon.png"
        },
        {
            "name": "Adverb",
            "symbol": "ADVB",
            "icon": "https://static.crypto.com/token/icons/crabcoin/color_icon.png"
        },
        {
            "name": "Gifto",
            "symbol": "GTO",
            "icon": "https://static.crypto.com/token/icons/gifto/color_icon.png"
        },
        {
            "name": "ALTAVA",
            "symbol": "TAVA",
            "icon": "https://static.crypto.com/token/icons/altava/color_icon.png"
        },
        {
            "name": "Ambrosus",
            "symbol": "AMB",
            "icon": "https://static.crypto.com/token/icons/amber/color_icon.png"
        },
        {
            "name": "renBTC",
            "symbol": "RENBTC",
            "icon": "https://static.crypto.com/token/icons/renbtc/color_icon.png"
        },
        {
            "name": "ApolloX",
            "symbol": "APX",
            "icon": "https://static.crypto.com/token/icons/apollox/color_icon.png"
        },
        {
            "name": "ELYSIA",
            "symbol": "EL",
            "icon": "https://static.crypto.com/token/icons/elysia/color_icon.png"
        },
        {
            "name": "Alpha Quark Token",
            "symbol": "AQT",
            "icon": "https://static.crypto.com/token/icons/alpha-quark-token/color_icon.png"
        },
        {
            "name": "ONBUFF",
            "symbol": "ONIT",
            "icon": "https://static.crypto.com/token/icons/onbuff/color_icon.png"
        }
    
]

export default _.uniqBy(ret, 'symbol')
