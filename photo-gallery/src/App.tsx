import React,{useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, triangle, images, personCircleOutline, ellipsisHorizontal, ellipsisVertical, personCircle, notificationsCircle, search, star, glasses, cloud } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import Input from './pages/Input';

import Login from './pages/Login';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Toast
} from '@capacitor/core';

const { PushNotifications } = Plugins;


const App: React.FC<{ initial?: number }>= ({ initial = 0 }) => {
  const [NotifState, setNotifState] = useState( {notifications:[{}],
    toast:false});
  console.log('Initializing Notification');

// Register with Apple / Google to receive push via APNS/FCM
PushNotifications.register();
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
    let notif = NotifState.notifications;
    notif.push({ id: notification.id, title: notification.title, body: notification.body })
    console.log(notif)
    setNotifState({
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
    let notif = NotifState.notifications;
    notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
    setNotifState({
      notifications: notif,
      toast:true
    })
  }
);
  return (
  <IonApp>
    <IonHeader>
    <IonToolbar>
      <IonButtons slot="secondary">
        <IonButton routerLink="/login">
          <IonIcon slot="icon-only" icon={personCircle} />
        </IonButton>
      </IonButtons>
      <IonTitle>WAF</IonTitle>
      <IonButtons slot="primary">
        <IonButton color="secondary">
          <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
      </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} exact={true} />
          <Route path="/tab4" component={Tab4} exact={true} />
          <Route path="/tab5" component={Tab5} exact={true} />
          <Route path="/input" component={Input} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab2">
            <IonIcon icon={images} />
            <IonLabel>Photos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab5">
            <IonIcon icon={notificationsCircle}/>
            <IonLabel>Notif</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={cloud} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={glasses} />
            <IonLabel>Tab 4</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    {NotifState.notifications.map((notif: any) =>
        <IonToast
        isOpen={notif.toast}
        onDidDismiss={() => setNotifState({toast:false, notifications:notif})}
        header={notif.title}
        message={notif.body}
        color= 'dark'
        position="top"
        duration={2000}
      />
        )}
  </IonApp>
  );
};
          

export default App;
