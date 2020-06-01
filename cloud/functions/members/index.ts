const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async () => {
  return {
    members: [
      {
        name: '老鹏哥',
      },
      {
        name: '大飞',
      },
      {
        name: '老豆子',
      },
      {
        name: '小猴',
      },
    ],
  };
};
