import React from 'react';

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


function ResetButton({onClick}: ButtonProps) {
    return (
        <button id='reset' onClick={onClick}> Reset </button>
    )
}

export { ResetButton };