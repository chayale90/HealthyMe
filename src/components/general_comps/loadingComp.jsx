import React from 'react'
import { CircularProgress } from '@mui/material';

export default function LoadingComp({ minHeight, size }) {
    return (
        <div style={{ display: "flex", alignItems: "center", minHeight: minHeight }}>
            <div style={{ margin: "0 auto" }}>
                <CircularProgress size={size} />
            </div>
        </div>
    )
}
