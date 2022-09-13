import React, {useState} from 'react';
import './App.scss';

function App() {
    function handlerClick (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.classList.toggle('active');
        
        let nextEl = e.currentTarget?.nextElementSibling as HTMLElement | null
        if (e.currentTarget.dataset.pos == 'third') {
            nextEl = document.querySelector<HTMLDivElement>(`[data-pos='first']`);
        }
        if (nextEl?.classList.contains('active') &&  e.currentTarget.classList.contains('active')) {
            document.querySelector<HTMLDivElement>(`[data-adjacent='${e.currentTarget.dataset.pos}']`)?.classList.add('active')
        }
        else {
            document.querySelector<HTMLDivElement>(`[data-adjacent='${e.currentTarget.dataset.pos}']`)?.classList.remove('active')
        }
        
        let prevEl = e.currentTarget?.previousElementSibling as HTMLElement | null;
        if (e.currentTarget.dataset.pos == 'first') {
            prevEl = document.querySelector<HTMLDivElement>(`[data-pos='third']`);
        }
        if (prevEl?.classList.contains('active') &&  e.currentTarget.classList.contains('active')) {
            document.querySelector<HTMLDivElement>(`[data-adjacent='${prevEl?.dataset.pos}']`)?.classList.add('active')
        }
        else {
            document.querySelector<HTMLDivElement>(`[data-adjacent='${prevEl?.dataset.pos}']`)?.classList.remove('active')
        }
        
        let circles = document.querySelectorAll<HTMLDivElement>('[data-pos]');
        let activeCircles = true;

        Array.from(circles).forEach((el) => {
            if (!el.classList.contains('active'))
                return activeCircles = false;
        })

       
        if (activeCircles) {
            document.getElementsByClassName('innerw')[0]?.classList.add('active')
        } else {
            document.getElementsByClassName('innerw')[0]?.classList.remove('active')
        }
    }
    
    function handlerClickAdj(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let adjacent = document.querySelectorAll<HTMLDivElement>('[data-adjacent]');
        let first = document.querySelector<HTMLDivElement>(`[data-pos='${e.currentTarget.dataset.adjacent}']`)
        let second;
        if (e.currentTarget.dataset.adjacent == 'third') {
            second = document.querySelector<HTMLDivElement>(`[data-pos='first']`);
        } else {
            second  = first?.nextElementSibling as HTMLElement | null;
        }
        if (first?.classList.contains('active') && second?.classList.contains('active')) {
            first?.classList.remove('active');
            second?.classList.remove('active');
            e.currentTarget.classList.remove('active');
            Array.from(adjacent).forEach((el) => {
                el.classList.remove('active')
            })
        } else {
            first?.classList.add('active');
            second?.classList.add('active');
            e.currentTarget.classList.add('active');
        }

        let circles = document.querySelectorAll<HTMLDivElement>('[data-pos]');
        let activeCircles = true;

        Array.from(circles).forEach((el) => {
            if (!el.classList.contains('active'))
                return activeCircles = false;
        })


        if (activeCircles) {
            document.getElementsByClassName('innerw')[0]?.classList.add('active')
            Array.from(adjacent).forEach((el) => {
                el.classList.add('active')
            })
        } else {
            document.getElementsByClassName('innerw')[0]?.classList.remove('active')
        }
        
    }
    
    function handlerClickCenter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let circles = document.querySelectorAll<HTMLDivElement>('[data-pos]');
        let adjacent = document.querySelectorAll<HTMLDivElement>('[data-adjacent]');
        let activeCircles = true;

        Array.from(circles).forEach((el) => {
            if (!el.classList.contains('active'))
                return activeCircles = false;
        })
        
        if (activeCircles) {
            Array.from(circles).forEach((el) => {
                el.classList.remove('active')
            })
            Array.from(adjacent).forEach((el) => {
                el.classList.remove('active')
            })
            e.currentTarget.classList.remove('active');
        } else {
            Array.from(circles).forEach((el) => {
                el.classList.add('active')
            })
            Array.from(adjacent).forEach((el) => {
                el.classList.add('active')
            })
            e.currentTarget.classList.add('active');
        }
    }
    
    
    return (
        <div className="app">
            
            <div id="outer1" className="outer" onClick={handlerClick} data-pos="first">
                Test
            </div>
            <div id="outer2" className="outer" onClick={handlerClick} data-pos="second">
                Question
            </div>
            <div id="outer3" className="outer" onClick={handlerClick} data-pos="third">
                React
            </div>
            <div id="midaw1" className="mwrap" data-adjacent="first"  onClick={handlerClickAdj}>
                <div id="midaw2" className="mwrap2">
                    <div id="mida" className="content mid">
                        <p>Test&Question</p>
                    </div>
                </div>
            </div  >
            <div id="midbw1" className="mwrap" data-adjacent="second"  onClick={handlerClickAdj}>
                <div id="midbw2" className="mwrap2">
                    <div id="midb" className="content mid">
                        <p>Question & React</p>
                    </div>
                </div>
            </div>
            <div id="midcw1" className="mwrap" data-adjacent="third"  onClick={handlerClickAdj}>
                <div id="midcw2" className="mwrap2">
                    <div id="midc" className="content mid">
                        <p>Test & React</p>
                    </div>
                </div>
            </div>
            <div className="innerw" onClick={handlerClickCenter}>
                <div className="innerw2">
                    <div className="innerw3">
                        <div className="inner">
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default App;
