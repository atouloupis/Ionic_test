import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonActionSheet, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { heart, trash, close, caretForwardCircle, share, add } from 'ionicons/icons';
import HomePage from '../components/HomePage';
import './Tab3.css';
import  firebase from '../Firebase';


const Tab3: React.FC = () => {

  const [datenow] = useState(
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date())
  )
  const [cases, setCases] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [recov, setRecov] = useState(0)
  useEffect(() => {
// Load Firebase collection
  const dbref = firebase.database().ref() 
   const loadData = () => {
    // Extract Firebase collection to array
    dbref.on('value', resp => {
      let data: any[] = snapshotToArray(resp)
      let caseCount = 10
      let deathCount = 0
      let recovCount = 0
      console.log(data);
      data.forEach((doc) => {
        caseCount = caseCount + doc.cases
        deathCount = deathCount + doc.deaths
        recovCount = recovCount + doc.recovered
      })
      setCases(caseCount)
      setDeaths(deathCount)
      setRecov(recovCount)
    });
  }
  loadData();
}, [])

  const snapshotToArray = (snapshot: any) => {
    const returnArr: any[] = []
  
    snapshot.forEach((childSnapshot: any) => {
        const item = childSnapshot.val()
        item.key = childSnapshot.key
        returnArr.push(item)
    });
  
    return returnArr;
  }
  

  const [showActionSheet, setShowActionSheet] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3 title</IonTitle>
          <IonButton slot="end">
            <IonButton routerLink="/input">
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonList>
          <IonItem routerLink="/dashboard/users/1">
            <IonLabel>User 1</IonLabel>
          </IonItem>
          <IonItem routerLink="/dashboard/users/2">
            <IonLabel>User 2</IonLabel>
          </IonItem>
        </IonList>
        <IonButton onClick={() => setShowActionSheet(true)} expand="block">
        Show Action Sheet 
        </IonButton>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass='my-custom-class'
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              console.log('Delete clicked');
            }
          }, {
            text: 'Share',
            icon: share,
            handler: () => {
              console.log('Share clicked');
           }
          }, {
            text: 'Play (open modal)',
            icon: caretForwardCircle,
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Favorite',
            icon: heart,
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked');
            }
          }]}
        >
        </IonActionSheet>
        <HomePage name="HomePage" />
        <IonCard color="light">
          <IonCardHeader>
            <IonCardTitle>Latest Situation per {datenow}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-sm>
                  Confirmed Cases: <strong>{cases}</strong>
                </IonCol>
                <IonCol size="12" size-sm>
                  Confirmed Deat: <strong>{deaths}</strong>
                </IonCol>
                <IonCol size="12" size-sm>
                  Confirmed Recovered: <strong>{recov}</strong>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
