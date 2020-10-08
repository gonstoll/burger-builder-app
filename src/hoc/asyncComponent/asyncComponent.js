import React, { useEffect, useState } from 'react';

const asyncComponent = importStatement => {
    return props => {
        const [ component, setComponent ] = useState(null);

        useEffect(() => {
            const loadComponent = async () => {
                const importedComponent = await importStatement();
				setComponent(importedComponent.default);
            };
            loadComponent();
        }, []);

        const C = component;
        return C ? <C {...props} /> : null;
    };
};

export default asyncComponent;
