import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { camera} from 'ionicons/icons';
import { IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
         IonCol, IonImg } from '@ionic/react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { Redirect } from 'react-router-dom';

interface props
{
history:{location:{loggedin:boolean}};
};

const Tab2: React.FC <props> = ({history}:props) => {
  const { photos , takePhoto } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

}

export default Tab2;
