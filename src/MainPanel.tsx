/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');
import * as firebase from 'firebase';

// change these
const API_KEY = '';
const AUTH_DOMAIN = '';
const DATABASE_URL = '';
const STORAGE_BUCKET = '';
const PROJECT_ID = '';
const MESSAGING_SENDER_ID = '';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

interface MainPanelProps {
    onPressNavigate: () => void;
}

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    instructions: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#aaa',
        marginBottom: 16
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
};

class MainPanel extends RX.Component<MainPanelProps, null> {
    private _translationValue: RX.Animated.Value;
    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;
    someList: firebase.database.Reference;
    state: any;

    constructor() {
        super();

        this.state = {
            username: 'Nik',
            email: 'nikolas.leblanc@gmail.com',
            profile_picture: 'abc'
        };

        this._translationValue = new RX.Animated.Value(-100);
        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateY: this._translationValue
                }
            ]
        });

        this.someList = firebaseApp.database().ref();

        console.log(this.someList);

        this.someList.on('value', (snap) => {
            console.log(snap);
        });

        const listRef = firebase.database().ref('users/1');
        listRef.on('value', (snapshot) => {
            this.setState(snapshot.val());
        });
    }

    componentDidMount() {
        let animation = RX.Animated.timing(this._translationValue, {
              toValue: 0,
              easing: RX.Animated.Easing.OutBack(),
              duration: 500
            }
        );

        animation.start();
    }

    updateDate() {
        firebase.database().ref('users/1').set({
            username: 'nik',
            email: 'asdsa',
            profile_picture : Date.now().toString()
        });
    }

    render() {
        return (
            <RX.ScrollView style={ styles.scroll }>
                <RX.View style={ styles.container }>
                    <RX.Animated.Text style={ [styles.helloWorld, this._animatedStyle] }>
                        { this.state.username }
                    </RX.Animated.Text>
                    <RX.Text style={ styles.welcome }>
                        { this.state.email }
                    </RX.Text>
                    <RX.Text style={ styles.welcome }>
                        { this.state.profile_picture }
                    </RX.Text>
                    <RX.Link style={ styles.docLink } url={ 'https://microsoft.github.io/reactxp/docs' }>
                        View ReactXP documentation
                    </RX.Link>
                    <RX.Button style={ styles.roundButton } onPress={ this.updateDate }>
                        <RX.Text style={ styles.buttonText }>
                            Yeah!
                        </RX.Text>
                    </RX.Button>
                    <RX.Button style={ styles.roundButton } onPress={ this._onPressNavigate }>
                        <RX.Text style={ styles.buttonText }>
                            See More Examples
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.ScrollView>
        );
    }

    private _onPressNavigate = () => {
        this.props.onPressNavigate();
    }
}

export = MainPanel;
