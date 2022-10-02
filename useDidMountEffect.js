import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(deps);

    useEffect(() => {
        if (didMount.current != deps) func();
        else didMount.current = deps;
    }, deps);
}

export default useDidMountEffect;