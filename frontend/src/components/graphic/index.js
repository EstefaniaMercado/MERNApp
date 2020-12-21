import React, { useState, useEffect }  from 'react'
import { Chart } from 'react-charts'
import {
  Col,
  Row,
} from 'reactstrap';
import moment from 'moment';
import 'moment/locale/es';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

export const Graphic = () => {
  //Sockets
  const [response, setResponse] = useState("");
  const [month] = useState(moment().locale('es').format("MMMM"));

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });


    return () => socket.disconnect();
  }, []);

  const data = React.useMemo(
    () => [
      {
        label: 'Usuarios de este mes',
        data: response
      },
    ],
    [response]
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const lineChart = (
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  )


  return(
    <div className="container mt-5">
      <Row>
        <Col md="12">
          <h3 className="mb-3">Usuarios registrados en el mes de {month}</h3>
            {response ? <div>{lineChart}</div> : <p>Cargando...</p>}
        </Col>
      </Row>
    </div>
  )
}
