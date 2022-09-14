import './style.css';
import React, { useState , useEffect ,useRef } from 'react';
import pin from "./Pin.png";
import GoogleMapReact from 'google-map-react';

const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)"
};


function App() {

   let locationObj = {
    center : {
      lat : 59.1978,
      lng : 17.6202
    },
    zoom : 5,
    preLocObj : []
  };

   const [LocObj,setLocObj] = useState(locationObj);

   const setNewLocation =() => {
     
      let lat = (Math.random() * (59.1990 - 59.1970 + 1) + 59.1970).toFixed(4) * 1;
      let long = (Math.random() * (17.6220 - 17.6200 + 1) + 17.6200).toFixed(4) * 1;
      setTempObjLoc(lat, long);
    }

  //
  const setTempObjLoc =(lat, long)=> {
      let TempLocObj = {...LocObj};
      TempLocObj.preLocObj.push({ lat : LocObj.center.lat , lng : LocObj.center.lng});
      TempLocObj.center.lat = lat;
      TempLocObj.center.lng = long;
      setLocObj(TempLocObj);
  }

  const mounted = useRef();

  //Called Component rendering
  useEffect(() => {
    
    if (!mounted.current) {
      getLocation();
      mounted.current = true;
    }      
});

 //Function to get current location - onButtonClick
 //Enable browser location access
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Navigator is not available")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {

        locationObj.center.lat = position.coords.latitude;
        locationObj.center.lng =  position.coords.longitude;
        setTempObjLoc(position.coords.latitude, position.coords.longitude);
      }, () => {
        alert('Unable to retrieve your location');
      });
    }
  }

 
  //Output
  return (

    <div className="Container"  >
      <h1 > My Project</h1>
        <table>
          <tr>
            <td>
              <div className = "Container1">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}  //Key can be added
                    defaultCenter={LocObj.center}
                    defaultZoom={LocObj.zoom}
                  >
                    <button type="button" className="btn1" onClick={setNewLocation}>Teleport me to somewhere random</button>
                    <button type="button" className="btn2" onClick={getLocation}>Bring me back home</button>
                    <img  lat={LocObj.center.lat} lng={LocObj.center.lng} style={markerStyle} src={pin} alt="pin" />
                  </GoogleMapReact>
              </div>
            </td>
            </tr>
            <tr>
              <td>   
                  <div className="Container2">
                  <h3>Latitude : {LocObj.center.lat},Longitude : {LocObj.center.lng} </h3>
                  <h2>  Vistied Places </h2>
                    <ol className='olcss'>
                      {LocObj.preLocObj.map((loc) => (
                        <li >Latitude : {loc.lat},Longitude : {loc.lng} </li>
                      ))}
                    </ol>
                </div>
              </td>
            </tr>
          </table>
    </div>
  );
}

export default App;
