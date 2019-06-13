import React, { Component } from 'react';
import Card from 'card-vibes';

class HospitalChoice extends Component {
      render() {
            return (
                  <div className="App" >
                        <div className="box-header with-border">
                              <Card style={{ width: '100%', padding: '20px' }}>
                                    <h3 className="box-title">Hey, Hospital ! Select Your Choice!!</h3>
                                    <br />
                              </Card>
                              <button class="FormField__Button mr-20" >Create Doctor</button>
                              <button class="FormField__Button mr-20" >Create Hospital</button>
                        </div>
                  </div>
            );
      }
}
export default HospitalChoice;