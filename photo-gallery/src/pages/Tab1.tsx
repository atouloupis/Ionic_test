import React, { Component }  from 'react';
import { IonButton, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";

const INITIAL_STATE = {
  loggedIn: true,
  user: {}
};

class Tab1 extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    const { history } = this.props;
    await Plugins.GoogleAuth.signOut();
    history.goBack();
  }

  async getUserInfo() {
    this.setState({
      user: {
        name: this.props.location.state.name,
        image: this.props.location.state.image,
        email: this.props.location.state.email
      }
    })
  }

  render() {
  return (
    <IonPage>
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
                You are logged in !
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
    </IonPage>
  );
}
}
export default Tab1;
