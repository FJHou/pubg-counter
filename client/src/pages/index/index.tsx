import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';
import { AtInputNumber, AtCard } from 'taro-ui';

// import Login from '../../components/login/index';

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  constructor() {
    super();
    this.state = {
      value: 1,
      members: [
        {
          name: '老鹏哥',
          value: 0,
        },
        {
          name: '大飞',
          value: 0,
        },
        {
          name: '老豆子',
          value: 0,
        },
        {
          name: '小猴',
          value: 0,
        },
      ],
    };
  }

  handleChange(value: number) {
    this.setState({
      value,
    });
  }

  memberCounterChange(name: string, value: number) {
    const members = this.state.members.map((item) => {
      if (item.name === name) {
        item.value = value;
      }
      return item;
    });
    this.setState({
      members,
    });
  }

  componentWillMount() {}

  componentDidMount() {
    Taro.cloud
      .callFunction({
        name: 'members',
        data: {},
      })
      .then((res) => {
        console.log(res);
      });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        {/* <Login /> */}
        <AtCard title='概览'>
          <View className='cell'>
            <Text>人头价值：</Text>
            <AtInputNumber
              min={0.5}
              max={10}
              step={0.5}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        </AtCard>

        <AtCard title='队员'>
          {this.state.members.map((member) => {
            return (
              <View className='cell'>
                <Text>{member.name}</Text>
                <AtInputNumber
                  value={member.value}
                  onChange={(value: number) => {
                    this.memberCounterChange(member.name, value);
                  }}
                ></AtInputNumber>
              </View>
            );
          })}
        </AtCard>
      </View>
    );
  }
}
