'use client';

// global
global.log = Object.assign(
    ( identify, ...args ) => {
        console.log( args );
    },
    {
        warn() {
            console.log( this );
        }
    }
);