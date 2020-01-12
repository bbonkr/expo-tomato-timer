import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Button';
import { TimerState, actionCreator } from '../../reducers';

const format = (time: number): string => {
    const minute = Math.floor(time / 60);
    const timeTemp = time - minute * 60;
    const second = timeTemp % 60;
    return `${minute.toString().padStart(2, '0')}:${second
        .toString()
        .padStart(2, '0')}`;
};

export const Timer = () => {
    const dispatch = useDispatch();
    const [timerInterval, setTimerInterval] = useState<number>();
    const { isPlaying, timeDuration, elapsedTime } = useSelector<
        TimerState,
        TimerState
    >(state => state);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                dispatch(actionCreator.addSecond());
            }, 1000);
            setTimerInterval(interval);
        } else {
            clearInterval(timerInterval);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isPlaying]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.upper}>
                <Text style={styles.time}>
                    {format(timeDuration - elapsedTime)}
                </Text>
            </View>
            <View style={styles.lower}>
                {!isPlaying && (
                    <Button
                        icon="play-circle"
                        onPress={() => dispatch(actionCreator.startTimer())}
                    />
                )}
                {isPlaying && (
                    <Button
                        icon="stop-circle"
                        onPress={() => dispatch(actionCreator.restartTimer())}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CE0B24',
    },
    upper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lower: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    time: {
        color: 'white',
        fontSize: 100,
        fontWeight: '100',
    },
});
