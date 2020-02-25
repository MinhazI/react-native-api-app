import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Provider as PaperProvider, Appbar, ActivityIndicator, Colors, List, Card, DefaultTheme, Snackbar } from 'react-native-paper'

//Importing styles from the 'assets' folder that resides in the 'app' folder
import styles from './app/assets/stylesheets/style';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    //Setting the states
    this.state = {
      dataLoaded: false,
      dataSource: null,
      expanded: true,
      errorAPI: false,
      snackbarVisibility: true
    }

  }


  componentDidMount() {
    return fetch('https://api.myjson.com/bins/w25qo')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataLoaded: true,
          dataSource: responseJson,
        })
      })

      .catch((error) => {
        this.setState({
          errorAPI: true,
          dataLoaded: false
        })
      })
  };

  //Handling the users touch in the expandable list
  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    //Defining the app's theme
    const theme = {
      ...DefaultTheme,
      roundness: 5,
      colors: {
        ...DefaultTheme.colors,
        primary: '#12429C',
      },
    };

    if (this.state.errorAPI) {
      return (

        //Error handle if the API URL is incorrect...
        <View style={styles.containerForActivityIndicator}>
          <ActivityIndicator animating={true} size={"large"} color={Colors.blueA700} />
          <Snackbar
            visible={this.state.snackbarVisibility}
            onDismiss={() => this.setState({ snackbarVisibility: false })}
            duration={10000}
          >
            There is an error in connecting to the API.
        </Snackbar>
        </View>
      )
    }

    //If the data hasn't loaded to show the activity indicator to tell the user that it's being loaded
    if (!this.state.dataLoaded) {
      return (
        <View style={styles.containerForActivityIndicator}>
          <ActivityIndicator animating={true} size={"large"} color={Colors.blueA700} />
        </View>
      )

    } else {

      //Getting the values via the API and mapping it
      let products = this.state.dataSource.map((val, key) => {

        return <View key={key}>
          <Card>
            <Card.Cover source={{ uri: val["product-image-url"] }} />
          </Card>
          <List.Accordion
            title={val["product-name"]}
            left={props => <List.Icon {...props} icon="hanger" />}
          >
            <List.Item
              title="Description"
              description={val["product-description"]} />
          </List.Accordion>
        </View>
      });

      return (
        <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>

            <Appbar style={styles.appbar}>
              <Text style={styles.appbarText}>Task for Motion Miracles</Text>
            </Appbar>
            <ScrollView style={styles.expandableList}>
              <List.Section>
                {products}
              </List.Section>
            </ScrollView>
          </SafeAreaView>
        </PaperProvider>
      );
    }
  }
}