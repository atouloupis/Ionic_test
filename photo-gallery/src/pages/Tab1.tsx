import React from 'react';
import { IonButton, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import {RouteComponentProps } from 'react-router';

const INITIAL_STATE = {
  loggedIn: true,
  user: {
  }
};

class Tab1 extends React.Component<RouteComponentProps> {
  state: any = {};
  props: any = {};
  match: any;
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getUserInfo();
  }
  
  async signOut(): Promise<void> {
    const { history } = this.props;
    console.log("history")
    console.log(history)
    await Plugins.GoogleAuth.signOut();
    history.goBack();
  }

  async getUserInfo() {
    const selfProps = this.props;
    console.log(selfProps)
    if (selfProps.history.location.state !== undefined)
    {
      this.setState({
        loggedIn:false,
        user: {
          name: selfProps.history.location.state.name,
          image: selfProps.history.location.state.image,
          email: selfProps.history.location.state.email
        }
      })
    }
  }

  render() {
  return (
            <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                You are logged in ! {this.state.loggedIn}
              </IonText>
            </IonCol>
          </IonRow>

          {this.state.user.name &&
            <IonItem>
              <IonThumbnail slot="start">
                <img alt='Profile' src={this.state.user.image} />
              </IonThumbnail>
              <IonLabel>
                <h3>{this.state.user.name}</h3>
                <p>{this.state.user.email}</p>
              </IonLabel>
            </IonItem>
          }
          <IonButton className="login-button" onClick={() => this.signOut()} expand="full" fill="solid" color="danger">
            Logout from Google
        </IonButton>
      </IonContent>
      </>
  )}
}

export default Tab1;
