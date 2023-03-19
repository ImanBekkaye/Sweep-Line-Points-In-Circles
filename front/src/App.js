import './App.css';
import Canvas from "./Components/Canvas";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Spinner} from "react-bootstrap";


function App() {
    const [n, setN] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
    }, []);

    function handleInputChange(event) {
        setN(event.target.value);
    }

    function drawCircle(x, y, r, color='white', lineWidth=1){
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, r, 0, 2 * Math.PI);
        contextRef.current.strokeStyle = color;
        contextRef.current.stroke();
    }

    function drawPoint(x, y, color='blue'){
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, 3, 0, 2 * Math.PI);
        contextRef.current.strokeStyle = color;
        contextRef.current.stroke();
        contextRef.current.fillStyle = color;
        contextRef.current.fill();
    }

    function clearCanvas() {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    function getData(){
        setIsLoading(true); // set isLoading to true before making the API call

        const obj = { n: parseInt(n) };

        axios.post('/points-in-circles/', {...obj})
            .then((res) => {
                 console.log('Done!');

                 setN('');
                 setIsLoading(false);
                 clearCanvas();

                 // draw
                 const circles = res.data.circles;
                 const points = res.data.points;
                 const inside_points = res.data.inside_points;
                 circles.forEach(circle => {
                     drawCircle(circle[0], circle[1], circle[2], 'grey', 0.5);
                 });
                 points.forEach(point => {
                     drawPoint(point[0], point[1]);
                 });
                 inside_points.forEach(point => {
                     drawPoint(point[0], point[1], 'red');
                 });
            }).catch((err) => {
                console.log(err);
            })
    }

  return (
        <div className="App">
            <div className="App-header">

                <h4 className="heading">Points-In-Circles Testing: Sweep Line Approach with <i>O(n log n)</i> Time Complexity</h4>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="number"
                            placeholder="Enter n"
                            onChange={handleInputChange}
                            value={n}
                            disabled={isLoading}
                        />
                        <Form.Text className="text-muted">
                            Algorithm will randomly generate <i>n</i> points and <i>n</i> circles.
                        </Form.Text>
                    </Form.Group>
                    {isLoading ?
                        <Spinner
                            animation="border"
                            variant="light"
                        />
                        :
                        <Button
                            onClick={(e)=>{
                                e.preventDefault();
                                getData();
                            }}
                            type={"submit"}
                            disabled={!n}>
                            Run
                        </Button>
                    }
                </Form>

                <Canvas
                    width={1000}
                    height={550}
                    canvasRef={canvasRef}
                />
                <p
                    className="secondary-heading"
                    onClick={clearCanvas}>
                    Clear board
                </p>

            </div>
        </div>
  );
}

export default App;
