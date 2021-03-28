import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonList, IonItem, IonLabel, IonListHeader, IonText, IonToast } from '@ionic/react';
import React from 'react';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Toast
} from '@capacitor/core';

const { PushNotifications } = Plugins;
const INITIAL_STATE = {
  notifications: [],
  toast:false
};
export class Home extends React.Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    // defineCustomElements(window);
  }
  push() {
    console.log('Initializing Notification');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.requestPermission().then((permission) => {
        if (permission.granted) {
    PushNotifications.register();
        }});
    // On succcess, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('Push registration success, token: ' + token.value)
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error))
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification))
        // alert('Push received: ' + JSON.stringify(notification));
        let notif = this.state.notifications;
        notif.push({ id: notification.id, title: notification.title, body: notification.body })
        this.setState({
          notifications: notif,
          toast:true
        })
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification))
        // alert('Push action performed: ' + JSON.stringify(notification));
        let notif = this.state.notifications;
        notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
        this.setState({
          notifications: notif
        })
      }
    );
  }
  render() {
    const { notifications } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="medium">
            <IonTitle>Ionic React Push Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButton expand="full" onClick={() => this.push()}>Register for Push</IonButton>
          </IonToolbar>
        </IonFooter>
        {notifications.map((notif: any) =>
        <IonToast
        isOpen={this.state.toast}
        onDidDismiss={() => this.setState({toast:false})}
        header={notif.title}
        message={notif.body}
        color= 'dark'
        position="top"
        duration={2000}
      />
        )}
      </IonPage >
      
    );
  };
}
export default Home;