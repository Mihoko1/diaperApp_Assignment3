import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import {createSwitchNavigator,createAppContainer,SafeAreaView
} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AppIntroSlider from 'react-native-app-intro-slider';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Timeline from './screens/Timeline';
import Analysis from './screens/Analysis';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Timer from './screens/Timer';
import Bottle from './screens/Bottle';
import Solid from './screens/Solid';

const TimerStack = createMaterialTopTabNavigator(
  {
    Timer: {
      screen: Timer,
    },
    Bottle: {
      screen: Bottle,
    },
    Solid: {
      screen: Solid
    }
  },
  {
    initialRouteName: 'Timer',
  }
);

const TimelineTab = createStackNavigator({
  Timeline: {
    screen: Timeline,
    navigationOptions: {
      headerBackTitle: 'Back',    // Title back button Back when we navigate to Profile from Settings
    },
  },
  Timer: {
    screen: TimerStack,
    navigationOptions: ({ navigation }) => ({         
      title: 'Stop Watch',
    }),
  },
}, {
  headerMode: 'screen',
});



const HomeTab = createBottomTabNavigator(
  {
      Timeline: { screen: TimelineTab},
      Analysis: { screen: Analysis},
      Profile: { screen: Profile}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Timeline') {
          iconName = `ios-home`;
          
        } else if (routeName === 'Profile') {
          iconName = `md-happy`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#d81b60',
      inactiveTintColor: 'gray',
    },
  }
);

const SignedIn = createDrawerNavigator(
  {
      Timeline: { screen: HomeTab }
  },
  {
      contentComponent: (props) => (
          <View style={{ flex: 1 }}>
              <SafeAreaView style={{ flex:1, backgroundColor: '#3a2995' }}>
                  <DrawerItems {...props} />
                  <Button
                      title="Logout"
                      onPress={() => props.navigation.navigate('SignedOut')}
                  />
              </SafeAreaView>
          </View>
      )
  }
);


const SignedOut = createStackNavigator(
  {
      SignUp: { screen: SignUp },
      Login: { screen: Login }
  }
);


const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
      {
          SignedIn: { screen: SignedIn },
          SignedOut: { screen: SignedOut }
      },
      {
          initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
      }
  );
}


const Layout = createAppContainer(createRootNavigator(true));


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //To show the main page of the app
    };
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  static navigationOptions = ()=>({
    title: 'Hi Miho',
    //Sets Header text of Status Bar
    headerStyle: {
      backgroundColor: '#e8c121',
      //Sets Header color
    },
    headerTintColor: '#e8c121',
    //Sets Header text color
    headerTitleStyle: {
      fontWeight: 'bold',
      //Sets Header text style
    },
  });


  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        // <View
        //   style={{
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     padding: 50,
        //   }}>
        //   <Text>
        //     This will be your screen when you click Skip from any slide or Done
        //     button at last
        //   </Text>
        // </View>

        <Layout />
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
});
 
const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
];