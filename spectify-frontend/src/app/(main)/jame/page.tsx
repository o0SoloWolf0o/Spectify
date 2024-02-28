"use client";
import React, { useState, useEffect } from 'react';

const CountdownPage: React.FC = () => {
    const startDate = new Date('2024-02-28T00:00:00');
    const targetDate = new Date(startDate);
    targetDate.setMonth(targetDate.getMonth() + 10);

    const initialCountdownSeconds: number = Math.floor((targetDate.getTime() - new Date().getTime()) / 1000);
    const [countdown, setCountdown] = useState(initialCountdownSeconds);
    const [timerExpired, setTimerExpired] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                const newCountdown = prevCountdown - 1;
                if (newCountdown <= 0) {
                    setTimerExpired(true);
                    clearInterval(timer); // Stop the timer when countdown reaches zero
                }
                return newCountdown;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (timerExpired) {
        return (
            <div style={{ textAlign: 'center', margin: '50px' }}>
                <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Welcome Back to Thailand Jame</h1>
            </div>
        );
    }

    const days = Math.floor(countdown / (24 * 60 * 60));
    const hours = Math.floor((countdown % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((countdown % (60 * 60)) / 60);
    const seconds = countdown % 60;

    return (
        <div style={{ textAlign: 'center', margin: '50px' }}>
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Countdown Timer</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ margin: '0 10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{days}</span>
                    <span style={{ fontSize: '0.8em', color: '#555' }}>days</span>
                </div>
                <div style={{ margin: '0 10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{hours}</span>
                    <span style={{ fontSize: '0.8em', color: '#555' }}>hours</span>
                </div>
                <div style={{ margin: '0 10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{minutes}</span>
                    <span style={{ fontSize: '0.8em', color: '#555' }}>minutes</span>
                </div>
                <div style={{ margin: '0 10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{seconds}</span>
                    <span style={{ fontSize: '0.8em', color: '#555' }}>seconds</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownPage;
