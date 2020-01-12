import { AnyAction } from 'redux';

// actions

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECOND = 'ADD_SECOND';

export interface TimerState {
    isPlaying: boolean;
    elapsedTime: number;
    timeDuration: number;
}

// action creators
const startTimer = (): AnyAction => ({
    type: START_TIMER,
});

const restartTimer = (): AnyAction => ({
    type: RESTART_TIMER,
});

const addSecond = (): AnyAction => ({
    type: ADD_SECOND,
});

// reducer
const TIME_DURATION = 1500;
const intiailState: TimerState = {
    isPlaying: false,
    elapsedTime: 0,
    timeDuration: TIME_DURATION,
};

export const reducer = (state = intiailState, action: AnyAction) => {
    switch (action.type) {
        case START_TIMER:
            return applyStartTimer(state);
        case RESTART_TIMER:
            return applyRestartTimer(state);
        case ADD_SECOND:
            return applyAddSecond(state);
        default:
            return state;
    }
};

// reducer function

const applyStartTimer = (state: TimerState): TimerState => {
    return {
        ...state,
        isPlaying: true,
        elapsedTime: 0,
    };
};

const applyRestartTimer = (state: TimerState): TimerState => {
    return {
        ...state,
        isPlaying: false,
        elapsedTime: 0,
    };
};

const applyAddSecond = (state: TimerState): TimerState => {
    if (state.elapsedTime < TIME_DURATION) {
        return {
            ...state,
            elapsedTime: state.elapsedTime + 1,
        };
    }

    return {
        ...state,
        isPlaying: false,
        elapsedTime: 0,
    };
};

// export action creators
export const actionCreator = {
    startTimer,
    restartTimer,
    addSecond,
};
