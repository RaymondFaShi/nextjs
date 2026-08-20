// react
import React from 'react';

// provider
import { TraceContext } from '@/bootstrap/providers/trace'

// hooks
const useTrace = () => React.useContext( TraceContext );

export default useTrace;