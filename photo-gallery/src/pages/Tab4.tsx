import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/react';
import './Tab3.css';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { AdMob, Toast, PushNotifications  } = Plugins;

class Tab4 extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    // Test app ID
    //AdMob.initialize('ca-app-pub-3940256099942544~3347511713');
    //Prod app ID
    AdMob.initialize('ca-app-pub-6646356301827477~3935680277');
  }
  // This Banner AD have bottom margin to avoid TabBar Overlaping for TabBar 
  showTabBarBanner() {
    const options: AdOptions = {
      //Test banner ID
      // adId: 'ca-app-pub-3940256099942544/6300978111',
      // Prod banner ID
      adId: 'ca-app-pub-6646356301827477/4473477140',
      adSize: AdSize.BANNER,
      position: AdPosition.BOTTOM_CENTER,
      hasTabBar: true,  // make it true if you have TabBar Layout.
      tabBarHeight: 56  // you can assign custom margin in pixel default is 56
    };

    // Show Banner Ad
    AdMob.showBanner(options)
      .then(
        async (value: any) => {
          console.log(value);  // true
          await Toast.show({
            text: 'Showing Banner AD.'
          })
        },
        (error: any) => {
          console.error(error); // show error
        }
      );
    // Subscibe Banner Event Listener
    AdMob.addListener('onAdLoaded', async () => {
      console.log('Showing TabBar Banner AD.');
    });
    AdMob.addListener('onAdFailedToLoad', async(info: any) => {
      console.log('onAdFailedToLoad');
      console.log("onAdFailedToLoad",Object.values(info).toString());
      console.log("onAdFailedToLoad",Object.keys(info));
      console.log("onAdFailedToLoad",Object.entries(info));
    });
  }
  hideBanner() {
    AdMob.hideBanner().then(
      async (value: any) => {
        await Toast.show({
          text: 'Banner AD Hidden'
        })
        console.log(value);  // true
      },
      (error: any) => {
        console.error(error); // show error
      }
    );
  }
  resumeBanner() {
    // Resume the banner, show it after hide
    AdMob.resumeBanner().then(
      (value: any) => {
        console.log(value);  // true
      },
      (error: any) => {
        console.error(error); // show error
      }
    );
  }
  removeBanner() {
    // Destroy the banner, remove it from screen.
    AdMob.removeBanner().then(
      (value: any) => {
        console.log(value);  // true
      },
      (error: any) => {
        console.error(error); // show error
      }
    );
  }
  
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>Banner Ads</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Banner Ads</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
            <IonCardContent>Banner Ad is usually shown by default on bottom of the page. You can select the position as you like.
      You can even display multiple banner ads per page.</IonCardContent>
          </IonCard>
          <IonButton expand="block" className="ion-margin-bottom" color="success" onClick={this.showTabBarBanner}>Show Banner Ad</IonButton>
          <IonButton expand="block" className="ion-margin-bottom" color="medium" onClick={this.hideBanner}>Hide Banner Ad</IonButton>
          <IonButton expand="block" className="ion-margin-bottom" color="success" onClick={this.resumeBanner}>Resume Banner Ad</IonButton>
          <IonButton expand="block" className="ion-margin-bottom" color="danger" onClick={this.removeBanner}>Remove Banner Ad</IonButton>
        </IonContent>
      </IonPage>
    );
  };
}

export default Tab4;
