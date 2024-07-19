// 定义一个二维数组，每个元素是一个包含姓名和分数的数组
var arr = [
  {
    referrer_address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    no: 2
  },
  {
    referrer_address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    no: 1
  },
  {
    referrer_address: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    no: 1
  }
];

// 定义一个比较函数，按照分数的降序排列
function compare(a, b) {
  return b[1] - a[1];
}

// 使用sort()方法对数组进行排序
//arr.sort(compare);

// 打印排序后的数组
console.log(arr);

// 假设你想找到Bob的排名，你可以遍历数组，找到Bob的位置，然后加一得到排名
var name = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
var rank = -1;
var prevScore = -1; // 记录上一个人的分数
var prevRank = 0; // 记录上一个人的排名
for (var i = 0; i < arr.length; i++) {
  var currScore = arr[i].no; // 当前人的分数
  var currRank = prevRank + 1; // 当前人的排名，默认为上一个人的排名加一
  if (currScore == prevScore) {
    // 如果当前人的分数和上一个人的分数相同，那么当前人的排名和上一个人的排名相同
    currRank = prevRank;
  }
  if (arr[i].referrer_address == name) {
    // 如果找到了目标人，记录他的排名，跳出循环
    rank = currRank;
    break;
  }
  // 更新上一个人的分数和排名
  prevScore = currScore;
  prevRank = currRank;
}

// 打印Bob的排名，如果没有找到，打印提示信息
if (rank != -1) {
  console.log(name + "的排名是" + rank);
} else {
  console.log("没有找到" + name);
}