import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonToast } from '@ionic/react';
import React, { Component} from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
const INITIAL_STATE = {
loggedin:false
};

class Login extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.state = {
      loggedin:true
      };
  }
  async signIn(): Promise<void> {
    const { history } = this.props;
    const result = await Plugins.GoogleAuth.signIn();
    console.log('result', result);
    if (result) {
      //mise à jour props
      history.push({
        state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email },
        pathname: '/tab1',
        loggedin:true
      });
    }
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic React App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                Google Login in Capacitor app
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-center">
                By Enappd Team
              </IonText>
            </IonCol>
          </IonRow>

          <IonButton className="login-button" onClick={() => this.signIn()} expand="block" fill="solid" color="danger">
            Login with Google
        </IonButton>
        </IonContent>
        <IonToast
        isOpen={this.state.loggedin}
        message="this message"
        color= 'dark'
        position="top"
        duration={2000}
      />
      </IonPage>
    )
  }
}
export default Login;