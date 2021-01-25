import React from 'react';
import { withIonLifeCycle } from '@ionic/react';

class HomePage extends React.Component {

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired')
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired')
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired')
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired')
  }

  render() {
    return (
      <br></br>
    );
  }
}

export default withIonLifeCycle(HomePage);