import React from 'react'
import { useNProgress } from '@tanem/react-nprogress';
import Container from './Container'
import Bar from './Bar'

const Progress = ({ animationDuration, incrementDuration, isAnimating, minimum }) => {
    const { isFinished, progress } = useNProgress({
        animationDuration,
        incrementDuration,
        isAnimating,
        minimum
    });

    return (
        <Container animationDuration={animationDuration} isFinished={isFinished}>
            <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
    );
};

export default Progress
