import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';
import { AtInputNumber, AtCard, AtButton } from 'taro-ui';

interface IMember {
  name: string;
  value: number;
}
interface IndexState {
  value: number;
  members: IMember[];
}
export default class Index extends Component<{}, IndexState> {
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
          name: '鹏哥',
          value: 0,
        },
        {
          name: '大飞',
          value: 0,
        },
        {
          name: '豆子',
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

  payInfo(me: IMember) {
    const { name: myName, value: myValue } = me;
    const { members, value: ratio } = this.state;
    return members
      .filter((member) => member.name !== myName)
      .map((member) => {
        const { name, value } = member;
        const diff = value - myValue;
        const price = diff <= 0 ? 0 : diff * ratio;
        return (
          <View key={name}>
            {name}
            <Text className='award'> {price} </Text>元
          </View>
        );
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
        <AtCard title='概览' className='card'>
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

        <AtCard title='统计' className='card'>
          {this.state.members.map((member) => {
            return (
              <View className='cell' key={member.name}>
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

        <AtCard title='成绩' className='card'>
          {this.state.members.map((member) => {
            return (
              <View className='cell' key={member.name}>
                <Text>{member.name}需付：</Text>

                {this.payInfo(member)}
              </View>
            );
          })}
        </AtCard>
      </View>
    );
  }
}
