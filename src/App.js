import React, {useEffect, useState} from 'react'
import './App.css';
import { MapContainer, TileLayer, Polyline,Marker,Popup ,useMapEvents } from 'react-leaflet'


const limeOptions = { color: 'lime' }

function LocationMarker() {
    const [position, setPosition] = useState([51.505, -0.09])
    const map = useMapEvents({
        click() {
            console.log('adsdasdasdasdasdasdasd')
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function LocationP() {
    const [position, setPosition] = useState([51.505, -0.09])
    const polyline = [
        [51.505, -0.09],
        [51.51, -0.12],
    ];
    const map = useMapEvents({
        click() {
            console.log( map.locate())
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            console.log('founded')
        },
    })

    return position === null ? null : (
        <Polyline
            pathOptions={limeOptions}
            positions={polyline}
            click={()=>{console.log('functioooon')}}
        />
    )
}
function App() {
    const [state, setState] = useState();

    const position = [51.505, -0.09];
    const polyline = [
        [51.505, -0.09],
        [51.51, -0.12],
    ];
    let i = 0;
    let res = [];
    const fun  = (arr)=>{

        res =  arr.reduce(function (res, current, index, array) {
            const newArr = () => current.map((el,index)=>{
                if(index === 1){
                   return ([ el[0] + (Math.floor(Math.random(100) * 200) *( 0.00001 * Math.floor(Math.random(100) * 10))), el[1]])
                }
                return el
            })
            return res.concat([newArr(), newArr()]);
        }, []);

        if(i < 2) {
            i = i +1;
             return fun(res)
        };

        return res
    };

     const lines = fun([polyline,polyline]);
    useEffect(()=>{
      const line =   document.querySelectorAll('.polyline_2');
      console.log(line)
        line.forEach(el=>el.onClick = ()=>{
            console.log('asdasdasdasdasd')
        })
    },[])
    return (
    <div className="App">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            {lines.map((el,index)=>
                <Polyline
                pathOptions={limeOptions}
                positions={el} key={`${index}_${el[0]+ el[1]}`}
                id={'s'}
                onClick={()=>{
                    console.log('adsasdas')
                }}
                className="polyline_2"

                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Polyline>)}
        </MapContainer>
    </div>
  );
}

export default App;
