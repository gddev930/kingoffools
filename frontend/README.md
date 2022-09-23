# vue-css-many

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



font-optimization

npm install font-spider -g
font-spider ./font.html



struct BoxFactory {
    uint256 id;
    string name;            // 名称
    uint256 limit;          // 可购买总量
    uint256 minted;         // 已卖总量
    uint256[] limits;       // 每种类型可购买总量
    uint256[] minteds;      // 每种类型已卖总量
    uint256 mode;           // 兑奖模式 0 - 套装兑奖 1 - 单个兑奖  
    uint256[] exchange_price; // 如果mode是0，exchange_price只有一个值，如果mode是1，exchange_price的长度跟limits一样（单位wei）
    uint256 price;          // 单个购买价格（单位wei）
    uint256 createdTime;    // 创建时间
    uint256 startTime;      // 生效时间
}

struct BoxView {
    uint256 id;
    uint256 factoryid;
    bool exchanged;         // 是否以兑换标记
    uint256 level;          // 类型，与limits的index相同
    uint256 openTime;       // 开启时间
    address owner;          // 拥有者
}