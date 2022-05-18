import React, { useRef } from 'react';
import { bureauDouane0 } from 'tools/types';
import FormBureauDouane from 'features/BureauDouane/FormBureauDouane';

export default function NewArticle() {
    const form = useRef(null)
    return (
        <div>
            <FormBureauDouane ref={form} />
        </div>
    );
};

